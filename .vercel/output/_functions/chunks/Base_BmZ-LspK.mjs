import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { h as addAttribute, r as renderTemplate, u as unescapeHTML, n as renderHead, p as renderSlot } from './entrypoint_BEeWRyRY.mjs';
import 'clsx';
import { S as SITE_URL, B as BUSINESS } from './brand_CnEBFwtm.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Base;
  const {
    title = "Forly — סטודיו תוכן AI בוואטסאפ | פורלי",
    description = "פורלי הופכת הודעות וואטסאפ בעברית לתמונות, סרטונים, קרוסלות ואתרים — נוצרים ונשלחים ישר חזרה לצ׳אט שלכם.",
    canonical,
    ogImage = `${SITE_URL}/og-image.png`,
    schema,
    bilingual = false
  } = Astro2.props;
  const pathPart = Astro2.url.pathname.replace(/\/$/, "");
  const canonicalUrl = canonical ?? (SITE_URL + pathPart || SITE_URL);
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS.brandName,
    alternateName: [BUSINESS.brandNameHe, BUSINESS.legalName],
    url: SITE_URL,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    email: BUSINESS.email,
    telephone: BUSINESS.phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tel Aviv",
      addressCountry: "IL"
    },
    areaServed: "IL",
    description,
    sameAs: []
  };
  const schemas = schema ? Array.isArray(schema) ? [orgSchema, ...schema] : [orgSchema, schema] : [orgSchema];
  return renderTemplate`<html lang="he" dir="rtl"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(description, "content")}><meta name="theme-color" content="#fbf5f8"><title>${title}</title><!-- Canonical --><link rel="canonical"${addAttribute(canonicalUrl, "href")}><!-- Favicons + manifest --><link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"><link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"><link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"><link rel="manifest" href="/site.webmanifest"><!-- Open Graph --><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:type" content="website"><meta property="og:url"${addAttribute(canonicalUrl, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:locale" content="he_IL"><meta property="og:locale:alternate" content="en_US"><meta property="og:site_name"${addAttribute(BUSINESS.brandName, "content")}><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(title, "content")}><meta name="twitter:description"${addAttribute(description, "content")}><meta name="twitter:image"${addAttribute(ogImage, "content")}><!-- Geo --><meta name="geo.region" content="IL-TA"><meta name="geo.placename" content="Tel Aviv"><meta name="geo.position" content="32.0853;34.7818"><meta name="ICBM" content="32.0853, 34.7818"><!-- JSON-LD -->${schemas.map((s) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(s))))}<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;800;900&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">${bilingual && renderTemplate(_b || (_b = __template([`<script>
        (function () {
          var TITLES = {
            he: 'Forly — סטודיו תוכן AI בוואטסאפ | פורלי',
            en: 'Forly — A WhatsApp-native AI content studio'
          };
          var DESCS = {
            he: 'פורלי הופכת הודעות וואטסאפ בעברית לתמונות, סרטונים, קרוסלות ואתרים — נוצרים ונשלחים ישר חזרה לצ׳אט שלכם.',
            en: 'Forly turns Hebrew WhatsApp messages into images, videos, carousels, and websites — generated and delivered straight back into your chat.'
          };
          try {
            var stored = localStorage.getItem('forly-lang');
            var lang = stored === 'en' ? 'en' : 'he';
            var html = document.documentElement;
            html.lang = lang;
            html.dir = lang === 'he' ? 'rtl' : 'ltr';
            document.title = TITLES[lang];
            var meta = document.querySelector('meta[name="description"]');
            if (meta) meta.setAttribute('content', DESCS[lang]);
            window.__forlyLangTitles = TITLES;
            window.__forlyLangDescs = DESCS;
          } catch (e) { /* localStorage unavailable — keep server default */ }
        })();
      <\/script>`])))}${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/layouts/Base.astro", void 0);

export { $$Base as $ };
