-- OTP Tokens Table for WhatsApp Login
-- Stores temporary OTP codes with rate limiting

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

-- Indexes for performance
CREATE INDEX idx_otp_phone_code ON public.otp_tokens(phone_number, otp_code)
  WHERE used_at IS NULL;
CREATE INDEX idx_otp_expires ON public.otp_tokens(expires_at);
CREATE INDEX idx_otp_phone_created ON public.otp_tokens(phone_number, created_at);

-- Rate Limiting Function
-- Returns true if phone number can request another OTP (< 5 in last hour)
CREATE OR REPLACE FUNCTION public.check_otp_rate_limit(p_phone TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO recent_count
  FROM public.otp_tokens
  WHERE phone_number = p_phone
    AND created_at > NOW() - INTERVAL '1 hour';

  RETURN recent_count < 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Cleanup Function (can be called by cron or scheduled job)
-- Deletes expired OTPs older than 1 hour
CREATE OR REPLACE FUNCTION public.cleanup_expired_otps()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.otp_tokens
  WHERE expires_at < NOW() - INTERVAL '1 hour';

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant access (adjust based on your RLS policies)
GRANT SELECT, INSERT, UPDATE ON public.otp_tokens TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.otp_tokens TO anon;
GRANT EXECUTE ON FUNCTION public.check_otp_rate_limit TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_otp_rate_limit TO anon;
