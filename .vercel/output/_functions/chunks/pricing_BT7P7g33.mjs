import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, l as renderComponent, r as renderTemplate, s as spreadAttributes } from './entrypoint_BEeWRyRY.mjs';
import { r as renderScript } from './script_DXS-_X5I.mjs';
import { $ as $$Base } from './Base_BmZ-LspK.mjs';
import { $ as $$T, a as $$Nav, b as $$CTA } from './CTA_BFY6wlS3.mjs';
import { W as WHATSAPP_QUESTION_URL, c as WHATSAPP_HELLO_URL, P as PRICING_TIERS, C as CREDIT_PACKS, S as SITE_URL, a as CREDIT_COSTS, T as TRIAL_CREDITS } from './brand_CnEBFwtm.mjs';

const $$PricingCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$PricingCard;
  const { id, nameHe, nameEn, creditsMonthly, priceMonthly, priceAnnual, launchPromo, isPopular, features } = Astro2.props;
  const displayCredits = creditsMonthly / 100;
  const ctaUrl = `/checkout/login?product=subscription_${id}_monthly`;
  return renderTemplate`${maybeRenderHead()}<article${addAttribute(["pricing-card", { popular: isPopular, "has-promo": !!launchPromo }], "class:list")} data-pricing-card data-astro-cid-74n6vb6q> ${launchPromo && renderTemplate`<div class="promo-badge" data-astro-cid-74n6vb6q> ${renderComponent($$result, "T", $$T, { "he": `מבצע השקה · ${launchPromo.duration}`, "en": `Launch promo · First 2 months`, "data-astro-cid-74n6vb6q": true })} </div>`} ${isPopular && renderTemplate`<div class="popular-badge" data-astro-cid-74n6vb6q> ${renderComponent($$result, "T", $$T, { "he": "הכי פופולרי", "en": "Most popular", "data-astro-cid-74n6vb6q": true })} </div>`} <header class="card-header" data-astro-cid-74n6vb6q> <h3 class="tier-name" data-astro-cid-74n6vb6q> <span class="l-he" data-astro-cid-74n6vb6q>${nameHe}</span> <span class="l-en" data-astro-cid-74n6vb6q>${nameEn}</span> </h3> <p class="credits" data-astro-cid-74n6vb6q> <span class="credits-num" data-astro-cid-74n6vb6q>${displayCredits.toLocaleString()}</span> <span class="credits-label" data-astro-cid-74n6vb6q>${renderComponent($$result, "T", $$T, { "he": "קרדיטים לחודש", "en": "credits/month", "data-astro-cid-74n6vb6q": true })}</span> </p> </header> <div class="pricing-body" data-astro-cid-74n6vb6q> <div class="price-block" data-astro-cid-74n6vb6q> ${launchPromo ? renderTemplate`<div class="price-promo" data-astro-cid-74n6vb6q> <span class="price-old" data-astro-cid-74n6vb6q>₪${priceMonthly}</span> <span class="price-current" data-astro-cid-74n6vb6q>₪${launchPromo.priceMonthly}</span> <span class="price-period" data-astro-cid-74n6vb6q>${renderComponent($$result, "T", $$T, { "he": "/חודש", "en": "/mo", "data-astro-cid-74n6vb6q": true })}</span> </div>` : renderTemplate`<div class="price-regular" data-astro-cid-74n6vb6q> <span class="price-current" data-astro-cid-74n6vb6q>₪${priceMonthly}</span> <span class="price-period" data-astro-cid-74n6vb6q>${renderComponent($$result, "T", $$T, { "he": "/חודש", "en": "/mo", "data-astro-cid-74n6vb6q": true })}</span> </div>`} <p class="price-annual" data-astro-cid-74n6vb6q> ${renderComponent($$result, "T", $$T, { "he": `או ₪${priceAnnual} לשנה (חודשיים חינם)`, "en": `or ₪${priceAnnual}/year (2 months free)`, "data-astro-cid-74n6vb6q": true })} </p> </div> <ul class="features" data-astro-cid-74n6vb6q> ${features.map((f) => renderTemplate`<li data-astro-cid-74n6vb6q> <span class="check" aria-hidden="true" data-astro-cid-74n6vb6q>✓</span> ${renderComponent($$result, "T", $$T, { "he": f.he, "en": f.en, "data-astro-cid-74n6vb6q": true })} </li>`)} </ul> <a${addAttribute(ctaUrl, "href")} target="_blank" rel="noopener noreferrer"${addAttribute(["btn", isPopular ? "btn-primary" : "btn-ghost"], "class:list")} data-astro-cid-74n6vb6q> ${renderComponent($$result, "T", $$T, { "he": "התחל עכשיו", "en": "Get started", "data-astro-cid-74n6vb6q": true })} </a> </div> </article>`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/pricing/PricingCard.astro", void 0);

