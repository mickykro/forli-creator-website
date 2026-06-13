import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_BEeWRyRY.mjs';
import { $ as $$Base } from './Base_BmZ-LspK.mjs';
import { W as WHATSAPP_QUESTION_URL } from './brand_CnEBFwtm.mjs';

const $$Failed2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Failed2;
  const url = new URL(Astro2.request.url);
  const reason = url.searchParams.get("reason") || "";
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "התשלום נכשל — Forly | Payment Failed", "description": "אופס, משהו השתבש", "bilingual": true, "data-astro-cid-jxeqcq4j": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="failed-page" data-astro-cid-jxeqcq4j> <div class="container" data-astro-cid-jxeqcq4j> <div class="failed-card" data-astro-cid-jxeqcq4j> <div class="x-mark" data-astro-cid-jxeqcq4j> <svg viewBox="0 0 52 52" data-astro-cid-jxeqcq4j> <circle class="x-circle" cx="26" cy="26" r="25" fill="none" data-astro-cid-jxeqcq4j></circle> <path class="x-line x-line-1" d="M16,16 l20,20" data-astro-cid-jxeqcq4j></path> <path class="x-line x-line-2" d="M16,36 l20,-20" data-astro-cid-jxeqcq4j></path> </svg> </div> <h1 class="title" data-astro-cid-jxeqcq4j> <span class="l-he" data-astro-cid-jxeqcq4j>התשלום נכשל</span> <span class="l-en" data-astro-cid-jxeqcq4j>Payment Failed</span> </h1> ${reason && renderTemplate`<p class="reason" data-astro-cid-jxeqcq4j> <span class="l-he" data-astro-cid-jxeqcq4j>${reason}</span> <span class="l-en" data-astro-cid-jxeqcq4j>${reason}</span> </p>`} <p class="message" data-astro-cid-jxeqcq4j> <span class="l-he" data-astro-cid-jxeqcq4j>
לא חוייבת. נסה שוב או פנה אלינו לעזרה.
</span> <span class="l-en" data-astro-cid-jxeqcq4j>
You weren't charged. Try again or contact us for help.
</span> </p> <div class="actions" data-astro-cid-jxeqcq4j> <a href="/pricing" class="btn btn-primary btn-lg" data-astro-cid-jxeqcq4j> <span class="l-he" data-astro-cid-jxeqcq4j>נסה שוב</span> <span class="l-en" data-astro-cid-jxeqcq4j>Try Again</span> </a> <a${addAttribute(WHATSAPP_QUESTION_URL, "href")} class="btn btn-ghost" target="_blank" rel="noopener noreferrer" data-astro-cid-jxeqcq4j> <span class="l-he" data-astro-cid-jxeqcq4j>צור קשר לעזרה</span> <span class="l-en" data-astro-cid-jxeqcq4j>Contact Support</span> </a> </div> <div class="info-box" data-astro-cid-jxeqcq4j> <p data-astro-cid-jxeqcq4j> <span class="l-he" data-astro-cid-jxeqcq4j> <strong data-astro-cid-jxeqcq4j>סיבות נפוצות:</strong> פרטי כרטיס שגויים, יתרה לא מספקת, בעיית תקשורת
</span> <span class="l-en" data-astro-cid-jxeqcq4j> <strong data-astro-cid-jxeqcq4j>Common reasons:</strong> Incorrect card details, insufficient funds, connection issue
</span> </p> </div> </div> </div> </main> ` })}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/checkout/failed 2.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/checkout/failed 2.astro";
const $$url = "/checkout/failed 2";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Failed2,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
