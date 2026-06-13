import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, p as renderSlot } from './entrypoint_BEeWRyRY.mjs';
import { $ as $$Base } from './Base_BmZ-LspK.mjs';
import { B as BUSINESS } from './brand_CnEBFwtm.mjs';

const $$Legal = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Legal;
  const { title, description, heading, schema } = Astro2.props;
  const updatedAt = (/* @__PURE__ */ new Date()).toLocaleDateString("he-IL");
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "title": title, "description": description, "schema": schema, "data-astro-cid-5r5pfnjt": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="legal-nav" data-astro-cid-5r5pfnjt> <div class="container legal-nav-inner" data-astro-cid-5r5pfnjt> <a href="/" class="brand"${addAttribute(`${BUSINESS.brandName} home`, "aria-label")} data-astro-cid-5r5pfnjt> <span class="brand-mark" aria-hidden="true" data-astro-cid-5r5pfnjt></span> <span class="brand-name" data-astro-cid-5r5pfnjt>FORLY</span> </a> <a href="/" class="back-link" data-astro-cid-5r5pfnjt>→ חזרה לדף הבית</a> </div> </header> <main class="legal" dir="rtl" data-astro-cid-5r5pfnjt> <div class="container legal-container" data-astro-cid-5r5pfnjt> <h1 class="legal-title" data-astro-cid-5r5pfnjt>${heading}</h1> <p class="legal-meta" data-astro-cid-5r5pfnjt>עודכן לאחרונה: ${updatedAt}</p> <div class="legal-body" data-astro-cid-5r5pfnjt> ${renderSlot($$result2, $$slots["default"])} </div> </div> </main> <footer class="legal-footer" data-astro-cid-5r5pfnjt> <div class="container legal-footer-inner" data-astro-cid-5r5pfnjt> <div class="legal-footer-brand" data-astro-cid-5r5pfnjt> <span class="brand-mark" aria-hidden="true" data-astro-cid-5r5pfnjt></span> <span class="brand-name" data-astro-cid-5r5pfnjt>FORLY · ${BUSINESS.legalName}</span> </div> <nav class="legal-footer-links" aria-label="Legal" data-astro-cid-5r5pfnjt> <a href="/faq" data-astro-cid-5r5pfnjt>שאלות ותשובות</a> <a href="/terms" data-astro-cid-5r5pfnjt>תקנון אתר</a> <a href="/privacy" data-astro-cid-5r5pfnjt>מדיניות פרטיות</a> <a href="/accessibility" data-astro-cid-5r5pfnjt>הצהרת נגישות</a> </nav> <div class="legal-footer-contact" data-astro-cid-5r5pfnjt> <a${addAttribute(`mailto:${BUSINESS.email}`, "href")} data-astro-cid-5r5pfnjt>${BUSINESS.email}</a> <a${addAttribute(`tel:${BUSINESS.phoneE164}`, "href")} dir="ltr" data-astro-cid-5r5pfnjt>${BUSINESS.phone}</a> </div> <p class="legal-footer-copy" data-astro-cid-5r5pfnjt>© ${(/* @__PURE__ */ new Date()).getFullYear()} ${BUSINESS.legalName}. כל הזכויות שמורות.</p> </div> </footer> ` })}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/layouts/Legal.astro", void 0);

export { $$Legal as $ };
