/**
 * POST /api/payment/create-link
 * Create Cardcom Low Profile payment URL for authenticated user
 */
import type { APIRoute } from 'astro';
import { CREDIT_PACKS, PRICING_TIERS, SITE_URL } from '../../../brand';

const CARDCOM_TERMINAL = import.meta.env.CARDCOM_TERMINAL_NUMBER || '1000';
const CARDCOM_API_NAME = import.meta.env.CARDCOM_API_NAME || 'kzFKfohEvL6AOF8aMEJz';
const CARDCOM_WEBHOOK_URL = import.meta.env.CARDCOM_WEBHOOK_URL || 'https://n8n.srv1173890.hstgr.cloud/webhook/cardcom-credits';

interface CreateLinkRequest {
  productType: 'credit_pack' | 'subscription';
  productId: string;
  billingCycle?: 'monthly' | 'annual';
}

interface CardcomProduct {
  Description: string;
  UnitCost: number;
  Quantity: number;
}

interface CardcomRequest {
  TerminalNumber: number;
  ApiName: string;
  Operation: string;
  ReturnValue: string;
  Amount: number;
  SuccessRedirectUrl: string;
  FailedRedirectUrl: string;
  WebHookUrl: string;
  ISOCoinId: number;
  Language: string;
  Document: {
    DocumentTypeToCreate: string;
    Name: string;
    Email?: string;
    IsSendByEmail: boolean;
    Languge: string;
    ISOCoinID: number;
    Products: CardcomProduct[];
  };
}

function getProductInfo(productType: string, productId: string, billingCycle?: string): { price: number; description: string } | null {
  if (productType === 'credit_pack') {
    const pack = CREDIT_PACKS.find((p) => p.id === productId);
    if (!pack) return null;
    return {
      price: pack.price,
      description: pack.nameHe,
    };
  } else if (productType === 'subscription') {
    const tier = PRICING_TIERS.find((t) => t.id === productId);
    if (!tier) return null;

    // Use promo price if available for monthly, regular price otherwise
    const price = billingCycle === 'monthly' && tier.launchPromo
      ? tier.launchPromo.priceMonthly
      : billingCycle === 'annual'
      ? tier.priceAnnual
      : tier.priceMonthly;

    const cycle = billingCycle === 'annual' ? 'שנתי' : 'חודשי';
    return {
      price,
      description: `${tier.nameHe} - מנוי ${cycle}`,
    };
  }
  return null;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Get session from cookie
    const sessionCookie = cookies.get('forly_payment_session');
    if (!sessionCookie) {
      return new Response(JSON.stringify({ error: 'Not authenticated. Please login first.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    let session;
    try {
      session = JSON.parse(sessionCookie.value);
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid session' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check session expiry (15 minutes)
    const sessionAge = Date.now() - session.createdAt;
    if (sessionAge > 15 * 60 * 1000) {
      return new Response(JSON.stringify({ error: 'Session expired. Please login again.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body: CreateLinkRequest = await request.json();
    const { productType, productId, billingCycle } = body;

    // Validate product exists
    const productInfo = getProductInfo(productType, productId, billingCycle);
    if (!productInfo) {
      return new Response(JSON.stringify({ error: 'Invalid product' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build Cardcom request
    const returnValue = JSON.stringify({
      userId: session.userId,
      productType,
      productId,
      billingCycle: billingCycle || null,
      phone: session.phone,
    });

    const cardcomRequest: CardcomRequest = {
      TerminalNumber: parseInt(CARDCOM_TERMINAL),
      ApiName: CARDCOM_API_NAME,
      Operation: 'ChargeAndCreateToken',
      ReturnValue: returnValue,
      Amount: productInfo.price,
      SuccessRedirectUrl: `${SITE_URL}/checkout/success`,
      FailedRedirectUrl: `${SITE_URL}/checkout/failed`,
      WebHookUrl: CARDCOM_WEBHOOK_URL,
      ISOCoinId: 1, // ILS
      Language: 'he',
      Document: {
        DocumentTypeToCreate: 'TaxInvoiceAndReceipt',
        Name: `User ${session.phone.slice(-4)}`, // Can be enhanced with real name
        Email: undefined, // Optional
        IsSendByEmail: false,
        Languge: 'he',
        ISOCoinID: 1,
        Products: [
          {
            Description: productInfo.description,
            UnitCost: productInfo.price,
            Quantity: 1,
          },
        ],
      },
    };

    // Call Cardcom API
    const response = await fetch('https://secure.cardcom.solutions/api/v11/LowProfile/Create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cardcomRequest),
    });

    const result = await response.json();

    if (!response.ok || result.ResponseCode !== 0) {
      console.error('Cardcom error:', result);
      return new Response(JSON.stringify({
        error: 'Failed to create payment link',
        details: result.Description || 'Unknown error',
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      paymentUrl: result.Url,
      lowProfileId: result.LowProfileId,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Create payment link error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
