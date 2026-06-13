import { S as SITE_URL, C as CREDIT_PACKS, P as PRICING_TIERS } from './brand_CnEBFwtm.mjs';

const CARDCOM_TERMINAL = "1000";
const CARDCOM_API_NAME = "kzFKfohEvL6AOF8aMEJz";
const CARDCOM_WEBHOOK_URL = "https://n8n.srv1173890.hstgr.cloud/webhook/cardcom-credits";
function getProductInfo(productType, productId, billingCycle) {
  if (productType === "credit_pack") {
    const pack = CREDIT_PACKS.find((p) => p.id === productId);
    if (!pack) return null;
    return {
      price: pack.price,
      description: pack.nameHe
    };
  } else if (productType === "subscription") {
    const tier = PRICING_TIERS.find((t) => t.id === productId);
    if (!tier) return null;
    const price = billingCycle === "monthly" && tier.launchPromo ? tier.launchPromo.priceMonthly : billingCycle === "annual" ? tier.priceAnnual : tier.priceMonthly;
    const cycle = billingCycle === "annual" ? "שנתי" : "חודשי";
    return {
      price,
      description: `${tier.nameHe} - מנוי ${cycle}`
    };
  }
  return null;
}
const POST = async ({ request, cookies }) => {
  try {
    const sessionCookie = cookies.get("forly_payment_session");
    if (!sessionCookie) {
      return new Response(JSON.stringify({ error: "Not authenticated. Please login first." }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    let session;
    try {
      session = JSON.parse(sessionCookie.value);
    } catch {
      return new Response(JSON.stringify({ error: "Invalid session" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const sessionAge = Date.now() - session.createdAt;
    if (sessionAge > 15 * 60 * 1e3) {
      return new Response(JSON.stringify({ error: "Session expired. Please login again." }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const body = await request.json();
    const { productType, productId, billingCycle } = body;
    const productInfo = getProductInfo(productType, productId, billingCycle);
    if (!productInfo) {
      return new Response(JSON.stringify({ error: "Invalid product" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const returnValue = JSON.stringify({
      userId: session.userId,
      productType,
      productId,
      billingCycle: billingCycle || null,
      phone: session.phone
    });
    const cardcomRequest = {
      TerminalNumber: parseInt(CARDCOM_TERMINAL),
      ApiName: CARDCOM_API_NAME,
      Operation: "ChargeAndCreateToken",
      ReturnValue: returnValue,
      Amount: productInfo.price,
      SuccessRedirectUrl: `${SITE_URL}/checkout/success`,
      FailedRedirectUrl: `${SITE_URL}/checkout/failed`,
      WebHookUrl: CARDCOM_WEBHOOK_URL,
      ISOCoinId: 1,
      // ILS
      Language: "he",
      Document: {
        DocumentTypeToCreate: "TaxInvoiceAndReceipt",
        Name: `User ${session.phone.slice(-4)}`,
        // Can be enhanced with real name
        Email: void 0,
        // Optional
        IsSendByEmail: false,
        Languge: "he",
        ISOCoinID: 1,
        Products: [
          {
            Description: productInfo.description,
            UnitCost: productInfo.price,
            Quantity: 1
          }
        ]
      }
    };
    const response = await fetch("https://secure.cardcom.solutions/api/v11/LowProfile/Create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardcomRequest)
    });
    const result = await response.json();
    if (!response.ok || result.ResponseCode !== 0) {
      console.error("Cardcom error:", result);
      return new Response(JSON.stringify({
        error: "Failed to create payment link",
        details: result.Description || "Unknown error"
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      success: true,
      paymentUrl: result.Url,
      lowProfileId: result.LowProfileId
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Create payment link error:", error);
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
