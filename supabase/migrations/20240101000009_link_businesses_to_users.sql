-- Migration 009: Link Businesses to Users
-- Adds user_id foreign key to businesses table

-- Add user_id column (nullable for now)
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON public.businesses(user_id);

-- Update RLS policies to allow users to see their own business
DROP POLICY IF EXISTS "Users can view own business" ON public.businesses;
CREATE POLICY "Users can view own business"
  ON public.businesses
  FOR SELECT
  USING (auth.uid() = user_id OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Users can update own business" ON public.businesses;
CREATE POLICY "Users can update own business"
  ON public.businesses
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Helper function to get business by user
CREATE OR REPLACE FUNCTION public.get_user_business()
RETURNS SETOF public.businesses AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM public.businesses
  WHERE user_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get business by phone
CREATE OR REPLACE FUNCTION public.get_business_by_phone(p_phone TEXT)
RETURNS SETOF public.businesses AS $$
BEGIN
  RETURN QUERY
  SELECT * FROM public.businesses
  WHERE phone_number = p_phone;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON COLUMN public.businesses.user_id IS 'Links business to auth.users account';
