/* Brand-wide constants — single source of truth for contact info,
   canonical site URL, and CTA links. Update here, not in components. */

export const SITE_URL = 'https://call4li.com';

export const BUSINESS = {
  legalName: 'Call4li',
  brandName: 'Forly',
  brandNameHe: 'פורלי',
  email: 'info@call4li.com',
  phone: '054-801-8957',
  phoneE164: '+972548018957',
  whatsappE164: '972553163293',
};

export const WHATSAPP_URL = `https://wa.me/${BUSINESS.whatsappE164}`;
export const WHATSAPP_HELLO_URL = `${WHATSAPP_URL}?text=${encodeURIComponent('היי, אני רוצה להצטרף לפורלי')}`;
export const WHATSAPP_QUESTION_URL = `${WHATSAPP_URL}?text=${encodeURIComponent('היי, יש לי שאלה לגבי פורלי')}`;

export const WHATSAPP_UPGRADE_STARTER_URL = `${WHATSAPP_URL}?text=${encodeURIComponent('היי, אני רוצה לשדרג למסלול Starter')}`;
export const WHATSAPP_UPGRADE_GROWTH_URL = `${WHATSAPP_URL}?text=${encodeURIComponent('היי, אני רוצה לשדרג למסלול Growth')}`;
export const WHATSAPP_UPGRADE_PRO_URL = `${WHATSAPP_URL}?text=${encodeURIComponent('היי, אני רוצה לשדרג למסלול Pro')}`;

export const TRIAL_CREDITS = 50000; // 500 credits at 100x scale
export const REFERRAL_CREDITS = 100000; // 1000 credits at 100x scale

export const PRICING_TIERS = [
  {
    id: 'starter' as const,
    nameHe: 'סטרטר',
    nameEn: 'Starter',
    creditsMonthly: 500000, // 5000 credits at 100x scale
    priceMonthly: 99,
    priceAnnual: 990,
    launchPromo: {
      priceMonthly: 49,
      duration: 'חודשיים ראשונים',
    },
  },
  {
    id: 'growth' as const,
    nameHe: 'גרואת׳',
    nameEn: 'Growth',
    creditsMonthly: 1500000, // 15000 credits at 100x scale
    priceMonthly: 249,
    priceAnnual: 2490,
    launchPromo: {
      priceMonthly: 149,
      duration: 'חודשיים ראשונים',
    },
  },
  {
    id: 'pro' as const,
    nameHe: 'פרו',
    nameEn: 'Pro',
    creditsMonthly: 4000000, // 40000 credits at 100x scale
    priceMonthly: 499,
    priceAnnual: 4990,
    launchPromo: {
      priceMonthly: 299,
      duration: 'חודשיים ראשונים',
    },
  },
] as const;

export const CREDIT_PACKS = [
  {
    id: 'taste' as const,
    nameHe: 'טעימה',
    nameEn: 'Taste',
    credits: 100000, // 1000 credits at 100x scale
    price: 29,
  },
  {
    id: 'mini' as const,
    nameHe: 'מיני',
    nameEn: 'Mini',
    credits: 300000, // 3000 credits at 100x scale
    price: 79,
  },
  {
    id: 'plus' as const,
    nameHe: 'פלוס',
    nameEn: 'Plus',
    credits: 1000000, // 10000 credits at 100x scale
    price: 249,
  },
] as const;

export const CREDIT_COSTS = {
  text_consultation: 1500, // 15 credits at 100x scale (1000-2000 range)
  standard_image: 10000, // 100 credits at 100x scale
  carousel: 25000, // 250 credits at 100x scale
  standard_video: 50000, // 500 credits at 100x scale
  premium_video: 75000, // 750 credits at 100x scale
} as const;

// Cardcom payment integration constants (Israeli payment gateway with built-in invoicing)
export const CARDCOM = {
  terminalNumber: 1000, // Test: 1000, Production: set in environment

  // Subscription static payment URLs (Cardcom Low Profile pages)
  subscriptionUrls: {
    starter_promo: 'https://secure.cardcom.solutions/External/lowProfileClearing/1000.aspx?LowProfileCode=83dfa717-2ca1-4de7-b5ac-298e90aad8e6',
    starter: 'https://secure.cardcom.solutions/External/lowProfileClearing/1000.aspx?LowProfileCode=09bb1a54-f9ad-443d-bae8-9b69d5e49304',
    growth: 'https://secure.cardcom.solutions/External/lowProfileClearing/1000.aspx?LowProfileCode=4ebfd781-be2b-4e8c-b496-133257e6df4e',
    pro: 'https://secure.cardcom.solutions/External/lowProfileClearing/1000.aspx?LowProfileCode=a0680a3b-1ca1-4e74-addc-09ddde46bad4',
  },

  // Low Profile IDs for subscription tiers
  lowProfileIds: {
    starter_promo: '83dfa717-2ca1-4de7-b5ac-298e90aad8e6',
    starter: '09bb1a54-f9ad-443d-bae8-9b69d5e49304',
    growth: '4ebfd781-be2b-4e8c-b496-133257e6df4e',
    pro: 'a0680a3b-1ca1-4e74-addc-09ddde46bad4',
  },

  // Credit pack pricing
  packs: {
    taste: {
      credits: 100000, // 1000 credits at 100x scale
      price: 29, // 29 NIS
      nameHe: 'חבילת קרדיטים טעימה',
      nameEn: 'Taste Credit Pack',
    },
    mini: {
      credits: 300000, // 3000 credits at 100x scale
      price: 79, // 79 NIS
      nameHe: 'חבילת קרדיטים מיני',
      nameEn: 'Mini Credit Pack',
    },
    plus: {
      credits: 1000000, // 10000 credits at 100x scale
      price: 249, // 249 NIS
      nameHe: 'חבילת קרדיטים פלוס',
      nameEn: 'Plus Credit Pack',
    },
  },

  // Subscription tiers pricing for token-based recurring charges
  tiers: {
    starter: { price: 49, credits: 500000, nameHe: 'מנוי סטרטר' },
    growth: { price: 120, credits: 1500000, nameHe: 'מנוי גרואת׳' },
    pro: { price: 260, credits: 4000000, nameHe: 'מנוי פרו' },
  },
} as const;
