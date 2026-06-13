import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { r as renderTemplate, o as defineScriptVars, l as renderComponent, m as maybeRenderHead } from './entrypoint_BEeWRyRY.mjs';
import { $ as $$Base } from './Base_BmZ-LspK.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Magic = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Magic;
  const url = new URL(Astro2.request.url);
  const otp = url.searchParams.get("otp");
  const phone = url.searchParams.get("phone");
  const product = url.searchParams.get("product");
  return renderTemplate(_a || (_a = __template(["", "  <script>(function(){", "\n  async function autoLogin() {\n    try {\n      if (!otp || !phone || !product) {\n        throw new Error('Missing parameters');\n      }\n\n      // Parse product\n      const [productType, productId, billingCycle] = product.split('_');\n\n      // Verify OTP\n      const verifyResponse = await fetch('/api/auth/verify-otp', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ phone, otp }),\n      });\n\n      const verifyResult = await verifyResponse.json();\n\n      if (!verifyResponse.ok) {\n        throw new Error(verifyResult.error);\n      }\n\n      // Create payment link\n      const paymentResponse = await fetch('/api/payment/create-link', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({\n          productType: productType === 'credit' ? 'credit_pack' : productType,\n          productId,\n          billingCycle: billingCycle || null,\n        }),\n      });\n\n      const paymentResult = await paymentResponse.json();\n\n      if (!paymentResponse.ok) {\n        throw new Error(paymentResult.error);\n      }\n\n      // Redirect to Cardcom\n      window.location.href = paymentResult.paymentUrl;\n    } catch (error) {\n      console.error('Magic link error:', error);\n      // Redirect to checkout login on error\n      window.location.href = `/checkout/login?product=${product}&error=${encodeURIComponent(error.message)}`;\n    }\n  }\n\n  // Auto-run on page load\n  autoLogin();\n})();<\/script> "], ["", "  <script>(function(){", "\n  async function autoLogin() {\n    try {\n      if (!otp || !phone || !product) {\n        throw new Error('Missing parameters');\n      }\n\n      // Parse product\n      const [productType, productId, billingCycle] = product.split('_');\n\n      // Verify OTP\n      const verifyResponse = await fetch('/api/auth/verify-otp', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ phone, otp }),\n      });\n\n      const verifyResult = await verifyResponse.json();\n\n      if (!verifyResponse.ok) {\n        throw new Error(verifyResult.error);\n      }\n\n      // Create payment link\n      const paymentResponse = await fetch('/api/payment/create-link', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({\n          productType: productType === 'credit' ? 'credit_pack' : productType,\n          productId,\n          billingCycle: billingCycle || null,\n        }),\n      });\n\n      const paymentResult = await paymentResponse.json();\n\n      if (!paymentResponse.ok) {\n        throw new Error(paymentResult.error);\n      }\n\n      // Redirect to Cardcom\n      window.location.href = paymentResult.paymentUrl;\n    } catch (error) {\n      console.error('Magic link error:', error);\n      // Redirect to checkout login on error\n      window.location.href = \\`/checkout/login?product=\\${product}&error=\\${encodeURIComponent(error.message)}\\`;\n    }\n  }\n\n  // Auto-run on page load\n  autoLogin();\n})();<\/script> "])), renderComponent($$result, "Base", $$Base, { "title": "מתחבר... — Forly | Logging in...", "description": "התחברות אוטומטית", "bilingual": true, "data-astro-cid-jt2wvhsl": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="magic-link" data-astro-cid-jt2wvhsl> <div class="container" data-astro-cid-jt2wvhsl> <div class="magic-card" data-astro-cid-jt2wvhsl> <div class="spinner" data-astro-cid-jt2wvhsl></div> <h1 class="title" data-astro-cid-jt2wvhsl> <span class="l-he" data-astro-cid-jt2wvhsl>מתחבר...</span> <span class="l-en" data-astro-cid-jt2wvhsl>Logging in...</span> </h1> <p class="subtitle" data-astro-cid-jt2wvhsl> <span class="l-he" data-astro-cid-jt2wvhsl>מעביר אותך לתשלום</span> <span class="l-en" data-astro-cid-jt2wvhsl>Redirecting to payment</span> </p> </div> </div> </main> ` }), defineScriptVars({ otp, phone, product }));
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/auth/magic.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/auth/magic.astro";
const $$url = "/auth/magic";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Magic,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
