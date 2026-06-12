-- Migration 008: Businesses Table
-- Stores business/customer data migrated from Google Sheets

CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id TEXT UNIQUE NOT NULL,           -- C003, C007, etc.
  business_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  status TEXT NOT NULL,                       -- disable, activate, signup, active
  details TEXT,
  business_profile_compact TEXT,
  policies_compact TEXT,
  faqs_compact TEXT,
  hours TEXT,                                 -- Business hours in Hebrew
  intent TEXT,
  knowledge_stage TEXT,
  validation_started_at TIMESTAMPTZ,
  call_sid TEXT,

  -- Calendly integration
  calendly_token TEXT,
  calendly_refresh_token TEXT,
  calendly_user_uri TEXT,
  calendly_connected_at TIMESTAMPTZ,
  calendly_setup_step INTEGER,
  calendly_setup_duration TEXT,
  calendly_setup_hours TEXT,
  calendly_setup_event_name TEXT,
  calendly_event_type_uri TEXT,

  -- Social media
  instagram TEXT,

  -- State management
  pending_state TEXT,
  pending_image_url TEXT,

  -- Metadata
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- WhatsApp automation fields
  wa_template TEXT,
  notes TEXT,
  blocked BOOLEAN DEFAULT false
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_businesses_business_id ON public.businesses(business_id);
CREATE INDEX IF NOT EXISTS idx_businesses_phone_number ON public.businesses(phone_number);
CREATE INDEX IF NOT EXISTS idx_businesses_status ON public.businesses(status);
CREATE INDEX IF NOT EXISTS idx_businesses_created_at ON public.businesses(created_at DESC);

-- Enable RLS
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- RLS Policies (adjust based on your auth requirements)
-- For now, allow authenticated users to read all businesses
CREATE POLICY "Authenticated users can view businesses"
  ON public.businesses
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Admin policy for full access (service_role)
CREATE POLICY "Service role has full access"
  ON public.businesses
  FOR ALL
  USING (auth.role() = 'service_role');

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER businesses_updated_at
  BEFORE UPDATE ON public.businesses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Comments
COMMENT ON TABLE public.businesses IS 'Business/customer data migrated from Google Sheets';
COMMENT ON COLUMN public.businesses.business_id IS 'Legacy ID from Google Sheets (C003, C007, etc.)';
COMMENT ON COLUMN public.businesses.status IS 'disable, activate, signup, or active';
