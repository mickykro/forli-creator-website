import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, l as renderComponent, r as renderTemplate } from './entrypoint_BEeWRyRY.mjs';
import { $ as $$Base } from './Base_BmZ-LspK.mjs';
import { $ as $$T, a as $$Nav, b as $$CTA } from './CTA_BFY6wlS3.mjs';
import { r as renderScript } from './script_DXS-_X5I.mjs';
import { S as SITE_URL } from './brand_CnEBFwtm.mjs';

const $$WhatsAppInput = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$WhatsAppInput;
  const {
    he,
    en,
    dir = "rtl"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="wa-input" role="presentation" data-astro-cid-3rp3nmf4> <div class="wa-field"${addAttribute(dir, "dir")} data-astro-cid-3rp3nmf4> <!-- emoji / smiley --> <svg class="wa-icon" viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-3rp3nmf4> <path fill="currentColor" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm-3.5-9a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 8.5 11zm7 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm-3.5 6.5A5 5 0 0 1 7.5 13h9a5 5 0 0 1-4.5 4.5z" data-astro-cid-3rp3nmf4></path> </svg> <span class="wa-text" data-astro-cid-3rp3nmf4> ${en ? renderTemplate`${renderComponent($$result, "T", $$T, { "he": he, "en": en, "data-astro-cid-3rp3nmf4": true })}` : he} </span> <!-- mic --> <svg class="wa-icon" viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-3rp3nmf4> <path fill="currentColor" d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11z" data-astro-cid-3rp3nmf4></path> </svg> <!-- camera --> <svg class="wa-icon" viewBox="0 0 24 24" aria-hidden="true" data-astro-cid-3rp3nmf4> <path fill="currentColor" d="M20 4h-3.2L15 2H9L7.2 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm-8 13a5 5 0 1 1 5-5 5 5 0 0 1-5 5zm0-8a3 3 0 1 0 3 3 3 3 0 0 0-3-3z" data-astro-cid-3rp3nmf4></path> </svg> </div> <button class="wa-send" type="button" aria-hidden="true" tabindex="-1" data-astro-cid-3rp3nmf4> <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" data-astro-cid-3rp3nmf4> <path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" data-astro-cid-3rp3nmf4></path> </svg> </button> </div>`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/WhatsAppInput.astro", void 0);

const $$WhatsAppMessage = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$WhatsAppMessage;
  const {
    he,
    en,
    time = "",
    variant = "incoming"
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["wa-msg", `wa-msg--${variant}`], "class:list")} role="presentation" data-astro-cid-cuntagyp> <div class="wa-msg-bubble" data-astro-cid-cuntagyp> <span class="wa-msg-text" data-astro-cid-cuntagyp> ${en ? renderTemplate`${renderComponent($$result, "T", $$T, { "he": he, "en": en, "data-astro-cid-cuntagyp": true })}` : he} </span> ${time && renderTemplate`<span class="wa-msg-meta" data-astro-cid-cuntagyp> <span class="wa-msg-time" data-astro-cid-cuntagyp>${time}</span> ${variant === "outgoing" && renderTemplate`<svg class="wa-msg-check" viewBox="0 0 18 18" aria-hidden="true" data-astro-cid-cuntagyp> <path fill="currentColor" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.578.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.075-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039L2.614 9.708a.435.435 0 0 0-.614.05l-.451.576a.435.435 0 0 0 .049.614l3.273 2.94a.38.38 0 0 0 .578-.038l7.482-9.602a.436.436 0 0 0-.075-.609z" data-astro-cid-cuntagyp></path> </svg>`} </span>`} </div> </div>`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/WhatsAppMessage.astro", void 0);

const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="hero" id="top" data-hero data-astro-cid-bbe6dxrz> <div class="hero-pin" data-hero-pin data-astro-cid-bbe6dxrz> <!-- Horizontal halo: a circular pink gradient masked to its horizontal axis only --> <div class="hero-halo" aria-hidden="true" data-astro-cid-bbe6dxrz></div> <canvas class="hero-canvas" data-hero-canvas aria-hidden="true" data-astro-cid-bbe6dxrz></canvas> <!-- Ambient pink wash that rides on top of the canvas --> <div class="hero-glow" aria-hidden="true" data-astro-cid-bbe6dxrz></div> <div class="hero-vignette" aria-hidden="true" data-astro-cid-bbe6dxrz></div> <!-- Live frame counter — script writes [data-frame-num] / [data-frame-total]
         on every scrub tick (frameNum at line ~775, frameTotal at line ~881). --> <!-- <div class="tech tech-tr frame-hud" aria-hidden="true">
        <span class="tech-dot"></span>
        <span class="frame-hud-label"><T he="פריים" en="FRAME" /></span>
        <span class="frame-hud-num" data-frame-num>0001</span>
        <span class="frame-hud-sep">/</span>
        <span class="frame-hud-total" data-frame-total>----</span>
      </div> --> <div class="tech tech-bl" data-astro-cid-bbe6dxrz> <span data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "גלילה ↓", "en": "SCROLL ↓", "data-astro-cid-bbe6dxrz": true })}</span> </div> <div class="tech tech-br" data-astro-cid-bbe6dxrz> <span data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "וואטסאפ נייטיב · 24/7", "en": "WHATSAPP NATIVE · 24/7", "data-astro-cid-bbe6dxrz": true })}</span> </div> <!-- Hero copy: title above the canvas, text below it --> <div class="hero-top" data-astro-cid-bbe6dxrz> <h1 class="hero-title" data-hero-line data-astro-cid-bbe6dxrz> <span class="line line-1" data-hero-title-line data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "כתבו לפורלי.", "en": "Message Forly.", "data-astro-cid-bbe6dxrz": true })}</span> <span class="line line-2" data-hero-title-line data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "קבלו תוכן.", "en": "Get content.", "data-astro-cid-bbe6dxrz": true })}</span> <span class="line line-3" data-hero-title-line data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "בוואטסאפ.", "en": "In WhatsApp.", "data-astro-cid-bbe6dxrz": true })}</span> </h1> </div> <div class="hero-bottom" data-astro-cid-bbe6dxrz> <p class="hero-sub" data-hero-line data-astro-cid-bbe6dxrz> <span class="l-he" data-astro-cid-bbe6dxrz>שלחו הודעה בעברית. מקבלים תמונה, סרטון, קרוסלה או אתר — ישר בצ׳אט. בלי אפליקציה. בלי דשבורד.</span> <span class="l-en" data-astro-cid-bbe6dxrz>Send a Hebrew message. Get back the image, video, carousel, or website — right in your chat. No app. No dashboard.</span> </p> <div class="hero-actions" data-hero-line data-astro-cid-bbe6dxrz> <a href="#cta" class="btn btn-primary" data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "התחילו ליצור תוכן עם פורלי", "en": "Join the private beta", "data-astro-cid-bbe6dxrz": true })}</a> <a href="#features" class="btn btn-ghost" data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "ראו מה היא יוצרת ↓", "en": "See what it makes ↓", "data-astro-cid-bbe6dxrz": true })}</a> </div> </div> <!-- Mid-scroll tagline that fades over the frames --> <div class="hero-mid" data-hero-mid aria-hidden="true" data-astro-cid-bbe6dxrz> <p class="eyebrow" data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "בלי אפליקציה. בלי דשבורד.", "en": "No app. No dashboard.", "data-astro-cid-bbe6dxrz": true })}</p> <h2 class="mid-title" data-astro-cid-bbe6dxrz> <span class="l-he" data-astro-cid-bbe6dxrz>רק הודעה בעברית.<br data-astro-cid-bbe6dxrz>פורלי עושה את השאר.</span> <span class="l-en" data-astro-cid-bbe6dxrz>Just a Hebrew message.<br data-astro-cid-bbe6dxrz>Forly does the rest.</span> </h2> </div> <!-- WhatsApp input bubble — visible during frames 21-41 (above the animation) --> <div class="hero-msg" data-hero-msg aria-hidden="true" data-astro-cid-bbe6dxrz> ${renderComponent($$result, "WhatsAppInput", $$WhatsAppInput, { "he": "תעשי לי פוסט להחלקת קרטין שאני מציעה השבוע, סטייל קליל וקיצי", "en": "Make me a post for the keratin straightening I'm offering this week, light summery style", "data-astro-cid-bbe6dxrz": true })} </div> <!-- WhatsApp confirmation message (incoming chat bubble) — frame 81 to the end --> <div class="hero-msg-out" data-hero-msg-out aria-hidden="true" data-astro-cid-bbe6dxrz> ${renderComponent($$result, "WhatsAppMessage", $$WhatsAppMessage, { "he": "הפוסט שלך מוכן ✨", "en": "Your post is ready ✨", "time": "14:03", "variant": "incoming", "data-astro-cid-bbe6dxrz": true })} </div> <!-- Persistent side rails — what the user sends, what Forly returns --> <aside class="side side-left" data-side-left aria-hidden="true" data-astro-cid-bbe6dxrz> <p class="eyebrow" data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "אתם כותבים", "en": "You write", "data-astro-cid-bbe6dxrz": true })}</p> <div class="bubble bubble-in" data-astro-cid-bbe6dxrz> <span class="bubble-meta" data-astro-cid-bbe6dxrz>14:02 · ${renderComponent($$result, "T", $$T, { "he": "וואטסאפ", "en": "WhatsApp", "data-astro-cid-bbe6dxrz": true })}</span> <p class="bubble-text" dir="rtl" data-astro-cid-bbe6dxrz>תעשי לי פוסט להחלקת קרטין שאני מציעה השבוע, סטייל קליל וקיצי 💇‍♀️</p> </div> <ul class="chips" data-astro-cid-bbe6dxrz> <li data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "עברית", "en": "Hebrew", "data-astro-cid-bbe6dxrz": true })}</li> <li data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "חופשי", "en": "Free-form", "data-astro-cid-bbe6dxrz": true })}</li> <li data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "הודעה אחת", "en": "1 message", "data-astro-cid-bbe6dxrz": true })}</li> </ul> </aside> <aside class="side side-right" data-side-right aria-hidden="true" data-astro-cid-bbe6dxrz> <p class="eyebrow" data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "פורלי מחזירה", "en": "Forly returns", "data-astro-cid-bbe6dxrz": true })}</p> <div class="bubble bubble-out" data-astro-cid-bbe6dxrz> <span class="bubble-meta" data-astro-cid-bbe6dxrz>14:02 · ${renderComponent($$result, "T", $$T, { "he": "6 שניות", "en": "6s", "data-astro-cid-bbe6dxrz": true })}</span> <p class="bubble-text" dir="rtl" data-astro-cid-bbe6dxrz>הלחות ניצחה אותך הקיץ? לא השנה. החלקת קרטין מקצועית — השבוע בלבד במחיר השקה. שיער חלק שזז יפה, נראה טבעי ומחזיק חודשים ✨</p> <p class="bubble-tags" data-astro-cid-bbe6dxrz>#החלקתקרטין #שיערחלק #מבצעהשקה</p> </div> <ul class="chips" data-astro-cid-bbe6dxrz> <li data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "קרוסלה", "en": "Carousel", "data-astro-cid-bbe6dxrz": true })}</li> <li data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "כיתוב", "en": "Caption", "data-astro-cid-bbe6dxrz": true })}</li> <li data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "האשטגים", "en": "Hashtags", "data-astro-cid-bbe6dxrz": true })}</li> </ul> </aside> <!-- End-of-scroll product detail rails --> <aside class="hero-detail hero-detail-left" data-hero-detail-left data-astro-cid-bbe6dxrz> <p class="eyebrow" data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "המוצר", "en": "Product", "data-astro-cid-bbe6dxrz": true })}</p> <h3 data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "פורלי v2", "en": "Forly v2", "data-astro-cid-bbe6dxrz": true })}</h3> <ul data-astro-cid-bbe6dxrz> <li data-astro-cid-bbe6dxrz><span data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "ערוץ", "en": "Channel", "data-astro-cid-bbe6dxrz": true })}</span><b data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "וואטסאפ", "en": "WhatsApp", "data-astro-cid-bbe6dxrz": true })}</b></li> <li data-astro-cid-bbe6dxrz><span data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "עברית", "en": "Hebrew", "data-astro-cid-bbe6dxrz": true })}</span><b data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "נייטיב, ראשי", "en": "Native, first", "data-astro-cid-bbe6dxrz": true })}</b></li> <li data-astro-cid-bbe6dxrz><span data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "הצטרפות", "en": "Onboard", "data-astro-cid-bbe6dxrz": true })}</span><b data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "3 שאלות", "en": "3 questions", "data-astro-cid-bbe6dxrz": true })}</b></li> </ul> </aside> <aside class="hero-detail hero-detail-right" data-hero-detail-right data-astro-cid-bbe6dxrz> <p class="eyebrow" data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "הפלט", "en": "Output", "data-astro-cid-bbe6dxrz": true })}</p> <h3 data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "לעסקים קטנים", "en": "Built for SMBs", "data-astro-cid-bbe6dxrz": true })}</h3> <ul data-astro-cid-bbe6dxrz> <li data-astro-cid-bbe6dxrz><span data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "תמונה", "en": "Image", "data-astro-cid-bbe6dxrz": true })}</span><b data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "כ-6 שניות", "en": "~6 sec", "data-astro-cid-bbe6dxrz": true })}</b></li> <li data-astro-cid-bbe6dxrz><span data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "סרטון", "en": "Video", "data-astro-cid-bbe6dxrz": true })}</span><b data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "3 שוטים", "en": "3-shot story", "data-astro-cid-bbe6dxrz": true })}</b></li> <li data-astro-cid-bbe6dxrz><span data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "סגנונות", "en": "Tones", "data-astro-cid-bbe6dxrz": true })}</span><b data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "8 סגנונות", "en": "8 styles", "data-astro-cid-bbe6dxrz": true })}</b></li> </ul> </aside> <!-- Frame preload progress (auto-hides when done) --> <div class="hero-loader" data-hero-loader role="status" aria-live="polite" data-astro-cid-bbe6dxrz> <span class="hero-loader-label" data-astro-cid-bbe6dxrz>${renderComponent($$result, "T", $$T, { "he": "טוען סצנה", "en": "Loading scene", "data-astro-cid-bbe6dxrz": true })}</span> <span class="hero-loader-track" data-astro-cid-bbe6dxrz><span class="hero-loader-bar" data-hero-loader-bar data-astro-cid-bbe6dxrz></span></span> <span class="hero-loader-pct" data-hero-loader-pct data-astro-cid-bbe6dxrz>0%</span> </div> </div> </section>  ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/Hero.astro", void 0);

