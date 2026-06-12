-- Migration 006: Database Functions
-- Core business logic functions for credit and subscription management

-- Function 1: Deduct credits atomically
CREATE OR REPLACE FUNCTION public.deduct_credits(
  p_user_id UUID,
  p_amount BIGINT,
  p_action_type TEXT,
  p_action_metadata JSONB DEFAULT NULL,
  p_description TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_current_balance BIGINT;
  v_new_balance BIGINT;
  v_transaction_id UUID;
BEGIN
  -- Validate amount
  IF p_amount <= 0 THEN
    RAISE EXCEPTION 'Amount must be positive: %', p_amount;
  END IF;

  -- Initialize user credits if needed
  PERFORM public.initialize_user_credits(p_user_id);

  -- Lock the row and get current balance
  SELECT balance INTO v_current_balance
  FROM public.user_credits
  WHERE user_id = p_user_id
  FOR UPDATE;

  -- Check sufficient balance
  IF v_current_balance < p_amount THEN
    RAISE EXCEPTION 'Insufficient credits: has %, needs %', v_current_balance, p_amount;
  END IF;

  -- Calculate new balance
  v_new_balance := v_current_balance - p_amount;

  -- Update balance
  UPDATE public.user_credits
  SET
    balance = v_new_balance,
    lifetime_spent = lifetime_spent + p_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id;

  -- Create transaction record
  INSERT INTO public.credit_transactions (
    user_id,
    amount,
    transaction_type,
    source_type,
    action_type,
    action_metadata,
    balance_before,
    balance_after,
    description,
    created_at
  )
  VALUES (
    p_user_id,
    p_amount,
    'debit',
    'action_usage',
    p_action_type,
    p_action_metadata,
    v_current_balance,
    v_new_balance,
    p_description,
    NOW()
  )
  RETURNING id INTO v_transaction_id;

  RETURN v_transaction_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function 2: Add credits atomically
CREATE OR REPLACE FUNCTION public.add_credits(
  p_user_id UUID,
  p_amount BIGINT,
  p_source_type TEXT,
  p_source_id UUID DEFAULT NULL,
  p_description TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_current_balance BIGINT;
  v_new_balance BIGINT;
  v_transaction_id UUID;
BEGIN
  -- Validate amount
  IF p_amount <= 0 THEN
    RAISE EXCEPTION 'Amount must be positive: %', p_amount;
  END IF;

  -- Validate source type
  IF p_source_type NOT IN ('purchase', 'subscription', 'bonus', 'refund', 'admin_adjustment', 'migration') THEN
    RAISE EXCEPTION 'Invalid source type: %', p_source_type;
  END IF;

  -- Initialize user credits if needed
  PERFORM public.initialize_user_credits(p_user_id);

  -- Lock the row and get current balance
  SELECT balance INTO v_current_balance
  FROM public.user_credits
  WHERE user_id = p_user_id
  FOR UPDATE;

  -- Calculate new balance
  v_new_balance := v_current_balance + p_amount;

  -- Update balance
  UPDATE public.user_credits
  SET
    balance = v_new_balance,
    lifetime_earned = lifetime_earned + p_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id;

  -- Create transaction record
  INSERT INTO public.credit_transactions (
    user_id,
    amount,
    transaction_type,
    source_type,
    source_id,
    balance_before,
    balance_after,
    description,
    created_at
  )
  VALUES (
    p_user_id,
    p_amount,
    'credit',
    p_source_type,
    p_source_id,
    v_current_balance,
    v_new_balance,
    p_description,
    NOW()
  )
  RETURNING id INTO v_transaction_id;

  RETURN v_transaction_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function 3: Get user credit balance
CREATE OR REPLACE FUNCTION public.get_user_credit_balance(p_user_id UUID)
RETURNS TABLE (
  balance BIGINT,
  balance_display NUMERIC,
  lifetime_earned BIGINT,
  lifetime_spent BIGINT,
  last_updated TIMESTAMPTZ
) AS $$
BEGIN
  -- Initialize if needed
  PERFORM public.initialize_user_credits(p_user_id);

  RETURN QUERY
  SELECT
    uc.balance,
    ROUND(uc.balance::NUMERIC / 100, 2) as balance_display,
    uc.lifetime_earned,
    uc.lifetime_spent,
    uc.updated_at
  FROM public.user_credits uc
  WHERE uc.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function 4: Check subscription status
CREATE OR REPLACE FUNCTION public.check_subscription_status(p_user_id UUID)
RETURNS TABLE (
  has_active_subscription BOOLEAN,
  tier_id TEXT,
  tier_name TEXT,
  status TEXT,
  start_date TIMESTAMPTZ,
  next_billing_date TIMESTAMPTZ,
  monthly_credits BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    CASE WHEN us.id IS NOT NULL THEN true ELSE false END as has_active_subscription,
    us.tier_id,
    st.name as tier_name,
    us.status,
    us.start_date,
    us.next_billing_date,
    st.monthly_credits
  FROM public.user_subscriptions us
  LEFT JOIN public.subscription_tiers st ON us.tier_id = st.id
  WHERE us.user_id = p_user_id
    AND us.status = 'active'
  ORDER BY us.start_date DESC
  LIMIT 1;

  -- Return false if no active subscription
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::TEXT, NULL::TEXT, NULL::TEXT, NULL::TIMESTAMPTZ, NULL::TIMESTAMPTZ, NULL::BIGINT;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function 5: Apply monthly subscription credits
CREATE OR REPLACE FUNCTION public.apply_monthly_subscription_credits(
  p_user_id UUID,
  p_subscription_id UUID
)
RETURNS UUID AS $$
DECLARE
  v_tier_id TEXT;
  v_monthly_credits BIGINT;
  v_transaction_id UUID;
BEGIN
  -- Get subscription details
  SELECT us.tier_id, st.monthly_credits
  INTO v_tier_id, v_monthly_credits
  FROM public.user_subscriptions us
  JOIN public.subscription_tiers st ON us.tier_id = st.id
  WHERE us.id = p_subscription_id
    AND us.user_id = p_user_id
    AND us.status = 'active';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Active subscription not found: %', p_subscription_id;
  END IF;

  -- Grant monthly credits
  SELECT public.add_credits(
    p_user_id,
    v_monthly_credits,
    'subscription',
    p_subscription_id,
    format('Monthly credits for %s tier', v_tier_id)
  ) INTO v_transaction_id;

  -- Update next billing date
  UPDATE public.user_subscriptions
  SET
    next_billing_date = next_billing_date + INTERVAL '1 month',
    updated_at = NOW()
  WHERE id = p_subscription_id;

  RETURN v_transaction_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function 6: Get user transaction history
CREATE OR REPLACE FUNCTION public.get_user_transactions(
  p_user_id UUID,
  p_limit INTEGER DEFAULT 50,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  amount BIGINT,
  amount_display NUMERIC,
  transaction_type TEXT,
  source_type TEXT,
  action_type TEXT,
  balance_after BIGINT,
  description TEXT,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ct.id,
    ct.amount,
    ROUND(ct.amount::NUMERIC / 100, 2) as amount_display,
    ct.transaction_type,
    ct.source_type,
    ct.action_type,
    ct.balance_after,
    ct.description,
    ct.created_at
  FROM public.credit_transactions ct
  WHERE ct.user_id = p_user_id
  ORDER BY ct.created_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.deduct_credits IS 'Atomically deducts credits from user balance with transaction logging';
COMMENT ON FUNCTION public.add_credits IS 'Atomically adds credits to user balance with transaction logging';
COMMENT ON FUNCTION public.get_user_credit_balance IS 'Returns current user credit balance and stats';
COMMENT ON FUNCTION public.check_subscription_status IS 'Returns active subscription details for a user';
COMMENT ON FUNCTION public.apply_monthly_subscription_credits IS 'Grants monthly subscription credits and updates billing date';
