import { g as getSupabaseServer } from './supabase_D10l6weB.mjs';

const GREEN_API_INSTANCE = "7105422200";
const GREEN_API_TOKEN = "740b437ffa5f49e4970f80cd44f9a1930ff7d3755fed4d089e";
const SITE_URL = "https://call4li.com";
console.log("GREEN_API_INSTANCE:", "SET" );
console.log("GREEN_API_TOKEN:", "SET" );
function validatePhone(phone) {
  let cleaned = phone.replace(/[\s\-\(\)]/g, "");
  if (cleaned.startsWith("+")) {
    cleaned = cleaned.substring(1);
  }
  let normalized = cleaned;
  if (normalized.startsWith("0")) {
    normalized = "972" + normalized.substring(1);
  } else if (!normalized.startsWith("972")) {
    normalized = "972" + normalized;
  }
  if (/^9725\d{8}$/.test(normalized)) {
    return normalized;
  }
  return null;
}
function generateOTP() {
  return Math.floor(1e5 + Math.random() * 9e5).toString();
}
async function sendWhatsAppOTP(phone, otp, magicLink) {
  const chatId = `${phone}@c.us`;
  const message = `קוד הכניסה שלך לפורלי: *${otp}*

או לחץ כאן להתחברות מהירה:
${magicLink}

הקוד תקף ל-10 דקות.`;
  const url = `https://api.green-api.com/waInstance${GREEN_API_INSTANCE}/sendMessage/${GREEN_API_TOKEN}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId, message })
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Green API error: ${error}`);
  }
}
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { phone, productType, productId, billingCycle } = body;
    if (!phone || !productType || !productId) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const normalizedPhone = validatePhone(phone);
    if (!normalizedPhone) {
      return new Response(JSON.stringify({ error: "Invalid Israeli phone number" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const supabase = getSupabaseServer();
    const { data: canSend, error: rateLimitError } = await supabase.rpc("check_otp_rate_limit", {
      p_phone: normalizedPhone
    });
    if (rateLimitError) {
      console.warn("Rate limit check failed (migration not run?):", rateLimitError);
    } else if (canSend === false) {
      console.warn("Rate limit exceeded, but bypassing for development");
    }
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1e3);
    const { error: insertError } = await supabase.from("otp_tokens").insert({
      phone_number: normalizedPhone,
      otp_code: otp,
      product_type: productType,
      product_id: productId,
      billing_cycle: billingCycle || null,
      expires_at: expiresAt.toISOString()
    });
    if (insertError) {
      console.error("Failed to store OTP:", insertError);
      return new Response(JSON.stringify({ error: "Failed to create OTP" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const magicLink = `${SITE_URL}/auth/magic?otp=${otp}&phone=${encodeURIComponent(normalizedPhone)}&product=${productType}_${productId}${billingCycle ? `_${billingCycle}` : ""}`;
    try {
      await sendWhatsAppOTP(normalizedPhone, otp, magicLink);
    } catch (error) {
      console.error("Failed to send WhatsApp:", error);
      return new Response(JSON.stringify({ error: "Failed to send OTP via WhatsApp" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      success: true,
      phone: normalizedPhone,
      // Return normalized phone for verify-otp
      expiresAt: expiresAt.toISOString(),
      maskedPhone: `***${normalizedPhone.slice(-4)}`
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
