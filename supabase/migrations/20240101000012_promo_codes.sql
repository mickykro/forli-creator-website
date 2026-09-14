-- Promo Codes Table
CREATE TABLE IF NOT EXISTS public.promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
  discount_value NUMERIC NOT NULL CHECK (discount_value >= 0),
  applies_to TEXT NOT NULL CHECK (applies_to IN ('credit_pack', 'subscription', 'all')),
  valid_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_until TIMESTAMPTZ,
  max_uses INTEGER,
  current_uses INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Promo Code Usage Tracking
CREATE TABLE IF NOT EXISTS public.promo_code_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promo_code_id UUID NOT NULL REFERENCES public.promo_codes(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  product_type TEXT NOT NULL,
  product_id TEXT NOT NULL,
  original_price NUMERIC NOT NULL,
  discount_amount NUMERIC NOT NULL,
  final_price NUMERIC NOT NULL,
  used_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(promo_code_id, user_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON public.promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_active ON public.promo_codes(active) WHERE active = TRUE;
CREATE INDEX IF NOT EXISTS idx_promo_usage_user ON public.promo_code_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_promo_usage_code ON public.promo_code_usage(promo_code_id);

-- Insert initial promo codes
INSERT INTO public.promo_codes (code, discount_type, discount_value, applies_to, valid_from, valid_until, max_uses, active)
VALUES
  ('FREE100', 'percentage', 100, 'all', NOW(), NOW() + INTERVAL '1 year', 100, TRUE),
  ('LAUNCH50', 'percentage', 50, 'all', NOW(), NOW() + INTERVAL '3 months', 500, TRUE)
ON CONFLICT (code) DO NOTHING;

-- Function to check if promo code is valid
CREATE OR REPLACE FUNCTION public.validate_promo_code(
  p_code TEXT,
  p_product_type TEXT,
  p_user_id UUID
)
RETURNS TABLE (
  valid BOOLEAN,
  discount_type TEXT,
  discount_value NUMERIC,
  error_message TEXT
) AS $$
DECLARE
  v_promo public.promo_codes;
  v_usage_count INTEGER;
BEGIN
  -- Find promo code
  SELECT * INTO v_promo
  FROM public.promo_codes
  WHERE code = p_code AND active = TRUE;

  -- Check if code exists
  IF v_promo IS NULL THEN
    RETURN QUERY SELECT FALSE, NULL::TEXT, NULL::NUMERIC, 'Invalid promo code';
    RETURN;
  END IF;

  -- Check if expired
  IF v_promo.valid_until IS NOT NULL AND v_promo.valid_until < NOW() THEN
    RETURN QUERY SELECT FALSE, NULL::TEXT, NULL::NUMERIC, 'Promo code has expired';
    RETURN;
  END IF;

  -- Check if not yet valid
  IF v_promo.valid_from > NOW() THEN
    RETURN QUERY SELECT FALSE, NULL::TEXT, NULL::NUMERIC, 'Promo code not yet valid';
    RETURN;
  END IF;

  -- Check if max uses reached
  IF v_promo.max_uses IS NOT NULL AND v_promo.current_uses >= v_promo.max_uses THEN
    RETURN QUERY SELECT FALSE, NULL::TEXT, NULL::NUMERIC, 'Promo code has reached maximum uses';
    RETURN;
  END IF;

  -- Check if user already used this code
  SELECT COUNT(*) INTO v_usage_count
  FROM public.promo_code_usage
  WHERE promo_code_id = v_promo.id AND user_id = p_user_id;

  IF v_usage_count > 0 THEN
    RETURN QUERY SELECT FALSE, NULL::TEXT, NULL::NUMERIC, 'You have already used this promo code';
    RETURN;
  END IF;

  -- Check if applies to product type
  IF v_promo.applies_to != 'all' AND v_promo.applies_to != p_product_type THEN
    RETURN QUERY SELECT FALSE, NULL::TEXT, NULL::NUMERIC, 'Promo code does not apply to this product';
    RETURN;
  END IF;

  -- Valid!
  RETURN QUERY SELECT TRUE, v_promo.discount_type, v_promo.discount_value, NULL::TEXT;
END;
$$ LANGUAGE plpgsql;

-- Generic increment function for counter columns
CREATE OR REPLACE FUNCTION public.increment(
  row_id UUID,
  table_name TEXT,
  column_name TEXT
)
RETURNS VOID AS $$
BEGIN
  EXECUTE format('UPDATE %I SET %I = %I + 1 WHERE id = $1', table_name, column_name, column_name)
  USING row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
