/**
 * POST /api/promo/validate
 * Validate promo code and calculate discounted price
 */
import type { APIRoute } from 'astro';
import { getProductPrice, validatePromoCode } from '../../../lib/promo';

interface ValidateRequest {
  code: string;
  productType: 'credit_pack' | 'subscription';
  productId: string;
  billingCycle?: 'monthly' | 'annual';
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

    const body: ValidateRequest = await request.json();
    const { code, productType, productId, billingCycle } = body;

    if (!code || !productType || !productId) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get original price
    const originalPrice = getProductPrice(productType, productId, billingCycle);
    if (originalPrice === null) {
      return new Response(JSON.stringify({ error: 'Invalid product' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate promo code
    const result = await validatePromoCode(code, productType, session.userId, originalPrice);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Validate promo error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
