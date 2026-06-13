import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_BEeWRyRY.mjs';
import { $ as $$Base } from './Base_BmZ-LspK.mjs';
import { b as WHATSAPP_URL } from './brand_CnEBFwtm.mjs';

const $$Success = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "תשלום בוצע בהצלחה! — Forly | Payment Successful", "description": "התשלום שלך בוצע בהצלחה", "bilingual": true, "data-astro-cid-nuuikkrn": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="success-page" data-astro-cid-nuuikkrn> <div class="container" data-astro-cid-nuuikkrn> <div class="success-card" data-astro-cid-nuuikkrn> <div class="checkmark" data-astro-cid-nuuikkrn> <svg viewBox="0 0 52 52" data-astro-cid-nuuikkrn> <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none" data-astro-cid-nuuikkrn></circle> <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" data-astro-cid-nuuikkrn></path> </svg> </div> <h1 class="title" data-astro-cid-nuuikkrn> <span class="l-he" data-astro-cid-nuuikkrn>התשלום בוצע בהצלחה!</span> <span class="l-en" data-astro-cid-nuuikkrn>Payment Successful!</span> </h1> <p class="message" data-astro-cid-nuuikkrn> <span class="l-he" data-astro-cid-nuuikkrn>
הקרדיטים שלך יתווספו תוך מספר דקות.<br data-astro-cid-nuuikkrn>
תוכל להתחיל ליצור תוכן מיד בוואטסאפ.
</span> <span class="l-en" data-astro-cid-nuuikkrn>
Your credits will be added within a few minutes.<br data-astro-cid-nuuikkrn>
You can start creating content right away on WhatsApp.
</span> </p> <div class="actions" data-astro-cid-nuuikkrn> <a${addAttribute(WHATSAPP_URL, "href")} class="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer" data-astro-cid-nuuikkrn> <span class="l-he" data-astro-cid-nuuikkrn>פתח וואטסאפ</span> <span class="l-en" data-astro-cid-nuuikkrn>Open WhatsApp</span> </a> <a href="/" class="btn btn-ghost" data-astro-cid-nuuikkrn> <span class="l-he" data-astro-cid-nuuikkrn>חזור לדף הבית</span> <span class="l-en" data-astro-cid-nuuikkrn>Back to Home</span> </a> </div> <div class="info-box" data-astro-cid-nuuikkrn> <p data-astro-cid-nuuikkrn> <span class="l-he" data-astro-cid-nuuikkrn> <strong data-astro-cid-nuuikkrn>צריך עזרה?</strong> פנה אלינו בוואטסאפ ונעזור לך מיד.
</span> <span class="l-en" data-astro-cid-nuuikkrn> <strong data-astro-cid-nuuikkrn>Need help?</strong> Contact us on WhatsApp and we'll help you right away.
</span> </p> </div> </div> </div> </main> ` })}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/checkout/success.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/checkout/success.astro";
const $$url = "/checkout/success";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Success,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
