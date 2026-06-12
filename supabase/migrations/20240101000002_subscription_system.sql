-- Migration 002: Subscription System
-- Manages subscription tiers and user subscriptions with Meshulam integration

-- Subscription tiers master table
CREATE TABLE IF NOT EXISTS public.subscription_tiers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  display_name TEXT NOT NULL,
  description TEXT,
  price_ils INTEGER NOT NULL CHECK (price_ils >= 0),
  monthly_credits BIGINT NOT NULL CHECK (monthly_credits >= 0),
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User subscriptions table
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  tier_id TEXT NOT NULL REFERENCES public.subscription_tiers(id),

  -- Subscription status
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'suspended')),

  -- Meshulam integration fields
  meshulam_transaction_id TEXT,
  meshulam_customer_id TEXT,
  meshulam_subscription_id TEXT,

  -- Subscription period
  start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  next_billing_date TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,

  -- Metadata
  cancellation_reason TEXT,
  metadata JSONB,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_dates CHECK (
    (cancelled_at IS NULL OR cancelled_at >= start_date) AND
    (expires_at IS NULL OR expires_at >= start_date) AND
    (next_billing_date IS NULL OR next_billing_date >= start_date)
  )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_tier_id ON public.user_subscriptions(tier_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON public.user_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_meshulam_transaction ON public.user_subscriptions(meshulam_transaction_id) WHERE meshulam_transaction_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_meshulam_subscription ON public.user_subscriptions(meshulam_subscription_id) WHERE meshulam_subscription_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_next_billing ON public.user_subscriptions(next_billing_date) WHERE status = 'active' AND next_billing_date IS NOT NULL;

-- Unique constraint: one active subscription per user
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_subscriptions_active_unique
  ON public.user_subscriptions(user_id)
  WHERE status = 'active';

-- Enable RLS
ALTER TABLE public.subscription_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Anyone can view tiers (for pricing page)
CREATE POLICY "Anyone can view active subscription tiers"
  ON public.subscription_tiers
  FOR SELECT
  USING (is_active = true);

-- RLS Policies: Users can only view their own subscriptions
CREATE POLICY "Users can view own subscriptions"
  ON public.user_subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can manage all subscriptions (for backend operations)
CREATE POLICY "Service role can manage all subscriptions"
  ON public.user_subscriptions
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- Trigger for updated_at
CREATE TRIGGER set_updated_at_subscription_tiers
  BEFORE UPDATE ON public.subscription_tiers
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_user_subscriptions
  BEFORE UPDATE ON public.user_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

COMMENT ON TABLE public.subscription_tiers IS 'Master table for subscription tier definitions';
COMMENT ON TABLE public.user_subscriptions IS 'User subscription records with Meshulam payment integration';
COMMENT ON COLUMN public.user_subscriptions.meshulam_transaction_id IS 'Meshulam transaction ID for subscription payment';
COMMENT ON COLUMN public.user_subscriptions.meshulam_customer_id IS 'Meshulam customer ID for recurring billing';
COMMENT ON COLUMN public.user_subscriptions.meshulam_subscription_id IS 'Meshulam subscription ID for recurring management';
