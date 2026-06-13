import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { n as renderHead, r as renderTemplate } from './entrypoint_BEeWRyRY.mjs';
import 'clsx';
import { r as renderScript } from './script_DXS-_X5I.mjs';
import { B as BUSINESS } from './brand_CnEBFwtm.mjs';

const $$Login2 = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" dir="ltr" data-astro-cid-5ytqliyx> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Admin Login | ${BUSINESS.brandName}</title><link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-5ytqliyx> <div class="login-card" data-astro-cid-5ytqliyx> <div class="logo" data-astro-cid-5ytqliyx> <span class="logo-icon" data-astro-cid-5ytqliyx>F</span> <span class="logo-text" data-astro-cid-5ytqliyx>${BUSINESS.brandName}</span> <span class="logo-badge" data-astro-cid-5ytqliyx>Admin</span> </div> <h1 data-astro-cid-5ytqliyx>Welcome Back</h1> <p class="subtitle" data-astro-cid-5ytqliyx>Sign in to access the admin dashboard</p> <div class="error-message" id="errorMessage" data-astro-cid-5ytqliyx></div> <form id="loginForm" data-astro-cid-5ytqliyx> <div class="form-group" data-astro-cid-5ytqliyx> <label for="email" data-astro-cid-5ytqliyx>Email Address</label> <input type="email" id="email" name="email" required autocomplete="email" data-astro-cid-5ytqliyx> </div> <div class="form-group" data-astro-cid-5ytqliyx> <label for="password" data-astro-cid-5ytqliyx>Password</label> <input type="password" id="password" name="password" required autocomplete="current-password" data-astro-cid-5ytqliyx> </div> <button type="submit" class="btn" id="submitBtn" data-astro-cid-5ytqliyx>Sign In</button> </form> <a href="/" class="back-link" data-astro-cid-5ytqliyx>Back to website</a> </div> ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/login 2.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/login 2.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/login 2.astro";
const $$url = "/admin/login 2";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login2,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