const $$CreditPackCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CreditPackCard;
  const { id, nameHe, nameEn, credits, price } = Astro2.props;
  const displayCredits = credits / 100;
  const pricePerCredit = (price / displayCredits).toFixed(2);
  const ctaUrl = `/checkout/login?product=credit_pack_${id}`;
  return renderTemplate`${maybeRenderHead()}<article class="credit-pack" data-credit-pack data-astro-cid-6inf5f45> <div class="pack-header" data-astro-cid-6inf5f45> <h3 class="pack-name" data-astro-cid-6inf5f45> <span class="l-he" data-astro-cid-6inf5f45>${nameHe}</span> <span class="l-en" data-astro-cid-6inf5f45>${nameEn}</span> </h3> <div class="pack-credits" data-astro-cid-6inf5f45> <span class="credits-num" data-astro-cid-6inf5f45>${displayCredits.toLocaleString()}</span> <span class="credits-label" data-astro-cid-6inf5f45>${renderComponent($$result, "T", $$T, { "he": "קרדיטים", "en": "credits", "data-astro-cid-6inf5f45": true })}</span> </div> </div> <div class="pack-body" data-astro-cid-6inf5f45> <div class="pack-price" data-astro-cid-6inf5f45> <span class="price" data-astro-cid-6inf5f45>₪${price}</span> </div> <p class="price-per-credit" data-astro-cid-6inf5f45> ${renderComponent($$result, "T", $$T, { "he": `₪${pricePerCredit} לקרדיט`, "en": `₪${pricePerCredit}/credit`, "data-astro-cid-6inf5f45": true })} </p> <a${addAttribute(ctaUrl, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm" data-astro-cid-6inf5f45> ${renderComponent($$result, "T", $$T, { "he": "רכישה בוואטסאפ", "en": "Buy via WhatsApp", "data-astro-cid-6inf5f45": true })} </a> </div> </article>`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/pricing/CreditPackCard.astro", void 0);

