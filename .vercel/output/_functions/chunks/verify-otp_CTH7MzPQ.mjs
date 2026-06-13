import { g as getSupabaseServer } from './supabase_D10l6weB.mjs';

const MAX_ATTEMPTS = 3;
function normalizePhone(phone) {
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
  return normalized;
}
const POST = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    let { phone, otp } = body;
    phone = normalizePhone(phone);
    if (!phone || !otp) {
      return new Response(JSON.stringify({ error: "Missing phone or OTP" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!/^\d{6}$/.test(otp)) {
      return new Response(JSON.stringify({ error: "OTP must be 6 digits" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const supabase = getSupabaseServer();
    console.log("Verifying OTP:", { phone, otp, timestamp: (/* @__PURE__ */ new Date()).toISOString() });
    const { data: tokens, error: fetchError } = await supabase.from("otp_tokens").select("*").eq("phone_number", phone).eq("otp_code", otp).is("used_at", null).gt("expires_at", (/* @__PURE__ */ new Date()).toISOString()).order("created_at", { ascending: false }).limit(1);
    console.log("OTP query result:", { found: tokens?.length || 0, error: fetchError });
    if (fetchError || !tokens || tokens.length === 0) {
      const { data: allOtps } = await supabase.from("otp_tokens").select("phone_number, otp_code, expires_at, used_at").eq("phone_number", phone).order("created_at", { ascending: false }).limit(3);
      console.log("Recent OTPs for this phone:", allOtps);
      return new Response(JSON.stringify({ error: "Invalid or expired OTP" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const token = tokens[0];
    if (token.attempts >= MAX_ATTEMPTS) {
      return new Response(JSON.stringify({ error: "Too many attempts. Request a new OTP." }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { error: updateError } = await supabase.from("otp_tokens").update({ attempts: token.attempts + 1 }).eq("id", token.id);
    if (updateError) {
      console.error("Failed to update attempts:", updateError);
    }
    const { error: markUsedError } = await supabase.from("otp_tokens").update({ used_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", token.id);
    if (markUsedError) {
      console.error("Failed to mark OTP as used:", markUsedError);
      return new Response(JSON.stringify({ error: "Failed to verify OTP" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data: existingUsers } = await supabase.from("users").select("id, phone_number, whatsapp_number, display_name").eq("whatsapp_number", phone).limit(1);
    let userId;
    if (existingUsers && existingUsers.length > 0) {
      userId = existingUsers[0].id;
    } else {
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        phone,
        phone_confirm: true,
        user_metadata: {
          whatsapp_number: phone,
          display_name: `User ${phone.slice(-4)}`
        }
      });
      if (authError || !authData.user) {
        console.error("Failed to create auth user:", authError);
        return new Response(JSON.stringify({ error: "Failed to create user" }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
      userId = authData.user.id;
      await supabase.from("users").update({ whatsapp_number: phone, phone_number: phone }).eq("id", userId);
    }
    const sessionData = {
      userId,
      phone,
      productType: token.product_type,
      productId: token.product_id,
      billingCycle: token.billing_cycle,
      createdAt: Date.now()
    };
    cookies.set("forly_payment_session", JSON.stringify(sessionData), {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60
      // 15 minutes
    });
    return new Response(JSON.stringify({
      success: true,
      userId,
      productType: token.product_type,
      productId: token.product_id,
      billingCycle: token.billing_cycle
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
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
