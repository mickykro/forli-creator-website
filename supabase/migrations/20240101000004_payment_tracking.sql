-- Migration 004: Payment Tracking
-- Tracks all purchases with Meshulam payment integration

-- Purchases table
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,

  -- Purchase type
  purchase_type TEXT NOT NULL CHECK (purchase_type IN ('credit_pack', 'subscription')),

  -- References
  credit_pack_id TEXT REFERENCES public.credit_packs(id),
  subscription_id UUID REFERENCES public.user_subscriptions(id),

  -- Payment details
  amount_ils INTEGER NOT NULL CHECK (amount_ils > 0),
  currency TEXT NOT NULL DEFAULT 'ILS',

  -- Meshulam integration
  meshulam_transaction_id TEXT NOT NULL,
  meshulam_page_request_uid TEXT,
  meshulam_status TEXT NOT NULL,
  meshulam_response JSONB,

  -- Purchase status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'completed', 'failed', 'refunded', 'cancelled'
  )),

  -- Fulfillment tracking
  credits_granted BIGINT,
  fulfilled_at TIMESTAMPTZ,

  -- Metadata
  metadata JSONB,
  error_message TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Constraints
  CONSTRAINT valid_purchase_type CHECK (
    (purchase_type = 'credit_pack' AND credit_pack_id IS NOT NULL) OR
    (purchase_type = 'subscription' AND subscription_id IS NOT NULL)
  ),
  CONSTRAINT valid_fulfillment CHECK (
    (status = 'completed' AND fulfilled_at IS NOT NULL) OR
    (status != 'completed')
  )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON public.purchases(status);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON public.purchases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_purchases_credit_pack ON public.purchases(credit_pack_id) WHERE credit_pack_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_purchases_subscription ON public.purchases(subscription_id) WHERE subscription_id IS NOT NULL;

-- Unique constraint for idempotency - prevent duplicate Meshulam transactions
CREATE UNIQUE INDEX IF NOT EXISTS idx_purchases_meshulam_transaction_unique
  ON public.purchases(meshulam_transaction_id);

-- Enable RLS
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only view their own purchases
CREATE POLICY "Users can view own purchases"
  ON public.purchases
  FOR SELECT
  USING (auth.uid() = user_id);

-- Service role can manage all purchases (for backend/webhook operations)
CREATE POLICY "Service role can manage all purchases"
  ON public.purchases
  FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- Trigger for updated_at
CREATE TRIGGER set_updated_at_purchases
  BEFORE UPDATE ON public.purchases
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to mark purchase as completed and grant credits
CREATE OR REPLACE FUNCTION public.complete_purchase(
  p_purchase_id UUID,
  p_credits_to_grant BIGINT DEFAULT NULL
)
RETURNS void AS $$
DECLARE
  v_user_id UUID;
  v_credits BIGINT;
BEGIN
  -- Get purchase details
  SELECT user_id, COALESCE(p_credits_to_grant, 0)
  INTO v_user_id, v_credits
  FROM public.purchases
  WHERE id = p_purchase_id AND status = 'pending';

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Purchase not found or already processed: %', p_purchase_id;
  END IF;

  -- Update purchase status
  UPDATE public.purchases
  SET
    status = 'completed',
    fulfilled_at = NOW(),
    credits_granted = v_credits
  WHERE id = p_purchase_id;

  -- Grant credits if applicable
  IF v_credits > 0 THEN
    PERFORM public.add_credits(
      v_user_id,
      v_credits,
      'purchase',
      p_purchase_id
    );
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON TABLE public.purchases IS 'Purchase records with Meshulam payment integration';
COMMENT ON COLUMN public.purchases.meshulam_transaction_id IS 'Meshulam transaction ID for idempotency';
COMMENT ON COLUMN public.purchases.meshulam_page_request_uid IS 'Meshulam page request UID from initial payment request';
COMMENT ON COLUMN public.purchases.credits_granted IS 'Credits granted upon purchase completion * 100';
