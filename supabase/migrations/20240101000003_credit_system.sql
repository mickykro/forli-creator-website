-- Migration 003: Credit System (100x scale)
-- All credits stored as bigint * 100 for precision (e.g., 10.5 credits = 1050)

-- Credit packs master table
CREATE TABLE IF NOT EXISTS public.credit_packs (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  credits BIGINT NOT NULL CHECK (credits > 0),
  price_ils INTEGER NOT NULL CHECK (price_ils >= 0),
  bonus_credits BIGINT NOT NULL DEFAULT 0 CHECK (bonus_credits >= 0),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User credits balance table
CREATE TABLE IF NOT EXISTS public.user_credits (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  balance BIGINT NOT NULL DEFAULT 0 CHECK (balance >= 0),
  lifetime_earned BIGINT NOT NULL DEFAULT 0 CHECK (lifetime_earned >= 0),
  lifetime_spent BIGINT NOT NULL DEFAULT 0 CHECK (lifetime_spent >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Credit transactions ledger
CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Transaction details
  amount BIGINT NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('credit', 'debit')),

  -- Source tracking
  source_type TEXT NOT NULL CHECK (source_type IN (
    'purchase', 'subscription', 'bonus', 'refund',
    'action_usage', 'admin_adjustment', 'migration'
  )),
  source_id UUID,

  -- Action tracking (for debit transactions)
  action_type TEXT,
  action_metadata JSONB,

  -- Balance tracking (snapshot)
  balance_before BIGINT NOT NULL,
  balance_after BIGINT NOT NULL,

  -- Metadata
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_balance_change CHECK (
    (transaction_type = 'credit' AND balance_after = balance_before + amount AND amount > 0) OR
    (transaction_type = 'debit' AND balance_after = balance_before - amount AND amount > 0)
  ),
  CONSTRAINT valid_action_type CHECK (
    (transaction_type = 'debit' AND action_type IS NOT NULL) OR
    (transaction_type = 'credit')
  )
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_credits_balance ON public.user_credits(balance);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON public.credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_created_at ON public.credit_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_source ON public.credit_transactions(source_type, source_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_action_type ON public.credit_transactions(action_type) WHERE action_type IS NOT NULL;

-- Enable RLS
ALTER TABLE public.credit_packs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Anyone can view active credit packs (for pricing page)
CREATE POLICY "Anyone can view active credit packs"
  ON public.credit_packs
  FOR SELECT
  USING (is_active = true);

-- RLS Policies: Users can only view their own credits
CREATE POLICY "Users can view own credits"
  ON public.user_credits
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own credit transactions"
  ON public.credit_transactions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can manage all credits (for backend operations)
CREATE POLICY "Service role can manage all credits"
  ON public.user_credits
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Service role can manage all credit transactions"
  ON public.credit_transactions
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- Trigger for updated_at
CREATE TRIGGER set_updated_at_credit_packs
  BEFORE UPDATE ON public.credit_packs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_user_credits
  BEFORE UPDATE ON public.user_credits
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to initialize user credits on first use
CREATE OR REPLACE FUNCTION public.initialize_user_credits(p_user_id UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO public.user_credits (user_id, balance, lifetime_earned, lifetime_spent)
  VALUES (p_user_id, 0, 0, 0)
  ON CONFLICT (user_id) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON TABLE public.credit_packs IS 'Master table for purchasable credit pack definitions';
COMMENT ON TABLE public.user_credits IS 'User credit balances (stored as bigint * 100)';
COMMENT ON TABLE public.credit_transactions IS 'Immutable ledger of all credit transactions';
COMMENT ON COLUMN public.user_credits.balance IS 'Current credit balance * 100 (e.g., 1050 = 10.5 credits)';
COMMENT ON COLUMN public.credit_transactions.amount IS 'Transaction amount * 100';