const $$CarouselPreview = createComponent(($$result, $$props, $$slots) => {
  const slides = [
    { src: "/keratin-carousel/slide-01.png", alt: { he: "הוק: הלחות ניצחה אותך הקיץ? לא השנה.", en: "Hook: Did the humidity beat you this summer? Not this year." } },
    { src: "/keratin-carousel/slide-02.png", alt: { he: "ההצעה: החלקת קרטין מקצועית — מחיר השקה השבוע בלבד", en: "Offer: professional keratin straightening — launch price this week only" } },
    { src: "/keratin-carousel/slide-03.png", alt: { he: "מה את מקבלת: מחזיק עד 4 חודשים, מראה טבעי, מותאם אישית", en: "Benefits: holds up to 4 months, natural look, personalized" } },
    { src: "/keratin-carousel/slide-04.png", alt: { he: "המקומות האחרונים לשבוע הזה", en: "Last spots for this week" } },
    { src: "/keratin-carousel/slide-05.png", alt: { he: 'CTA — שלחי "קרטין" בוואטסאפ', en: 'CTA — send "keratin" on WhatsApp' } }
  ];
  return renderTemplate`${maybeRenderHead()}<section class="cp-section" id="carousel-preview" aria-labelledby="cp-heading" data-astro-cid-apgg5us4> <header class="cp-head" data-astro-cid-apgg5us4> <p class="eyebrow" data-astro-cid-apgg5us4> ${renderComponent($$result, "T", $$T, { "he": "הפלט המלא · 30 שניות", "en": "Full output · 6 seconds", "data-astro-cid-apgg5us4": true })} </p> <h2 id="cp-heading" class="cp-title" data-astro-cid-apgg5us4> <span class="l-he" data-astro-cid-apgg5us4>זה מה שפורלי החזירה.</span> <span class="l-en" data-astro-cid-apgg5us4>This is what Forly returned.</span> </h2> <p class="cp-sub" data-astro-cid-apgg5us4> <span class="l-he" data-astro-cid-apgg5us4>קרוסלה של 5 סלייידים — מוכנה להעלאה לאינסטגרם.</span> <span class="l-en" data-astro-cid-apgg5us4>A 5-slide carousel — ready to post to Instagram.</span> </p> </header> <div class="cf-stage" data-cf-stage tabindex="0" role="region" aria-roledescription="carousel" aria-label="Keratin carousel preview" data-astro-cid-apgg5us4> <div class="cf-glow" aria-hidden="true" data-astro-cid-apgg5us4></div> <div class="cf-track" data-cf-track data-astro-cid-apgg5us4> ${slides.map((slide, i) => renderTemplate`<figure class="cf-card" data-cf-card${addAttribute(i, "data-i")} role="group"${addAttribute(`${i + 1} / ${slides.length}`, "aria-label")} data-astro-cid-apgg5us4> <span class="cp-num" data-astro-cid-apgg5us4>${String(i + 1).padStart(2, "0")}</span> <img${addAttribute(slide.src, "src")}${addAttribute(slide.alt.en, "alt")} width="540" height="540" loading="lazy" decoding="async" draggable="false" data-astro-cid-apgg5us4> <span class="cf-sheen" aria-hidden="true" data-astro-cid-apgg5us4></span> </figure>`)} </div> <!-- Floor shadow under the stage --> <div class="cf-floor" aria-hidden="true" data-astro-cid-apgg5us4></div> <button class="cf-arrow cf-prev" data-cf-prev aria-label="Previous slide" data-astro-cid-apgg5us4>‹</button> <button class="cf-arrow cf-next" data-cf-next aria-label="Next slide" data-astro-cid-apgg5us4>›</button> </div> <div class="cf-controls" data-astro-cid-apgg5us4> <span class="cf-counter" aria-hidden="true" data-astro-cid-apgg5us4> <span data-cf-cur data-astro-cid-apgg5us4>01</span><span class="cf-counter-sep" data-astro-cid-apgg5us4>/</span><span data-astro-cid-apgg5us4>${String(slides.length).padStart(2, "0")}</span> </span> <div class="cf-dots" data-cf-dots role="tablist" aria-label="Slides" data-astro-cid-apgg5us4> ${slides.map((_, i) => renderTemplate`<button class="cf-dot" data-cf-dot${addAttribute(i, "data-i")} role="tab"${addAttribute(`Slide ${i + 1}`, "aria-label")} data-astro-cid-apgg5us4> <span class="cf-dot-fill" data-astro-cid-apgg5us4></span> </button>`)} </div> <span class="cf-hint" data-astro-cid-apgg5us4> <span class="l-he" data-astro-cid-apgg5us4>גררו · לחצו · החליקו</span> <span class="l-en" data-astro-cid-apgg5us4>Drag · click · swipe</span> </span> </div> <footer class="cp-foot" data-astro-cid-apgg5us4> <p class="cp-caption" dir="rtl" data-astro-cid-apgg5us4> <span class="l-he" data-astro-cid-apgg5us4> <strong data-astro-cid-apgg5us4>הלחות ניצחה אותך הקיץ? לא השנה 💕</strong><br data-astro-cid-apgg5us4>
החלקת קרטין מקצועית — השבוע בלבד במחיר השקה. שיער חלק, זורם וטבעי שמחזיק חודשים — בלי פריזז, בלי בלגן, רק קיץ קליל.<br data-astro-cid-apgg5us4>
מקומות אחרונים — שלחי "קרטין" בהודעה ✨
</span> <span class="l-en" data-astro-cid-apgg5us4> <strong data-astro-cid-apgg5us4>Did the humidity beat you this summer? Not this year 💕</strong><br data-astro-cid-apgg5us4>
Professional keratin straightening — launch price, this week only. Smooth, flowing, natural hair that holds for months — no frizz, no chaos, just an effortless summer.<br data-astro-cid-apgg5us4>
Last spots — DM "keratin" ✨
</span> </p> <p class="cp-tags" data-astro-cid-apgg5us4>#החלקתקרטין&nbsp; #שיערחלק&nbsp; #מבצעהשקה&nbsp; #קיץ2026&nbsp; #ביוטי</p> </footer> </section>  ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/CarouselPreview.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/CarouselPreview.astro", void 0);

const $$RadialOrbitalTimeline = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$RadialOrbitalTimeline;
  const {
    items,
    headingHe,
    headingEn,
    eyebrowHe,
    eyebrowEn
  } = Astro2.props;
  const STATUS_LABEL = {
    completed: { he: "הושלם", en: "COMPLETE" },
    "in-progress": { he: "בתהליך", en: "IN PROGRESS" },
    pending: { he: "ממתין", en: "PENDING" }
  };
  return renderTemplate`${maybeRenderHead()}<section class="rot-section"${addAttribute(headingEn || "Forly process timeline", "aria-label")} data-astro-cid-lgozwrsj> ${(headingHe || eyebrowHe) && renderTemplate`<header class="rot-head" data-astro-cid-lgozwrsj> ${eyebrowHe && renderTemplate`<p class="eyebrow" data-astro-cid-lgozwrsj> ${renderComponent($$result, "T", $$T, { "he": eyebrowHe, "en": eyebrowEn ?? eyebrowHe, "data-astro-cid-lgozwrsj": true })} </p>`} ${headingHe && renderTemplate`<h2 class="rot-title" data-astro-cid-lgozwrsj> ${renderComponent($$result, "T", $$T, { "he": headingHe, "en": headingEn ?? headingHe, "data-astro-cid-lgozwrsj": true })} </h2>`} </header>`} <div class="rot-stage" data-rot-stage data-astro-cid-lgozwrsj> <!-- Central pulsing orb --> <div class="rot-core" aria-hidden="true" data-astro-cid-lgozwrsj> <span class="rot-core-ping" data-astro-cid-lgozwrsj></span> <span class="rot-core-ping rot-core-ping-2" data-astro-cid-lgozwrsj></span> <span class="rot-core-inner" data-astro-cid-lgozwrsj></span> </div> <!-- Orbit ring --> <div class="rot-ring" aria-hidden="true" data-astro-cid-lgozwrsj></div> <!-- Nodes (positioned by the script after mount) --> ${items.map((item, i) => renderTemplate`<div class="rot-node" role="button" tabindex="0" data-rot-node${addAttribute(item.id, "data-id")}${addAttribute(i, "data-index")}${addAttribute(item.relatedIds.join(","), "data-related")}${addAttribute(item.status, "data-status")}${addAttribute(item.progress, "data-progress")}${addAttribute(`${i + 1}. ${item.en.title}`, "aria-label")} data-astro-cid-lgozwrsj> <span class="rot-node-glow" aria-hidden="true" data-astro-cid-lgozwrsj></span> <span class="rot-node-dot" aria-hidden="true" data-astro-cid-lgozwrsj> <svg viewBox="0 0 24 24" width="16" height="16" data-astro-cid-lgozwrsj> ${item.iconKey === "plan" && renderTemplate`<path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" data-astro-cid-lgozwrsj></path>`} ${item.iconKey === "listen" && renderTemplate`<path fill="currentColor" d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11z" data-astro-cid-lgozwrsj></path>`} ${item.iconKey === "spark" && renderTemplate`<path fill="currentColor" d="M12 2l1.95 6.07L20 10l-6.05 1.93L12 18l-1.95-6.07L4 10l6.05-1.93L12 2zm6.5 11l1 3.1 3 1-3 1-1 3-1-3-3-1 3-1 1-3.1zM5.5 14l.75 2.4L8.5 17l-2.25.6L5.5 20l-.75-2.4L2.5 17l2.25-.6L5.5 14z" data-astro-cid-lgozwrsj></path>`} ${item.iconKey === "send" && renderTemplate`<path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" data-astro-cid-lgozwrsj></path>`} ${item.iconKey === "refresh" && renderTemplate`<path fill="currentColor" d="M17.65 6.35A8 8 0 1 0 19.73 14h-2.08A6 6 0 1 1 12 6a5.91 5.91 0 0 1 4.22 1.78L13 11h7V4l-2.35 2.35z" data-astro-cid-lgozwrsj></path>`} ${item.iconKey === "image" && renderTemplate`<path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.9 13.98l2.1 2.53 3.1-3.99L18 18H6l2.9-4.02zM6.5 9.5a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0z" data-astro-cid-lgozwrsj></path>`} ${item.iconKey === "image-edit" && renderTemplate`<path fill="currentColor" d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z" data-astro-cid-lgozwrsj></path>`} ${item.iconKey === "video" && renderTemplate`<path fill="currentColor" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" data-astro-cid-lgozwrsj></path>`} ${item.iconKey === "video-motion" && renderTemplate`<path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM10 17V7l5 5-5 5z" data-astro-cid-lgozwrsj></path>`} ${item.iconKey === "carousel" && renderTemplate`<path fill="currentColor" d="M2 7h3v10H2V7zm17 0h3v10h-3V7zM7 5h10c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1z" data-astro-cid-lgozwrsj></path>`} ${item.iconKey === "website" && renderTemplate`<path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zM5.5 6.75a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0zm2 0a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0zm2 0a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0z" data-astro-cid-lgozwrsj></path>`} </svg> </span> <span class="rot-node-label" data-astro-cid-lgozwrsj> ${renderComponent($$result, "T", $$T, { "he": item.he.title, "en": item.en.title, "data-astro-cid-lgozwrsj": true })} </span> <div class="rot-card" data-rot-card data-astro-cid-lgozwrsj> <div class="rot-card-stem" aria-hidden="true" data-astro-cid-lgozwrsj></div> <div class="rot-card-head" data-astro-cid-lgozwrsj> <span${addAttribute(`rot-status rot-status-${item.status}`, "class")} data-astro-cid-lgozwrsj> ${renderComponent($$result, "T", $$T, { "he": STATUS_LABEL[item.status].he, "en": STATUS_LABEL[item.status].en, "data-astro-cid-lgozwrsj": true })} </span> <span class="rot-card-date" data-astro-cid-lgozwrsj> ${renderComponent($$result, "T", $$T, { "he": item.he.date, "en": item.en.date, "data-astro-cid-lgozwrsj": true })} </span> </div> <h3 class="rot-card-title" data-astro-cid-lgozwrsj> ${renderComponent($$result, "T", $$T, { "he": item.he.title, "en": item.en.title, "data-astro-cid-lgozwrsj": true })} </h3> <p class="rot-card-body" data-astro-cid-lgozwrsj> ${renderComponent($$result, "T", $$T, { "he": item.he.content, "en": item.en.content, "data-astro-cid-lgozwrsj": true })} </p> ${item.relatedIds.length > 0 && renderTemplate`<div class="rot-card-related" data-astro-cid-lgozwrsj> <p class="rot-card-related-head" data-astro-cid-lgozwrsj> ${renderComponent($$result, "T", $$T, { "he": "שלבים מקושרים", "en": "Connected steps", "data-astro-cid-lgozwrsj": true })} </p> <div class="rot-card-related-list" data-astro-cid-lgozwrsj> ${item.relatedIds.map((rid) => {
    const r = items.find((x) => x.id === rid);
    if (!r) return null;
    return renderTemplate`<button type="button" class="rot-card-related-btn"${addAttribute(rid, "data-rot-jump")} data-astro-cid-lgozwrsj> ${renderComponent($$result, "T", $$T, { "he": r.he.title, "en": r.en.title, "data-astro-cid-lgozwrsj": true })} <span class="rot-card-related-arrow" aria-hidden="true" data-astro-cid-lgozwrsj>→</span> </button>`;
  })} </div> </div>`} </div> </div>`)} </div> </section>  ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/RadialOrbitalTimeline.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/RadialOrbitalTimeline.astro", void 0);

const $$Features = createComponent(($$result, $$props, $$slots) => {
  const processSteps = [
    {
      id: 1,
      iconKey: "image",
      he: {
        title: "יצירת תמונה",
        date: "5–10 שניות",
        content: "משפט אחד בעברית הופך לתמונה מוכנה לפרסום, עם כיתוב והאשטגים מותאמים לטון של העסק שלכם."
      },
      en: {
        title: "Create image",
        date: "5–10 seconds",
        content: "One Hebrew sentence becomes a ready-to-post image, with caption and hashtags matched to your brand voice."
      },
      status: "completed",
      relatedIds: [2, 5],
      progress: 100
    },
    {
      id: 2,
      iconKey: "image-edit",
      he: {
        title: "תמונה לתמונה",
        date: "בלי פוטושופ",
        content: 'שלחו תמונה ובקשה — "תוסיף לי כובע", "תשני את הצבע", "תחליפי רקע" — והפנים שלכם נשארות מזוהות.'
      },
      en: {
        title: "Image to image",
        date: "No Photoshop",
        content: 'Send a photo and a request — "add a hat", "change the color", "swap the background" — and your face stays recognizable.'
      },
      status: "completed",
      relatedIds: [1],
      progress: 96
    },
    {
      id: 3,
      iconKey: "video",
      he: {
        title: "יצירת סרטון",
        date: "10–15 שניות וידאו",
        content: "משפט אחד הופך לסרטון מיני בן 3 שוטים: פתיחה → תפנית → סיום. רציפות פנימית, סגנון לבחירה."
      },
      en: {
        title: "Create video",
        date: "10–15 second clip",
        content: "One sentence becomes a 3-shot mini-story: setup → turn → payoff. Internal continuity, tone of your choice."
      },
      status: "completed",
      relatedIds: [4],
      progress: 90
    },
    {
      id: 4,
      iconKey: "video-motion",
      he: {
        title: "תמונה לסרטון",
        date: "תנועה בהזמנה",
        content: 'שלחו תמונה. פורלי שואלת "איזו תנועה?" — והתשובה שלכם הופכת לסרטון 3 שוטים שמעוגן בתמונה המקורית.'
      },
      en: {
        title: "Image to video",
        date: "Motion on demand",
        content: 'Send an image. Forly asks "what motion?" — your reply becomes a 3-shot video anchored on your photo.'
      },
      status: "in-progress",
      relatedIds: [3],
      progress: 75
    },
    {
      id: 5,
      iconKey: "carousel",
      he: {
        title: "קרוסלה",
        date: "אינסטגרם",
        content: "3–5 תמונות מחוברות, מעוצבות לפוסט החלקה — מספרות סיפור אחד, פריים אחר פריים, עם כיתובים מותאמים."
      },
      en: {
        title: "Carousel",
        date: "Instagram swipe",
        content: "3–5 connected images designed as a swipe post — they tell one story frame by frame, captions included."
      },
      status: "in-progress",
      relatedIds: [1, 6],
      progress: 60
    },
    {
      id: 6,
      iconKey: "website",
      he: {
        title: "אתר עסק",
        date: "דף נחיתה",
        content: "דף עסק נקי שנבנה אוטומטית מהפרופיל שלכם ומכל התוכן שיצרתם — מתעדכן בהודעה אחת."
      },
      en: {
        title: "Website",
        date: "Landing page",
        content: "A clean business page built automatically from your profile and the content you've created — updates with a single message."
      },
      status: "pending",
      relatedIds: [5, 1, 3],
      progress: 35
    }
  ];
  const cards = [
    {
      label: { he: "טקסט → תמונה", en: "Text → Image" },
      title: { he: "פוסט ממשפט אחד", en: "Posts from a sentence" },
      body: {
        he: 'כתבו "תעשי לי פוסט לפיצרייה שלי". פורלי מחזירה את התמונה עם כיתוב בעברית והאשטגים — מוכן לפרסום.',
        en: 'Type "תעשי לי פוסט לפיצרייה שלי". Forly returns the image with a Hebrew caption and hashtags — ready to post.'
      },
      metric: 100,
      metricLabel: { he: "כיתוב + האשטגים", en: "Caption + hashtags" }
    },
    {
      label: { he: "תמונה → תמונה", en: "Image → Image" },
      title: { he: "עריכה בלי פוטושופ", en: "Edits without Photoshop" },
      body: {
        he: 'שלחו תמונה, כתבו "תוסיף לי כובע שמש". פורלי שומרת על הפנים שלכם ומשנה רק את מה שביקשתם.',
        en: 'Send a photo, write "תוסיף לי כובע שמש". Forly keeps your face recognizable and changes only what you asked for.'
      },
      metric: 96,
      metricLabel: { he: "הפנים נשמרות", en: "Identity preserved" }
    },
    {
      label: { he: "טקסט → סרטון", en: "Text → Video" },
      title: { he: "סיפור ב-3 שוטים", en: "3-shot mini-stories" },
      body: {
        he: "כל סרטון בנוי כך: פתיחה → תפנית → סיום. פורלי מייצרת את שלושת השוטים בריצה אחת, עם רציפות פנימית.",
        en: "Every video follows setup → turn → payoff. Forly generates all three shots in one pass, with internal continuity."
      },
      metric: 100,
      metricLabel: { he: "מבנה סיפורי", en: "Story arc shipped" }
    },
    {
      label: { he: "תמונה → סרטון", en: "Image → Video" },
      title: { he: "תנועה על התמונה שלכם", en: "Motion on top of your photo" },
      body: {
        he: 'שלחו תמונה. פורלי שואלת "איזו תנועה?" — והתשובה שלכם הופכת לסרטון 3 שוטים שמעוגן בתמונה.',
        en: 'Send the image. Forly asks "איזו תנועה?" — your reply becomes a 3-shot video anchored on your photo.'
      },
      metric: 90,
      metricLabel: { he: "זמן יצירת תנועה", en: "Motion turnaround" }
    },
    {
      label: { he: "מערכת סגנונות", en: "Tone system" },
      title: { he: "8 שפות ויזואליות", en: "8 visual DNAs" },
      body: {
        he: "יוקרתי · משעשע · קולנועי · אנרגטי · אינטימי · דוקומנטרי · חולמני · נועז. בחרו ברירת מחדל, או החליפו בכל הודעה בעברית.",
        en: "Luxurious · playful · cinematic · energetic · intimate · documentary · dreamy · bold. Pick one in your default, or override per message in Hebrew."
      },
      metric: 100,
      metricLabel: { he: "סגנונות זמינים", en: "Tones supported" }
    },
    {
      label: { he: "ישראל קודם כל", en: "Israeli first" },
      title: { he: "ים-תיכוני בברירת מחדל", en: "Mediterranean by default" },
      body: {
        he: "כל דמות שנוצרת מקבלת מאפיינים ים-תיכוניים ומזרח-תיכוניים — בנוי לעסקים ישראליים, לא הוצמד אחרי.",
        en: "Every generated character has Middle Eastern and Mediterranean features by default — built for Israeli businesses, not retrofitted."
      },
      metric: 100,
      metricLabel: { he: "בנוי לישראל", en: "Built for Israel" }
    }
  ];
  const stats = [
    { value: 6, suffix: "", accent: "pink", icon: "spark", he: "יכולות פעילות", en: "Capabilities shipping" },
    { value: 8, suffix: "", accent: "violet", icon: "palette", he: "סגנונות ויזואליים", en: "Visual tones" },
    { value: 10, suffix: " s", accent: "amber", icon: "clock", he: "זמן יצירת תמונה", en: "Image turnaround" },
    { value: 100, suffix: "%", accent: "sage", icon: "globe", he: "עברית נייטיב", en: "Hebrew native" }
  ];
  return renderTemplate`${renderComponent($$result, "RadialOrbitalTimeline", $$RadialOrbitalTimeline, { "items": processSteps, "eyebrowHe": "היכולות של פורלי", "eyebrowEn": "What Forly can do", "headingHe": "שש יכולות. הודעה אחת בעברית.", "headingEn": "Six capabilities. One Hebrew message.", "data-astro-cid-vnivfuh2": true })} ${maybeRenderHead()}<section class="features" id="features" data-astro-cid-vnivfuh2> <div class="container" data-astro-cid-vnivfuh2> <header class="features-head" data-reveal-stagger data-astro-cid-vnivfuh2> <p class="eyebrow" data-reveal data-astro-cid-vnivfuh2>${renderComponent($$result, "T", $$T, { "he": "מה פורלי יוצרת", "en": "What Forly makes", "data-astro-cid-vnivfuh2": true })}</p> <h2 class="features-title" data-reveal data-astro-cid-vnivfuh2> <span class="l-he" data-astro-cid-vnivfuh2>סטודיו <span class="grad" data-astro-cid-vnivfuh2>יצירתי</span><br data-astro-cid-vnivfuh2>שחי בצ׳אט שלכם.</span> <span class="l-en" data-astro-cid-vnivfuh2>A <span class="grad" data-astro-cid-vnivfuh2>creative studio</span><br data-astro-cid-vnivfuh2>that lives in your chat.</span> </h2> <p class="features-sub" data-reveal data-astro-cid-vnivfuh2> <span class="l-he" data-astro-cid-vnivfuh2>שש יכולות, רחוקות הודעה אחת בעברית — נוצרות על ידי פורלי, מוחזרות ישר לוואטסאפ.</span> <span class="l-en" data-astro-cid-vnivfuh2>Six capabilities, one Hebrew message away — generated by Forly, delivered straight back into WhatsApp.</span> </p> </header> <div class="grid" data-astro-cid-vnivfuh2> ${cards.map((c, i) => renderTemplate`<article class="card" data-card${addAttribute(`--i:${i}`, "style")} data-astro-cid-vnivfuh2> <div class="card-glow" data-card-glow data-astro-cid-vnivfuh2></div> <div class="card-content" data-astro-cid-vnivfuh2> <p class="card-label" data-astro-cid-vnivfuh2>${renderComponent($$result, "T", $$T, { "he": c.label.he, "en": c.label.en, "data-astro-cid-vnivfuh2": true })}</p> <h3 class="card-title" data-astro-cid-vnivfuh2>${renderComponent($$result, "T", $$T, { "he": c.title.he, "en": c.title.en, "data-astro-cid-vnivfuh2": true })}</h3> <p class="card-body" data-astro-cid-vnivfuh2>${renderComponent($$result, "T", $$T, { "he": c.body.he, "en": c.body.en, "data-astro-cid-vnivfuh2": true })}</p> <div class="card-meter" data-astro-cid-vnivfuh2> <div class="meter-row" data-astro-cid-vnivfuh2> <span class="meter-label" data-astro-cid-vnivfuh2>${renderComponent($$result, "T", $$T, { "he": c.metricLabel.he, "en": c.metricLabel.en, "data-astro-cid-vnivfuh2": true })}</span> <span class="meter-value" data-meter-value${addAttribute(c.metric, "data-target")} data-astro-cid-vnivfuh2>0%</span> </div> <div class="meter-track" data-astro-cid-vnivfuh2> <div class="meter-fill" data-meter-fill${addAttribute(c.metric, "data-target")} data-astro-cid-vnivfuh2></div> </div> </div> </div> </article>`)} </div> <!-- Letter-by-letter scramble quote — each language gets its own scramble target. --> <blockquote class="scramble" data-scramble-block data-astro-cid-vnivfuh2> <p class="scramble-text" data-astro-cid-vnivfuh2> <span class="l-he" data-scramble data-astro-cid-vnivfuh2>הכל במקום אחד </span> <span class="l-en" data-scramble data-astro-cid-vnivfuh2>No app. No dashboard. No design tools. Just WhatsApp.</span> </p> <cite data-astro-cid-vnivfuh2>${renderComponent($$result, "T", $$T, { "he": "— התזה של פורלי v2", "en": "— The Forly v2 thesis", "data-astro-cid-vnivfuh2": true })}</cite> </blockquote> <!-- Counter strip — four accent-coded cards. Each stat owns a color,
         an icon, and a gradient numeral; hover lifts with a colored glow. --> <ul class="stats" data-stats data-astro-cid-vnivfuh2> ${stats.map((s) => renderTemplate`<li${addAttribute(["stat", `stat--${s.accent}`], "class:list")} data-astro-cid-vnivfuh2> <span class="stat-icon" aria-hidden="true" data-astro-cid-vnivfuh2> ${s.icon === "spark" && renderTemplate`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-vnivfuh2> <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3z" data-astro-cid-vnivfuh2></path> <path d="M19 4l.6 1.7L21 6.3l-1.4.6L19 8.6l-.6-1.7L17 6.3l1.4-.6z" data-astro-cid-vnivfuh2></path> </svg>`} ${s.icon === "palette" && renderTemplate`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-vnivfuh2> <path d="M12 21a9 9 0 110-18 9 9 0 015 16.4c-1.2.8-2.6.4-2.6-1 0-1.5 1.4-1.7 1.4-3 0-1-.9-1.6-2-1.6h-1.5a2 2 0 01-2-2c0-1.4.9-2.4-.3-3.3" data-astro-cid-vnivfuh2></path> <circle cx="7.5" cy="11" r="1" fill="currentColor" data-astro-cid-vnivfuh2></circle> <circle cx="11" cy="7.5" r="1" fill="currentColor" data-astro-cid-vnivfuh2></circle> <circle cx="15.5" cy="8.5" r="1" fill="currentColor" data-astro-cid-vnivfuh2></circle> </svg>`} ${s.icon === "clock" && renderTemplate`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-vnivfuh2> <circle cx="12" cy="12" r="9" data-astro-cid-vnivfuh2></circle> <path d="M12 7v5l3.5 2" data-astro-cid-vnivfuh2></path> </svg>`} ${s.icon === "globe" && renderTemplate`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-vnivfuh2> <circle cx="12" cy="12" r="9" data-astro-cid-vnivfuh2></circle> <path d="M3 12h18" data-astro-cid-vnivfuh2></path> <path d="M12 3a14 14 0 010 18" data-astro-cid-vnivfuh2></path> <path d="M12 3a14 14 0 000 18" data-astro-cid-vnivfuh2></path> </svg>`} </span> <span class="stat-num" data-counter${addAttribute(s.value, "data-target")}${addAttribute(s.suffix, "data-suffix")} data-astro-cid-vnivfuh2>0</span> <span class="stat-label" data-astro-cid-vnivfuh2>${renderComponent($$result, "T", $$T, { "he": s.he, "en": s.en, "data-astro-cid-vnivfuh2": true })}</span> </li>`)} </ul> </div> </section>  ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/Features.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/components/Features.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Forly — פורלי",
    url: SITE_URL,
    inLanguage: ["he", "en"]
  };
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "bilingual": true, "schema": websiteSchema }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Nav", $$Nav, {})} ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "CarouselPreview", $$CarouselPreview, {})} ${renderComponent($$result2, "Features", $$Features, {})} ${renderComponent($$result2, "CTA", $$CTA, {})} ` })}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/index.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
