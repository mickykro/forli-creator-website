import { l as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, s as spreadAttributes } from './entrypoint_BEeWRyRY.mjs';
import { $ as $$Legal } from './Legal_BMYo00jz.mjs';
import { c as WHATSAPP_HELLO_URL } from './brand_CnEBFwtm.mjs';
import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';

const $$Faq = createComponent(($$result, $$props, $$slots) => {
  const faqs = [
    {
      question: "מה זה פורלי?",
      answer: "פורלי היא סטודיו תוכן AI שפועל ישירות בוואטסאפ. שולחים לה הודעה בעברית — והיא מחזירה לכם תמונה, סרטון, קרוסלה או אפילו אתר נחיתה, מוכנים לשליחה ללקוחות או לפרסום ברשתות."
    },
    {
      question: "איך פורלי עובדת?",
      answer: 'מוסיפים את פורלי לאנשי הקשר בוואטסאפ ושולחים בקשה בעברית פשוטה ("תכיני לי פוסט להשקה של תפריט חדש"). פורלי מבינה את ההקשר העסקי שלכם, מייצרת את התוכן בכמה שניות, ושולחת אותו חזרה לצ׳אט מוכן לפרסום.'
    },
    {
      question: "אילו סוגי תוכן פורלי יוצרת?",
      answer: "תמונות מוצר ופרסום, סרטונים קצרים, קרוסלות לאינסטגרם ופייסבוק, פוסטים מותאמים לרשתות, ואפילו עמודי נחיתה ואתרי תדמית בסיסיים. הכל עם זהות חזותית עקבית למותג שלכם."
    },
    {
      question: "האם צריך אפליקציה או דשבורד?",
      answer: "לא. פורלי חיה בוואטסאפ. אין מה להתקין, אין על מה ללמוד — אם אתם יודעים לשלוח הודעה, אתם יודעים להשתמש בפורלי."
    },
    {
      question: "כמה זמן לוקח להתחיל?",
      answer: "תהליך ההצטרפות הוא שלוש שאלות קצרות בוואטסאפ. תוך כמה דקות פורלי מכירה את העסק שלכם ויכולה לייצר תוכן ראשון."
    },
    {
      question: "באילו שפות פורלי תומכת?",
      answer: "פורלי בנויה במיוחד לעסקים ישראליים — היא מבינה עברית כשפת אם, ומסוגלת לייצר תוכן בעברית, אנגלית וערבית."
    },
    {
      question: "האם פורלי מתאימה לכל סוג עסק?",
      answer: 'כן. עסקים קטנים, מסעדות, קליניקות, חנויות אונליין, יועצים, נדל"ן ועוד — כל מי שמשווק את עצמו ברשתות או מייצר תוכן ללקוחות. פורלי מתאימה את עצמה לטון, לזהות ולקהל היעד של כל עסק.'
    },
    {
      question: "מה קורה למידע שאני שולח/ת לפורלי?",
      answer: "המידע שאתם שולחים משמש אך ורק כדי לייצר את התוכן שלכם ולשפר את ההתאמה האישית של פורלי לעסק שלכם. לא משתפים מידע עם מפרסמים, לא משתמשים בתוכן שלכם לאימון מודלים פומביים. פרטיות כברירת מחדל."
    },
    {
      question: "כמה פורלי עולה?",
      answer: "לפרטים על מסלולים ומחירים, בקרו בעמוד המחירים שלנו. יש מסלולים חודשיים וחבילות קרדיטים חד-פעמיות — ואפשר להתחיל בחינם עם 500 קרדיטים."
    },
    {
      question: "איך אני מצטרף/ת?",
      answer: 'לוחצים על "הצטרפו " בעמוד הבית או כותבים לנו ישירות בוואטסאפ. שלוש שאלות קצרות ופורלי מתחילה לעבוד עבורכם.'
    },
    {
      question: "איך אפשר לבטל את השירות?",
      answer: "אפשר לבטל בכל רגע — שולחים הודעה בוואטסאפ או מייל ל-info@call4li.com ואנחנו דואגים למחיקת המידע ולסיום השירות תוך ימי עסקים ספורים."
    },
    {
      question: "איך יוצרים קשר עם הצוות?",
      answer: "הדרך המהירה ביותר — וואטסאפ. אפשר גם במייל info@call4li.com או בטלפון. נחזור אליכם בתוך יום עסקים אחד."
    }
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer }
    }))
  };
  return renderTemplate`${renderComponent($$result, "Legal", $$Legal, { "title": "שאלות ותשובות — Forly · פורלי", "description": "מצאו תשובות לשאלות הנפוצות על פורלי — סטודיו התוכן AI שעובד בוואטסאפ. איך זה עובד, מה אפשר ליצור, ואיך מצטרפים.", "heading": "שאלות ותשובות", "schema": faqSchema, "data-astro-cid-6kmwghhu": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p style="margin-bottom: 28px;" data-astro-cid-6kmwghhu>
הכל מה שרציתם לדעת על פורלי — סטודיו התוכן ב-AI שחי בוואטסאפ. אם לא מצאתם תשובה לשאלה שלכם,
<a${addAttribute(WHATSAPP_HELLO_URL, "href")} target="_blank" rel="noopener noreferrer" data-astro-cid-6kmwghhu>דברו איתנו ישירות בוואטסאפ</a>.
</p> <div class="faq-list" data-astro-cid-6kmwghhu> ${faqs.map((faq, i) => renderTemplate`<details class="faq-item"${spreadAttributes(i === 0 ? { open: true } : {})} data-astro-cid-6kmwghhu> <summary data-astro-cid-6kmwghhu>${faq.question}</summary> <p data-astro-cid-6kmwghhu>${faq.answer}</p> </details>`)} </div> <section class="faq-cta" data-astro-cid-6kmwghhu> <h2 data-astro-cid-6kmwghhu>עוד שאלות?</h2> <p data-astro-cid-6kmwghhu>צוות פורלי זמין בוואטסאפ — תשובה אנושית, באמת, תוך יום עסקים.</p> <a${addAttribute(WHATSAPP_HELLO_URL, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-primary" data-astro-cid-6kmwghhu>
דברו איתנו בוואטסאפ
</a> </section> ` })}`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/faq.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/faq.astro";
const $$url = "/faq";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Faq,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