const $$PricingFAQ = createComponent(($$result, $$props, $$slots) => {
  const faqs = [
    {
      questionHe: "איך עובדים קרדיטים?",
      questionEn: "How do credits work?",
      answerHe: "קרדיטים הם המטבע של פורלי. כל פעולה צורכת כמות קרדיטים שונה — תמונה צורכת כ-100 קרדיטים, קרוסלה כ-250, וסרטון כ-500. ככל שהתוכן מורכב יותר, כך נדרשים יותר קרדיטים.",
      answerEn: "Credits are Forly's currency. Each action uses a different amount — an image uses ~100 credits, a carousel ~250, and a video ~500. The more complex the content, the more credits required."
    },
    {
      questionHe: "האם קרדיטים פגים?",
      questionEn: "Do credits expire?",
      answerHe: "קרדיטים במסלולים החודשיים מתחדשים בכל חודש ולא עוברים לחודש הבא. קרדיטים בחבילות חד-פעמיות תקפים ל-12 חודשים מרגע הרכישה.",
      answerEn: "Credits in monthly plans reset each month and don't roll over. Credits from one-time packs are valid for 12 months from purchase."
    },
    {
      questionHe: "אפשר לבטל בכל רגע?",
      questionEn: "Can I cancel anytime?",
      answerHe: "כן, אין התחייבות. אפשר לבטל את המסלול החודשי בכל רגע דרך וואטסאפ או במייל ל-info@call4li.com. הביטול ייכנס לתוקף בתום תקופת החיוב הנוכחית.",
      answerEn: "Yes, no commitment. You can cancel your monthly plan anytime via WhatsApp or email to info@call4li.com. Cancellation takes effect at the end of the current billing period."
    },
    {
      questionHe: "באילו אמצעי תשלום אתם מקבלים?",
      questionEn: "What payment methods are accepted?",
      answerHe: "אנחנו מקבלים כרטיסי אשראי (ויזה, מאסטרקארד, אמריקן אקספרס), ביט, ו-PayPal. התשלום מאובטח ומוצפן.",
      answerEn: "We accept credit cards (Visa, Mastercard, American Express), Bit, and PayPal. All payments are secure and encrypted."
    },
    {
      questionHe: "האם אתם מנפיקים חשבונית מס?",
      questionEn: "Do you issue a tax invoice?",
      answerHe: "כן, חשבונית מס נשלחת אוטומטית למייל לאחר כל תשלום. אם אתם צריכים חשבונית על שם עסק או פרטים נוספים, פנו אלינו בוואטסאפ.",
      answerEn: "Yes, a tax invoice is automatically sent to your email after each payment. If you need an invoice with business details, contact us via WhatsApp."
    },
    {
      questionHe: "מה קורה אם נגמרים לי הקרדיטים?",
      questionEn: "What happens if I run out of credits?",
      answerHe: "תקבלו התראה כשנשארו לכם 20% מהקרדיטים. אפשר לרכוש חבילת קרדיטים נוספת בכל רגע, או לשדרג מסלול. פורלי לא תפסיק לעבוד באמצע — רק תודיע לכם שהקרדיטים אזלו.",
      answerEn: "You'll get a notification when you have 20% credits left. You can purchase an additional credit pack anytime, or upgrade your plan. Forly won't stop mid-task — it will just let you know when credits are depleted."
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="pricing-faq" id="pricing-faq" data-pricing-faq data-astro-cid-7fi6457q> <div class="container" data-astro-cid-7fi6457q> <header class="faq-header" data-astro-cid-7fi6457q> <h2 class="faq-title" data-astro-cid-7fi6457q> ${renderComponent($$result, "T", $$T, { "he": "שאלות נפוצות על מחירים", "en": "Pricing FAQ", "data-astro-cid-7fi6457q": true })} </h2> <p class="faq-sub" data-astro-cid-7fi6457q> ${renderComponent($$result, "T", $$T, { "he": "התשובות לכל מה שרציתם לדעת על תשלומים וקרדיטים", "en": "Answers to everything you wanted to know about payments and credits", "data-astro-cid-7fi6457q": true })} </p> </header> <div class="faq-list" data-astro-cid-7fi6457q> ${faqs.map((faq, i) => renderTemplate`<details class="faq-item"${spreadAttributes(i === 0 ? { open: true } : {})} data-astro-cid-7fi6457q> <summary data-astro-cid-7fi6457q> ${renderComponent($$result, "T", $$T, { "he": faq.questionHe, "en": faq.questionEn, "data-astro-cid-7fi6457q": true })} </summary> <p data-astro-cid-7fi6457q> <span class="l-he" data-astro-cid-7fi6457q>${faq.answerHe}</span> <span class="l-en" data-astro-cid-7fi6457q>${faq.answerEn}</span> </p> </details>`)} </div> <div class="faq-cta" data-astro-cid-7fi6457q> <p data-astro-cid-7fi6457q>${renderComponent($$result, "T", $$T, { "he": "יש שאלה נוספת?", "en": "Have another question?", "data-astro-cid-7fi6457q": true })}</p> <a${addAttribute(WHATSAPP_QUESTION_URL, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-ghost" data-astro-cid-7fi6457q> ${renderComponent($$result, "T", $$T, { "he": "שאלו אותנו בוואטסאפ", "en": "Ask us on WhatsApp", "data-astro-cid-7fi6457q": true })} </a> </div> </div> </section>`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/pricing/PricingFAQ.astro", void 0);

const $$Pricing = createComponent(($$result, $$props, $$slots) => {
  const tierFeatures = {
    starter: [
      { he: "כל סוגי התוכן (תמונה, סרטון, קרוסלה)", en: "All content types (image, video, carousel)" },
      { he: "זהות מותגית מותאמת אישית", en: "Custom brand identity" },
      { he: "תמיכה בוואטסאפ", en: "WhatsApp support" },
      { he: "קרדיטים לא עוברים לחודש הבא", en: "Credits don't roll over" }
    ],
    growth: [
      { he: "הכל ב-Starter, ועוד:", en: "Everything in Starter, plus:" },
      { he: "3X קרדיטים לחודש", en: "3X credits per month" },
      { he: "עדיפות בתור", en: "Priority queue" },
      { he: "גישה מוקדמת לפיצ׳רים חדשים", en: "Early access to new features" }
    ],
    pro: [
      { he: "הכל ב-Growth, ועוד:", en: "Everything in Growth, plus:" },
      { he: "8X קרדיטים לחודש", en: "8X credits per month" },
      { he: "מנהל חשבון ייעודי", en: "Dedicated account manager" },
      { he: "SLA זמן תגובה", en: "Response time SLA" }
    ]
  };
  const creditExamples = [
    {
      iconHe: "תמונה",
      iconEn: "Image",
      credits: CREDIT_COSTS.standard_image / 100,
      descHe: "תמונה מעוצבת",
      descEn: "Styled image"
    },
    {
      iconHe: "קרוסלה",
      iconEn: "Carousel",
      credits: CREDIT_COSTS.carousel / 100,
      descHe: "קרוסלה לאינסטגרם",
      descEn: "Instagram carousel"
    },
    {
      iconHe: "סרטון",
      iconEn: "Video",
      credits: CREDIT_COSTS.standard_video / 100,
      descHe: "סרטון קצר",
      descEn: "Short video"
    },
    {
      iconHe: "ייעוץ",
      iconEn: "Consult",
      credits: CREDIT_COSTS.text_consultation / 100,
      descHe: "ייעוץ תוכן",
      descEn: "Content consultation"
    }
  ];
  const displayTrialCredits = TRIAL_CREDITS / 100;
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Forly Pricing",
    description: "Pricing plans for Forly AI content studio",
    url: `${SITE_URL}/pricing`
  };
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "מחירים — Forly · פורלי | Pricing", "description": "בחרו את המסלול המתאים לכם — מ-Starter לעסקים קטנים ועד Pro לסוכנויות. נסו בחינם עם 500 קרדיטים.", "bilingual": true, "schema": pricingSchema, "data-astro-cid-lmkygsfs": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Nav", $$Nav, { "data-astro-cid-lmkygsfs": true })} ${maybeRenderHead()}<main class="pricing-page" data-astro-cid-lmkygsfs> <!-- Hero / Trial Banner --> <section class="pricing-hero" data-pricing-hero data-astro-cid-lmkygsfs> <div class="container" data-astro-cid-lmkygsfs> <div class="hero-badge" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "T", $$T, { "he": "התחילו בחינם", "en": "Start free", "data-astro-cid-lmkygsfs": true })} </div> <h1 class="hero-title" data-astro-cid-lmkygsfs> <span class="l-he" data-astro-cid-lmkygsfs>מחירים פשוטים.<br data-astro-cid-lmkygsfs><span class="grad" data-astro-cid-lmkygsfs>בלי הפתעות.</span></span> <span class="l-en" data-astro-cid-lmkygsfs>Simple pricing.<br data-astro-cid-lmkygsfs><span class="grad" data-astro-cid-lmkygsfs>No surprises.</span></span> </h1> <p class="hero-sub" data-astro-cid-lmkygsfs> <span class="l-he" data-astro-cid-lmkygsfs>נסו את פורלי עם <strong data-astro-cid-lmkygsfs>${displayTrialCredits} קרדיטים בחינם</strong> — בלי כרטיס אשראי. שדרגו כשתרצו.</span> <span class="l-en" data-astro-cid-lmkygsfs>Try Forly with <strong data-astro-cid-lmkygsfs>${displayTrialCredits} free credits</strong> — no credit card required. Upgrade when ready.</span> </p> <a${addAttribute(WHATSAPP_HELLO_URL, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "T", $$T, { "he": "התחילו עכשיו בחינם", "en": "Start free now", "data-astro-cid-lmkygsfs": true })} </a> </div> </section> <!-- Credit Value Strip --> <section class="credit-strip" data-credit-strip data-astro-cid-lmkygsfs> <div class="container" data-astro-cid-lmkygsfs> <p class="strip-label" data-astro-cid-lmkygsfs>${renderComponent($$result2, "T", $$T, { "he": "מה קרדיט שווה?", "en": "What's a credit worth?", "data-astro-cid-lmkygsfs": true })}</p> <div class="strip-items" data-astro-cid-lmkygsfs> ${creditExamples.map((ex) => renderTemplate`<div class="strip-item" data-astro-cid-lmkygsfs> <span class="item-icon" data-astro-cid-lmkygsfs>${renderComponent($$result2, "T", $$T, { "he": ex.iconHe, "en": ex.iconEn, "data-astro-cid-lmkygsfs": true })}</span> <span class="item-credits" data-astro-cid-lmkygsfs>~${ex.credits}</span> <span class="item-desc" data-astro-cid-lmkygsfs>${renderComponent($$result2, "T", $$T, { "he": ex.descHe, "en": ex.descEn, "data-astro-cid-lmkygsfs": true })}</span> </div>`)} </div> </div> </section> <!-- Subscription Tiers --> <section class="pricing-tiers" id="plans" data-pricing-tiers data-astro-cid-lmkygsfs> <div class="container" data-astro-cid-lmkygsfs> <header class="section-header" data-astro-cid-lmkygsfs> <h2 data-astro-cid-lmkygsfs>${renderComponent($$result2, "T", $$T, { "he": "מסלולים חודשיים", "en": "Monthly Plans", "data-astro-cid-lmkygsfs": true })}</h2> <p data-astro-cid-lmkygsfs>${renderComponent($$result2, "T", $$T, { "he": "בחרו את המסלול שמתאים לקצב היצירה שלכם", "en": "Choose the plan that fits your creation pace", "data-astro-cid-lmkygsfs": true })}</p> </header> <div class="tiers-grid" data-astro-cid-lmkygsfs> ${PRICING_TIERS.map((tier, i) => renderTemplate`${renderComponent($$result2, "PricingCard", $$PricingCard, { "id": tier.id, "nameHe": tier.nameHe, "nameEn": tier.nameEn, "creditsMonthly": tier.creditsMonthly, "priceMonthly": tier.priceMonthly, "priceAnnual": tier.priceAnnual, "launchPromo": tier.launchPromo, "isPopular": tier.id === "growth", "features": tierFeatures[tier.id], "data-astro-cid-lmkygsfs": true })}`)} </div> </div> </section> <!-- Credit Packs --> <section class="credit-packs" id="packs" data-credit-packs data-astro-cid-lmkygsfs> <div class="container" data-astro-cid-lmkygsfs> <header class="section-header" data-astro-cid-lmkygsfs> <h2 data-astro-cid-lmkygsfs>${renderComponent($$result2, "T", $$T, { "he": "חבילות קרדיטים", "en": "Credit Packs", "data-astro-cid-lmkygsfs": true })}</h2> <p data-astro-cid-lmkygsfs>${renderComponent($$result2, "T", $$T, { "he": "קנו קרדיטים חד-פעמיים — בלי מנוי, בלי התחייבות", "en": "Buy one-time credits — no subscription, no commitment", "data-astro-cid-lmkygsfs": true })}</p> </header> <div class="packs-grid" data-astro-cid-lmkygsfs> ${CREDIT_PACKS.map((pack) => renderTemplate`${renderComponent($$result2, "CreditPackCard", $$CreditPackCard, { "id": pack.id, "nameHe": pack.nameHe, "nameEn": pack.nameEn, "credits": pack.credits, "price": pack.price, "data-astro-cid-lmkygsfs": true })}`)} </div> <p class="packs-note" data-astro-cid-lmkygsfs> ${renderComponent($$result2, "T", $$T, { "he": "קרדיטים בחבילות תקפים ל-12 חודשים מרגע הרכישה", "en": "Pack credits are valid for 12 months from purchase", "data-astro-cid-lmkygsfs": true })} </p> </div> </section> <!-- Pricing FAQ --> ${renderComponent($$result2, "PricingFAQ", $$PricingFAQ, { "data-astro-cid-lmkygsfs": true })} </main> ${renderComponent($$result2, "CTA", $$CTA, { "data-astro-cid-lmkygsfs": true })} ` })}  ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/pricing.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/pricing.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/pricing.astro";
const $$url = "/pricing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pricing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
