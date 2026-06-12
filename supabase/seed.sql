-- Seed Data for Forly Payment System
-- Populates master tables with initial data

-- ============================================================================
-- Subscription Tiers
-- ============================================================================

INSERT INTO public.subscription_tiers (
  id,
  name,
  display_name,
  description,
  price_ils,
  monthly_credits,
  features,
  is_active
) VALUES
  (
    'starter',
    'starter',
    'Starter',
    'Perfect for getting started with Forly',
    4900,
    500000, -- 5000.00 credits (5000 * 100)
    '[
      "5,000 monthly credits",
      "WhatsApp integration",
      "Basic analytics",
      "Email support",
      "Standard API access"
    ]'::jsonb,
    true
  ),
  (
    'growth',
    'growth',
    'Growth',
    'For growing creators and businesses',
    9900,
    1500000, -- 15,000.00 credits (15000 * 100)
    '[
      "15,000 monthly credits",
      "WhatsApp integration",
      "Advanced analytics",
      "Priority email support",
      "Advanced API access",
      "Custom branding",
      "Multi-user support"
    ]'::jsonb,
    true
  ),
  (
    'pro',
    'pro',
    'Pro',
    'For professional creators with high volume',
    19900,
    4000000, -- 40,000.00 credits (40000 * 100)
    '[
      "40,000 monthly credits",
      "WhatsApp integration",
      "Premium analytics & reporting",
      "24/7 priority support",
      "Advanced API access",
      "Custom branding",
      "Unlimited users",
      "Dedicated account manager",
      "Custom integrations"
    ]'::jsonb,
    true
  )
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  price_ils = EXCLUDED.price_ils,
  monthly_credits = EXCLUDED.monthly_credits,
  features = EXCLUDED.features,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- Credit Packs
-- ============================================================================

INSERT INTO public.credit_packs (
  id,
  name,
  display_name,
  description,
  credits,
  price_ils,
  bonus_credits,
  is_active
) VALUES
  (
    'pack_1000',
    'pack_1000',
    '1,000 Credits',
    'Small pack for occasional use',
    100000, -- 1000.00 credits (1000 * 100)
    1900, -- 19 ILS
    0,
    true
  ),
  (
    'pack_5000',
    'pack_5000',
    '5,000 Credits',
    'Most popular pack with 10% bonus',
    500000, -- 5,000.00 credits (5000 * 100)
    8500, -- 85 ILS (regular would be 95 ILS)
    50000, -- 500.00 bonus credits (10% bonus)
    true
  ),
  (
    'pack_15000',
    'pack_15000',
    '15,000 Credits',
    'Best value with 20% bonus',
    1500000, -- 15,000.00 credits (15000 * 100)
    22800, -- 228 ILS (regular would be 285 ILS)
    300000, -- 3,000.00 bonus credits (20% bonus)
    true
  )
ON CONFLICT (id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description,
  credits = EXCLUDED.credits,
  price_ils = EXCLUDED.price_ils,
  bonus_credits = EXCLUDED.bonus_credits,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- ============================================================================
-- Verification Queries
-- ============================================================================

-- Verify subscription tiers
DO $$
DECLARE
  tier_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO tier_count FROM public.subscription_tiers WHERE is_active = true;
  RAISE NOTICE 'Inserted % active subscription tiers', tier_count;
END $$;

-- Verify credit packs
DO $$
DECLARE
  pack_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO pack_count FROM public.credit_packs WHERE is_active = true;
  RAISE NOTICE 'Inserted % active credit packs', pack_count;
END $$;

-- Display seed summary
DO $$
BEGIN
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Seed Data Summary';
  RAISE NOTICE '========================================';
  RAISE NOTICE 'Subscription Tiers:';
  RAISE NOTICE '  - Starter: 49 ILS/month → 5,000 credits';
  RAISE NOTICE '  - Growth: 99 ILS/month → 15,000 credits';
  RAISE NOTICE '  - Pro: 199 ILS/month → 40,000 credits';
  RAISE NOTICE '';
  RAISE NOTICE 'Credit Packs:';
  RAISE NOTICE '  - 1,000 credits: 19 ILS (no bonus)';
  RAISE NOTICE '  - 5,000 credits: 85 ILS (+ 500 bonus = 10%%)';
  RAISE NOTICE '  - 15,000 credits: 228 ILS (+ 3,000 bonus = 20%%)';
  RAISE NOTICE '========================================';
END $$;
