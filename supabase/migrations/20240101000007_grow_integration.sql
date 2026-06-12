-- Migration 007: Grow (Meshulam) Integration
-- Adds payment intents tracking and Grow-specific fields

-- Payment intents table (tracks link creation before payment)
CREATE TABLE IF NOT EXISTS public.payment_intents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workflow_run_id UUID NOT NULL UNIQUE,
  pack_id TEXT,                    -- taste/mini/plus (nullable for subscriptions)
  tier_id TEXT,                    -- starter/growth/pro (nullable for credit packs)
  amount_ils INTEGER NOT NULL,     -- 100x scale (e.g., 2500 = 25.00 NIS)
  payment_link_url TEXT,
  grow_payment_link_process_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT payment_intents_type_check CHECK (
    (pack_id IS NOT NULL AND tier_id IS NULL) OR
    (pack_id IS NULL AND tier_id IS NOT NULL)
  )
);

-- Indexes for payment_intents
CREATE INDEX IF NOT EXISTS idx_payment_intents_user_id ON public.payment_intents(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_intents_workflow_run_id ON public.payment_intents(workflow_run_id);
CREATE INDEX IF NOT EXISTS idx_payment_intents_created_at ON public.payment_intents(created_at DESC);

-- Enable RLS
ALTER TABLE public.payment_intents ENABLE ROW LEVEL SECURITY;

-- RLS Policies for payment_intents
CREATE POLICY "Users can view own payment intents"
  ON public.payment_intents
  FOR SELECT
  USING (auth.uid() = user_id);

-- Unmatched payments table (webhooks we can't tie to a customer)
CREATE TABLE IF NOT EXISTS public.payments_unmatched (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  raw_payload JSONB NOT NULL,
  reason TEXT,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolved_user_id UUID REFERENCES auth.users(id)
);

-- Index for payments_unmatched
CREATE INDEX IF NOT EXISTS idx_payments_unmatched_received_at ON public.payments_unmatched(received_at DESC);
CREATE INDEX IF NOT EXISTS idx_payments_unmatched_resolved_at ON public.payments_unmatched(resolved_at) WHERE resolved_at IS NOT NULL;

-- Enable RLS (admin-only access)
ALTER TABLE public.payments_unmatched ENABLE ROW LEVEL SECURITY;

-- Add Grow-specific columns to existing purchases table
ALTER TABLE public.purchases
  ADD COLUMN IF NOT EXISTS grow_transaction_id BIGINT UNIQUE,
  ADD COLUMN IF NOT EXISTS grow_transaction_token TEXT,
  ADD COLUMN IF NOT EXISTS grow_payment_link_process_id BIGINT,
  ADD COLUMN IF NOT EXISTS payer_phone TEXT,
  ADD COLUMN IF NOT EXISTS payer_name TEXT,
  ADD COLUMN IF NOT EXISTS asmachta TEXT,              -- credit-co approval code from Grow
  ADD COLUMN IF NOT EXISTS card_suffix TEXT,
  ADD COLUMN IF NOT EXISTS card_brand TEXT,
  ADD COLUMN IF NOT EXISTS acked_at TIMESTAMPTZ;       -- when grow-approve-transaction returned 200

-- Index for Grow transaction ID (critical for idempotency)
CREATE UNIQUE INDEX IF NOT EXISTS idx_purchases_grow_transaction_id
  ON public.purchases(grow_transaction_id)
  WHERE grow_transaction_id IS NOT NULL;

-- Index for payment link process ID
CREATE INDEX IF NOT EXISTS idx_purchases_grow_payment_link_process_id
  ON public.purchases(grow_payment_link_process_id)
  WHERE grow_payment_link_process_id IS NOT NULL;

-- Comments
COMMENT ON TABLE public.payment_intents IS 'Tracks payment link creation before actual payment (Grow integration)';
COMMENT ON TABLE public.payments_unmatched IS 'Grow webhooks that could not be matched to a customer';
COMMENT ON COLUMN public.purchases.grow_transaction_id IS 'Grow transaction ID - used for idempotency (prevents duplicate processing)';
COMMENT ON COLUMN public.purchases.asmachta IS 'Credit card company approval code from Grow';
COMMENT ON COLUMN public.purchases.acked_at IS 'Timestamp when ApproveTransaction returned 200 to Grow';
