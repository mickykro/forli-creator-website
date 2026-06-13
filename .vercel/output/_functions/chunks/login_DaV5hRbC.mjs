import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { n as renderHead, r as renderTemplate } from './entrypoint_BEeWRyRY.mjs';
import 'clsx';
import { r as renderScript } from './script_DXS-_X5I.mjs';
import { B as BUSINESS } from './brand_CnEBFwtm.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" dir="ltr" data-astro-cid-rf56lckb> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Admin Login | ${BUSINESS.brandName}</title><link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-rf56lckb> <div class="login-card" data-astro-cid-rf56lckb> <div class="logo" data-astro-cid-rf56lckb> <span class="logo-icon" data-astro-cid-rf56lckb>F</span> <span class="logo-text" data-astro-cid-rf56lckb>${BUSINESS.brandName}</span> <span class="logo-badge" data-astro-cid-rf56lckb>Admin</span> </div> <h1 data-astro-cid-rf56lckb>Welcome Back</h1> <p class="subtitle" data-astro-cid-rf56lckb>Sign in to access the admin dashboard</p> <div class="error-message" id="errorMessage" data-astro-cid-rf56lckb></div> <form id="loginForm" data-astro-cid-rf56lckb> <div class="form-group" data-astro-cid-rf56lckb> <label for="email" data-astro-cid-rf56lckb>Email Address</label> <input type="email" id="email" name="email" required autocomplete="email" data-astro-cid-rf56lckb> </div> <div class="form-group" data-astro-cid-rf56lckb> <label for="password" data-astro-cid-rf56lckb>Password</label> <input type="password" id="password" name="password" required autocomplete="current-password" data-astro-cid-rf56lckb> </div> <button type="submit" class="btn" id="submitBtn" data-astro-cid-rf56lckb>Sign In</button> </form> <a href="/" class="back-link" data-astro-cid-rf56lckb>Back to website</a> </div> ${renderScript($$result, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/login.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
