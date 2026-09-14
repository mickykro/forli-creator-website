-- Migration 010: OTP Authentication System
-- Creates table for WhatsApp OTP verification

CREATE TABLE IF NOT EXISTS public.otp_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  product_type TEXT NOT NULL CHECK (product_type IN ('credit_pack', 'subscription')),
  product_id TEXT NOT NULL,
  billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'annual') OR billing_cycle IS NULL),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_otp_tokens_phone ON public.otp_tokens(phone_number);
CREATE INDEX IF NOT EXISTS idx_otp_tokens_expires ON public.otp_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_otp_tokens_created ON public.otp_tokens(created_at DESC);

-- Function to check OTP rate limiting (5 OTP requests per phone per hour)
CREATE OR REPLACE FUNCTION public.check_otp_rate_limit(p_phone TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  v_count INTEGER;
BEGIN
  SELECT COUNT(*)
  INTO v_count
  FROM public.otp_tokens
  WHERE phone_number = p_phone
    AND created_at > NOW() - INTERVAL '1 hour';

  RETURN v_count < 5;
END;
$$ LANGUAGE plpgsql;

COMMENT ON TABLE public.otp_tokens IS 'OTP tokens for WhatsApp authentication with rate limiting';
COMMENT ON FUNCTION public.check_otp_rate_limit IS 'Returns true if phone can request another OTP (max 5/hour)';
