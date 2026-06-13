import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_BEeWRyRY.mjs';
import { $ as $$Base } from './Base_BmZ-LspK.mjs';
import { W as WHATSAPP_QUESTION_URL } from './brand_CnEBFwtm.mjs';

const $$Failed = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Failed;
  const url = new URL(Astro2.request.url);
  const reason = url.searchParams.get("reason") || "";
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": "התשלום נכשל — Forly | Payment Failed", "description": "אופס, משהו השתבש", "bilingual": true, "data-astro-cid-joejaz7g": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="failed-page" data-astro-cid-joejaz7g> <div class="container" data-astro-cid-joejaz7g> <div class="failed-card" data-astro-cid-joejaz7g> <div class="x-mark" data-astro-cid-joejaz7g> <svg viewBox="0 0 52 52" data-astro-cid-joejaz7g> <circle class="x-circle" cx="26" cy="26" r="25" fill="none" data-astro-cid-joejaz7g></circle> <path class="x-line x-line-1" d="M16,16 l20,20" data-astro-cid-joejaz7g></path> <path class="x-line x-line-2" d="M16,36 l20,-20" data-astro-cid-joejaz7g></path> </svg> </div> <h1 class="title" data-astro-cid-joejaz7g> <span class="l-he" data-astro-cid-joejaz7g>התשלום נכשל</span> <span class="l-en" data-astro-cid-joejaz7g>Payment Failed</span> </h1> ${reason && renderTemplate`<p class="reason" data-astro-cid-joejaz7g> <span class="l-he" data-astro-cid-joejaz7g>${reason}</span> <span class="l-en" data-astro-cid-joejaz7g>${reason}</span> </p>`} <p class="message" data-astro-cid-joejaz7g> <span class="l-he" data-astro-cid-joejaz7g>
לא חוייבת. נסה שוב או פנה אלינו לעזרה.
</span> <span class="l-en" data-astro-cid-joejaz7g>
You weren't charged. Try again or contact us for help.
</span> </p> <div class="actions" data-astro-cid-joejaz7g> <a href="/pricing" class="btn btn-primary btn-lg" data-astro-cid-joejaz7g> <span class="l-he" data-astro-cid-joejaz7g>נסה שוב</span> <span class="l-en" data-astro-cid-joejaz7g>Try Again</span> </a> <a${addAttribute(WHATSAPP_QUESTION_URL, "href")} class="btn btn-ghost" target="_blank" rel="noopener noreferrer" data-astro-cid-joejaz7g> <span class="l-he" data-astro-cid-joejaz7g>צור קשר לעזרה</span> <span class="l-en" data-astro-cid-joejaz7g>Contact Support</span> </a> </div> <div class="info-box" data-astro-cid-joejaz7g> <p data-astro-cid-joejaz7g> <span class="l-he" data-astro-cid-joejaz7g> <strong data-astro-cid-joejaz7g>סיבות נפוצות:</strong> פרטי כרטיס שגויים, יתרה לא מספקת, בעיית תקשורת
</span> <span class="l-en" data-astro-cid-joejaz7g> <strong data-astro-cid-joejaz7g>Common reasons:</strong> Incorrect card details, insufficient funds, connection issue
</span> </p> </div> </div> </div> </main> ` })}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/checkout/failed.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/checkout/failed.astro";
const $$url = "/checkout/failed";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Failed,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
