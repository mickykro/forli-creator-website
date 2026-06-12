-- Migration 011: Replace Meshulam/Grow with Cardcom
-- Makes Meshulam fields optional and adds Cardcom equivalents

-- =====================================================
-- Part 1: Update purchases table
-- =====================================================

-- Make Meshulam fields nullable (in case of existing data)
ALTER TABLE public.purchases
  ALTER COLUMN meshulam_transaction_id DROP NOT NULL,
  ALTER COLUMN meshulam_status DROP NOT NULL;

-- Add Cardcom fields
ALTER TABLE public.purchases
  ADD COLUMN IF NOT EXISTS cardcom_low_profile_id TEXT,
  ADD COLUMN IF NOT EXISTS cardcom_transaction_id TEXT,
  ADD COLUMN IF NOT EXISTS cardcom_response JSONB,
  ADD COLUMN IF NOT EXISTS payment_gateway TEXT DEFAULT 'cardcom' CHECK (payment_gateway IN ('cardcom', 'meshulam'));

-- Add indexes for Cardcom fields
CREATE INDEX IF NOT EXISTS idx_purchases_cardcom_low_profile_id
  ON public.purchases(cardcom_low_profile_id)
  WHERE cardcom_low_profile_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_purchases_cardcom_transaction_id
  ON public.purchases(cardcom_transaction_id)
  WHERE cardcom_transaction_id IS NOT NULL;

-- Update constraint: require either Meshulam OR Cardcom transaction ID
ALTER TABLE public.purchases
  DROP CONSTRAINT IF EXISTS purchases_transaction_id_check;

ALTER TABLE public.purchases
  ADD CONSTRAINT purchases_transaction_id_check CHECK (
    meshulam_transaction_id IS NOT NULL OR cardcom_transaction_id IS NOT NULL
  );

-- =====================================================
-- Part 2: Update user_subscriptions table
-- =====================================================

-- Make Meshulam subscription fields nullable
ALTER TABLE public.user_subscriptions
  ALTER COLUMN meshulam_transaction_id DROP NOT NULL,
  ALTER COLUMN meshulam_customer_id DROP NOT NULL,
  ALTER COLUMN meshulam_subscription_id DROP NOT NULL;

-- Add Cardcom fields for subscriptions
ALTER TABLE public.user_subscriptions
  ADD COLUMN IF NOT EXISTS cardcom_token TEXT,
  ADD COLUMN IF NOT EXISTS cardcom_token_created_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS payment_gateway TEXT DEFAULT 'cardcom' CHECK (payment_gateway IN ('cardcom', 'meshulam'));

-- Add indexes for Cardcom subscription fields
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_cardcom_token
  ON public.user_subscriptions(cardcom_token)
  WHERE cardcom_token IS NOT NULL;

-- =====================================================
-- Part 3: Drop Grow-specific tables (if unused)
-- =====================================================

-- WARNING: Only run this if you're sure there's no data you need!
-- Comment out if you want to keep the data temporarily

DROP TABLE IF EXISTS public.payment_intents CASCADE;
DROP TABLE IF EXISTS public.payments_unmatched CASCADE;

-- =====================================================
-- Part 4: Remove Grow-specific columns from purchases
-- =====================================================

-- Remove columns added by Grow integration migration
ALTER TABLE public.purchases
  DROP COLUMN IF EXISTS grow_transaction_id,
  DROP COLUMN IF EXISTS grow_transaction_token,
  DROP COLUMN IF EXISTS grow_payment_link_process_id,
  DROP COLUMN IF EXISTS payer_phone,
  DROP COLUMN IF EXISTS payer_name,
  DROP COLUMN IF EXISTS asmachta,
  DROP COLUMN IF EXISTS card_suffix,
  DROP COLUMN IF EXISTS card_brand,
  DROP COLUMN IF EXISTS acked_at;

-- =====================================================
-- Part 5: Add comments for documentation
-- =====================================================

COMMENT ON COLUMN public.purchases.cardcom_low_profile_id IS 'Cardcom Low Profile ID returned from payment link creation';
COMMENT ON COLUMN public.purchases.cardcom_transaction_id IS 'Cardcom transaction ID from successful payment';
COMMENT ON COLUMN public.purchases.cardcom_response IS 'Full Cardcom webhook response payload';
COMMENT ON COLUMN public.purchases.payment_gateway IS 'Payment gateway used: cardcom (current) or meshulam (legacy)';

COMMENT ON COLUMN public.user_subscriptions.cardcom_token IS 'Cardcom token for recurring payments (from ChargeAndCreateToken operation)';
COMMENT ON COLUMN public.user_subscriptions.cardcom_token_created_at IS 'When the Cardcom token was created';

-- =====================================================
-- Part 6: Update default for new records
-- =====================================================

-- Set default payment gateway to Cardcom for new records
ALTER TABLE public.purchases
  ALTER COLUMN payment_gateway SET DEFAULT 'cardcom';

ALTER TABLE public.user_subscriptions
  ALTER COLUMN payment_gateway SET DEFAULT 'cardcom';
