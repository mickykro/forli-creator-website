import { C as CREDIT_PACKS, P as PRICING_TIERS, R as REFERRAL_CREDITS, T as TRIAL_CREDITS, a as CREDIT_COSTS } from './brand_CnEBFwtm.mjs';

const GET = () => {
  const data = {
    pricingTiers: PRICING_TIERS.map((tier) => ({
      id: tier.id,
      nameHe: tier.nameHe,
      nameEn: tier.nameEn,
      creditsMonthly: tier.creditsMonthly / 100,
      // Convert from internal scale
      priceMonthly: tier.priceMonthly,
      priceAnnual: tier.priceAnnual,
      launchPromo: tier.launchPromo ? {
        priceMonthly: tier.launchPromo.priceMonthly,
        duration: tier.launchPromo.duration
      } : null
    })),
    creditPacks: CREDIT_PACKS.map((pack) => ({
      id: pack.id,
      nameHe: pack.nameHe,
      nameEn: pack.nameEn,
      credits: pack.credits / 100,
      // Convert from internal scale
      price: pack.price,
      pricePerCredit: pack.price / (pack.credits / 100)
    })),
    creditCosts: {
      textConsultation: CREDIT_COSTS.text_consultation / 100,
      standardImage: CREDIT_COSTS.standard_image / 100,
      carousel: CREDIT_COSTS.carousel / 100,
      standardVideo: CREDIT_COSTS.standard_video / 100,
      premiumVideo: CREDIT_COSTS.premium_video / 100
    },
    trialCredits: TRIAL_CREDITS / 100,
    referralCredits: REFERRAL_CREDITS / 100,
    currency: "ILS",
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString()
  };
  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600"
      // Cache for 1 hour
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
