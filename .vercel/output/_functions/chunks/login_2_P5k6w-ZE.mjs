import { c as createComponent } from './astro-component_BBhTAI8Y.mjs';
import 'piccolore';
import { r as renderTemplate, o as defineScriptVars, l as renderComponent, m as maybeRenderHead } from './entrypoint_BEeWRyRY.mjs';
import { $ as $$Base } from './Base_BmZ-LspK.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Login2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login2;
  const url = new URL(Astro2.request.url);
  const productParam = url.searchParams.get("product") || "";
  let productType;
  let productId;
  let billingCycle;
  if (productParam.startsWith("credit_pack_")) {
    productType = "credit_pack";
    productId = productParam.replace("credit_pack_", "");
    billingCycle = void 0;
  } else if (productParam.startsWith("subscription_")) {
    const parts = productParam.replace("subscription_", "").split("_");
    productType = "subscription";
    productId = parts[0];
    billingCycle = parts[1];
  } else {
    return Astro2.redirect("/pricing");
  }
  if (!productType || !productId) {
    return Astro2.redirect("/pricing");
  }
  const actualProductType = productType;
  return renderTemplate(_a || (_a = __template(["", "  <script>(function(){", `
  let currentPhone = '';

  // State management
  function showState(stateName) {
    document.querySelectorAll('.state-panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(stateName)?.classList.add('active');
  }

  function showError(containerId, message) {
    const el = document.getElementById(containerId);
    if (el) {
      el.textContent = message;
      el.classList.add('visible');
    }
  }

  function hideError(containerId) {
    const el = document.getElementById(containerId);
    if (el) {
      el.classList.remove('visible');
    }
  }

  // Phone form submission
  const phoneForm = document.getElementById('phoneForm');
  phoneForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError('phoneError');

    const phone = document.getElementById('phone').value.trim();
    const btn = document.getElementById('sendOtpBtn');
    btn.disabled = true;
    btn.textContent = 'שולח...';

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          productType,
          productId,
          billingCycle: billingCycle || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send OTP');
      }

      currentPhone = result.phone; // Use normalized phone from backend
      document.getElementById('maskedPhone').textContent = result.maskedPhone;
      showState('otpState');
      document.querySelector('.otp-digit').focus();
      startCountdown();
    } catch (error) {
      showError('phoneError', error.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<span class="l-he">שלח קוד</span><span class="l-en">Send Code</span>';
    }
  });

  // OTP input handling
  const otpInputs = document.querySelectorAll('.otp-digit');

  // Handle paste - allow pasting full 6-digit code
  otpInputs.forEach((input, index) => {
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text');
      const digits = pastedData.replace(/\\D/g, '').slice(0, 6); // Extract only digits, max 6

      if (digits.length === 6) {
        // Fill all inputs
        digits.split('').forEach((digit, i) => {
          if (otpInputs[i]) {
            otpInputs[i].value = digit;
          }
        });
        // Auto-submit
        document.getElementById('otpForm').requestSubmit();
      } else if (digits.length > 0) {
        // Fill from current input onwards
        digits.split('').forEach((digit, i) => {
          if (otpInputs[index + i]) {
            otpInputs[index + i].value = digit;
          }
        });
        // Focus next empty or last
        const nextIndex = Math.min(index + digits.length, 5);
        otpInputs[nextIndex].focus();
      }
    });

    input.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && index < 5) {
        otpInputs[index + 1].focus();
      }
      if (Array.from(otpInputs).every(inp => inp.value.length === 1)) {
        document.getElementById('otpForm').requestSubmit();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // OTP form submission
  const otpForm = document.getElementById('otpForm');
  otpForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError('otpError');

    const otp = Array.from(otpInputs).map(inp => inp.value).join('');
    const btn = document.getElementById('verifyOtpBtn');
    btn.disabled = true;
    btn.textContent = 'מאמת...';

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: currentPhone, otp }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Invalid OTP');
      }

      // Success - show loading and redirect to payment
      showState('loadingState');

      const paymentResponse = await fetch('/api/payment/create-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productType: result.productType,
          productId: result.productId,
          billingCycle: result.billingCycle,
        }),
      });

      const paymentResult = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(paymentResult.error || 'Failed to create payment');
      }

      window.location.href = paymentResult.paymentUrl;
    } catch (error) {
      showError('otpError', error.message);
      btn.disabled = false;
      btn.innerHTML = '<span class="l-he">אמת קוד</span><span class="l-en">Verify Code</span>';
    }
  });

  // Resend OTP with countdown
  let countdownInterval;
  function startCountdown() {
    let seconds = 30;
    const resendBtn = document.getElementById('resendBtn');
    const countdownEl = document.getElementById('countdown');

    countdownInterval = setInterval(() => {
      seconds--;
      countdownEl.textContent = seconds;

      if (seconds <= 0) {
        clearInterval(countdownInterval);
        resendBtn.disabled = false;
        resendBtn.innerHTML = '<span class="l-he">שלח שוב</span><span class="l-en">Resend</span>';
      }
    }, 1000);
  }

  document.getElementById('resendBtn')?.addEventListener('click', () => {
    phoneForm.requestSubmit();
  });

  // Change phone
  document.getElementById('changePhoneBtn')?.addEventListener('click', () => {
    otpInputs.forEach(inp => inp.value = '');
    hideError('otpError');
    showState('phoneState');
    if (countdownInterval) clearInterval(countdownInterval);
  });
})();<\/script> `], ["", "  <script>(function(){", `
  let currentPhone = '';

  // State management
  function showState(stateName) {
    document.querySelectorAll('.state-panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(stateName)?.classList.add('active');
  }

  function showError(containerId, message) {
    const el = document.getElementById(containerId);
    if (el) {
      el.textContent = message;
      el.classList.add('visible');
    }
  }

  function hideError(containerId) {
    const el = document.getElementById(containerId);
    if (el) {
      el.classList.remove('visible');
    }
  }

  // Phone form submission
  const phoneForm = document.getElementById('phoneForm');
  phoneForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError('phoneError');

    const phone = document.getElementById('phone').value.trim();
    const btn = document.getElementById('sendOtpBtn');
    btn.disabled = true;
    btn.textContent = 'שולח...';

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          productType,
          productId,
          billingCycle: billingCycle || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send OTP');
      }

      currentPhone = result.phone; // Use normalized phone from backend
      document.getElementById('maskedPhone').textContent = result.maskedPhone;
      showState('otpState');
      document.querySelector('.otp-digit').focus();
      startCountdown();
    } catch (error) {
      showError('phoneError', error.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<span class="l-he">שלח קוד</span><span class="l-en">Send Code</span>';
    }
  });

  // OTP input handling
  const otpInputs = document.querySelectorAll('.otp-digit');

  // Handle paste - allow pasting full 6-digit code
  otpInputs.forEach((input, index) => {
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData('text');
      const digits = pastedData.replace(/\\\\D/g, '').slice(0, 6); // Extract only digits, max 6

      if (digits.length === 6) {
        // Fill all inputs
        digits.split('').forEach((digit, i) => {
          if (otpInputs[i]) {
            otpInputs[i].value = digit;
          }
        });
        // Auto-submit
        document.getElementById('otpForm').requestSubmit();
      } else if (digits.length > 0) {
        // Fill from current input onwards
        digits.split('').forEach((digit, i) => {
          if (otpInputs[index + i]) {
            otpInputs[index + i].value = digit;
          }
        });
        // Focus next empty or last
        const nextIndex = Math.min(index + digits.length, 5);
        otpInputs[nextIndex].focus();
      }
    });

    input.addEventListener('input', (e) => {
      if (e.target.value.length === 1 && index < 5) {
        otpInputs[index + 1].focus();
      }
      if (Array.from(otpInputs).every(inp => inp.value.length === 1)) {
        document.getElementById('otpForm').requestSubmit();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !e.target.value && index > 0) {
        otpInputs[index - 1].focus();
      }
    });
  });

  // OTP form submission
  const otpForm = document.getElementById('otpForm');
  otpForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError('otpError');

    const otp = Array.from(otpInputs).map(inp => inp.value).join('');
    const btn = document.getElementById('verifyOtpBtn');
    btn.disabled = true;
    btn.textContent = 'מאמת...';

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: currentPhone, otp }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Invalid OTP');
      }

      // Success - show loading and redirect to payment
      showState('loadingState');

      const paymentResponse = await fetch('/api/payment/create-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productType: result.productType,
          productId: result.productId,
          billingCycle: result.billingCycle,
        }),
      });

      const paymentResult = await paymentResponse.json();

      if (!paymentResponse.ok) {
        throw new Error(paymentResult.error || 'Failed to create payment');
      }

      window.location.href = paymentResult.paymentUrl;
    } catch (error) {
      showError('otpError', error.message);
      btn.disabled = false;
      btn.innerHTML = '<span class="l-he">אמת קוד</span><span class="l-en">Verify Code</span>';
    }
  });

  // Resend OTP with countdown
  let countdownInterval;
  function startCountdown() {
    let seconds = 30;
    const resendBtn = document.getElementById('resendBtn');
    const countdownEl = document.getElementById('countdown');

    countdownInterval = setInterval(() => {
      seconds--;
      countdownEl.textContent = seconds;

      if (seconds <= 0) {
        clearInterval(countdownInterval);
        resendBtn.disabled = false;
        resendBtn.innerHTML = '<span class="l-he">שלח שוב</span><span class="l-en">Resend</span>';
      }
    }, 1000);
  }

  document.getElementById('resendBtn')?.addEventListener('click', () => {
    phoneForm.requestSubmit();
  });

  // Change phone
  document.getElementById('changePhoneBtn')?.addEventListener('click', () => {
    otpInputs.forEach(inp => inp.value = '');
    hideError('otpError');
    showState('phoneState');
    if (countdownInterval) clearInterval(countdownInterval);
  });
})();<\/script> `])), renderComponent($$result, "Base", $$Base, { "title": "התחברות לתשלום — Forly | Payment Login", "description": "התחבר עם WhatsApp לביצוע תשלום", "bilingual": true, "data-astro-cid-dkmcqz4n": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="login-flow" data-astro-cid-dkmcqz4n> <div class="container" data-astro-cid-dkmcqz4n> <div class="login-card" data-astro-cid-dkmcqz4n> <!-- Phone Input State --> <div id="phoneState" class="state-panel active" data-astro-cid-dkmcqz4n> <h1 class="title" data-astro-cid-dkmcqz4n> <span class="l-he" data-astro-cid-dkmcqz4n>התחברות מהירה</span> <span class="l-en" data-astro-cid-dkmcqz4n>Quick Login</span> </h1> <p class="subtitle" data-astro-cid-dkmcqz4n> <span class="l-he" data-astro-cid-dkmcqz4n>נשלח לך קוד בוואטסאפ</span> <span class="l-en" data-astro-cid-dkmcqz4n>We'll send you a code via WhatsApp</span> </p> <form id="phoneForm" data-astro-cid-dkmcqz4n> <div class="form-group" data-astro-cid-dkmcqz4n> <label for="phone" data-astro-cid-dkmcqz4n> <span class="l-he" data-astro-cid-dkmcqz4n>מספר טלפון</span> <span class="l-en" data-astro-cid-dkmcqz4n>Phone Number</span> </label> <input type="tel" id="phone" name="phone" placeholder="+972-54-XXX-XXXX" required dir="ltr" autocomplete="tel" data-astro-cid-dkmcqz4n> </div> <div id="phoneError" class="error-message" role="alert" data-astro-cid-dkmcqz4n></div> <button type="submit" class="btn btn-primary btn-block" id="sendOtpBtn" data-astro-cid-dkmcqz4n> <span class="l-he" data-astro-cid-dkmcqz4n>שלח קוד</span> <span class="l-en" data-astro-cid-dkmcqz4n>Send Code</span> </button> </form> </div> <!-- OTP Verification State --> <div id="otpState" class="state-panel" data-astro-cid-dkmcqz4n> <h1 class="title" data-astro-cid-dkmcqz4n> <span class="l-he" data-astro-cid-dkmcqz4n>הזן קוד אימות</span> <span class="l-en" data-astro-cid-dkmcqz4n>Enter Verification Code</span> </h1> <p class="subtitle" data-astro-cid-dkmcqz4n> <span class="l-he" data-astro-cid-dkmcqz4n>שלחנו קוד ל-<span id="maskedPhone" data-astro-cid-dkmcqz4n></span></span> <span class="l-en" data-astro-cid-dkmcqz4n>We sent a code to <span id="maskedPhone" data-astro-cid-dkmcqz4n></span></span> </p> <p class="hint" data-astro-cid-dkmcqz4n> <span class="l-he" data-astro-cid-dkmcqz4n>או לחץ על הקישור בוואטסאפ להתחברות אוטומטית</span> <span class="l-en" data-astro-cid-dkmcqz4n>Or click the link in WhatsApp for automatic login</span> </p> <form id="otpForm" data-astro-cid-dkmcqz4n> <div class="form-group" data-astro-cid-dkmcqz4n> <div class="otp-inputs" dir="ltr" data-astro-cid-dkmcqz4n> <input type="text" maxlength="1" class="otp-digit" data-index="0" dir="ltr" inputmode="numeric" data-astro-cid-dkmcqz4n> <input type="text" maxlength="1" class="otp-digit" data-index="1" dir="ltr" inputmode="numeric" data-astro-cid-dkmcqz4n> <input type="text" maxlength="1" class="otp-digit" data-index="2" dir="ltr" inputmode="numeric" data-astro-cid-dkmcqz4n> <input type="text" maxlength="1" class="otp-digit" data-index="3" dir="ltr" inputmode="numeric" data-astro-cid-dkmcqz4n> <input type="text" maxlength="1" class="otp-digit" data-index="4" dir="ltr" inputmode="numeric" data-astro-cid-dkmcqz4n> <input type="text" maxlength="1" class="otp-digit" data-index="5" dir="ltr" inputmode="numeric" data-astro-cid-dkmcqz4n> </div> </div> <div id="otpError" class="error-message" role="alert" data-astro-cid-dkmcqz4n></div> <button type="submit" class="btn btn-primary btn-block" id="verifyOtpBtn" data-astro-cid-dkmcqz4n> <span class="l-he" data-astro-cid-dkmcqz4n>אמת קוד</span> <span class="l-en" data-astro-cid-dkmcqz4n>Verify Code</span> </button> <div class="actions" data-astro-cid-dkmcqz4n> <button type="button" class="btn-link" id="resendBtn" disabled data-astro-cid-dkmcqz4n> <span class="l-he" data-astro-cid-dkmcqz4n>שלח שוב (<span id="countdown" data-astro-cid-dkmcqz4n>30</span>)</span> <span class="l-en" data-astro-cid-dkmcqz4n>Resend (<span id="countdown" data-astro-cid-dkmcqz4n>30</span>)</span> </button> <button type="button" class="btn-link" id="changePhoneBtn" data-astro-cid-dkmcqz4n> <span class="l-he" data-astro-cid-dkmcqz4n>שנה מספר</span> <span class="l-en" data-astro-cid-dkmcqz4n>Change number</span> </button> </div> </form> </div> <!-- Loading State --> <div id="loadingState" class="state-panel" data-astro-cid-dkmcqz4n> <div class="spinner" data-astro-cid-dkmcqz4n></div> <p class="loading-text" data-astro-cid-dkmcqz4n> <span class="l-he" data-astro-cid-dkmcqz4n>מעביר לתשלום...</span> <span class="l-en" data-astro-cid-dkmcqz4n>Redirecting to payment...</span> </p> </div> </div> </div> </main> ` }), defineScriptVars({ productType: actualProductType, productId, billingCycle }));
}, "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/checkout/login 2.astro", void 0);

const $$file = "/Users/MichaelKrotorio/Desktop/Call4li/call4li_creator_website/forli-creator-website/src/pages/checkout/login 2.astro";
const $$url = "/checkout/login 2";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login2,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
