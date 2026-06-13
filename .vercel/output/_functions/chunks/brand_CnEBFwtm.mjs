const SITE_URL = "https://call4li.com";
const BUSINESS = {
  legalName: "Call4li",
  brandName: "Forly",
  brandNameHe: "פורלי",
  email: "info@call4li.com",
  phone: "054-801-8957",
  phoneE164: "+972548018957",
  whatsappE164: "972553163293"
};
const WHATSAPP_URL = `https://wa.me/${BUSINESS.whatsappE164}`;
const WHATSAPP_HELLO_URL = `${WHATSAPP_URL}?text=${encodeURIComponent("היי, אני רוצה להצטרף לפורלי")}`;
const WHATSAPP_QUESTION_URL = `${WHATSAPP_URL}?text=${encodeURIComponent("היי, יש לי שאלה לגבי פורלי")}`;
const TRIAL_CREDITS = 5e4;
const REFERRAL_CREDITS = 1e5;
const PRICING_TIERS = [
  {
    id: "starter",
    nameHe: "סטרטר",
    nameEn: "Starter",
    creditsMonthly: 5e5,
    // 5000 credits at 100x scale
    priceMonthly: 99,
    priceAnnual: 990,
    launchPromo: {
      priceMonthly: 49,
      duration: "חודשיים ראשונים"
    }
  },
  {
    id: "growth",
    nameHe: "גרואת׳",
    nameEn: "Growth",
    creditsMonthly: 15e5,
    // 15000 credits at 100x scale
    priceMonthly: 249,
    priceAnnual: 2490,
    launchPromo: {
      priceMonthly: 149,
      duration: "חודשיים ראשונים"
    }
  },
  {
    id: "pro",
    nameHe: "פרו",
    nameEn: "Pro",
    creditsMonthly: 4e6,
    // 40000 credits at 100x scale
    priceMonthly: 499,
    priceAnnual: 4990,
    launchPromo: {
      priceMonthly: 299,
      duration: "חודשיים ראשונים"
    }
  }
];
const CREDIT_PACKS = [
  {
    id: "taste",
    nameHe: "טעימה",
    nameEn: "Taste",
    credits: 1e5,
    // 1000 credits at 100x scale
    price: 29
  },
  {
    id: "mini",
    nameHe: "מיני",
    nameEn: "Mini",
    credits: 3e5,
    // 3000 credits at 100x scale
    price: 79
  },
  {
    id: "plus",
    nameHe: "פלוס",
    nameEn: "Plus",
    credits: 1e6,
    // 10000 credits at 100x scale
    price: 249
  }
];
const CREDIT_COSTS = {
  text_consultation: 1500,
  // 15 credits at 100x scale (1000-2000 range)
  standard_image: 1e4,
  // 100 credits at 100x scale
  carousel: 25e3,
  // 250 credits at 100x scale
  standard_video: 5e4,
  // 500 credits at 100x scale
  premium_video: 75e3
  // 750 credits at 100x scale
};

export { BUSINESS as B, CREDIT_PACKS as C, PRICING_TIERS as P, REFERRAL_CREDITS as R, SITE_URL as S, TRIAL_CREDITS as T, WHATSAPP_QUESTION_URL as W, CREDIT_COSTS as a, WHATSAPP_URL as b, WHATSAPP_HELLO_URL as c };
