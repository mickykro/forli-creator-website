-- Migration 013: Allow zero amount for promo code purchases
-- Relax the amount_ils constraint to allow 0 for free promo purchases

ALTER TABLE public.purchases
  DROP CONSTRAINT IF EXISTS purchases_amount_ils_check;

ALTER TABLE public.purchases
  ADD CONSTRAINT purchases_amount_ils_check CHECK (amount_ils >= 0);

COMMENT ON CONSTRAINT purchases_amount_ils_check ON public.purchases IS
  'Allow zero amount for promo code purchases (100% discount)';
