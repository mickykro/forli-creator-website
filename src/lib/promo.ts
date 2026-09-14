/**
 * Shared promo code validation and discount calculation.
 * Used by both /api/promo/validate (preview) and /api/payment/create-link
 * (authoritative) so the charged amount always comes from the server.
 */
import { CREDIT_PACKS, PRICING_TIERS } from '../brand';
import { getSupabaseServer } from './supabase';

export function getProductPrice(productType: string, productId: string, billingCycle?: string): number | null {
  if (productType === 'credit_pack') {
    const pack = CREDIT_PACKS.find((p) => p.id === productId);
    return pack?.price ?? null;
  } else if (productType === 'subscription') {
    const tier = PRICING_TIERS.find((t) => t.id === productId);
    if (!tier) return null;

    return billingCycle === 'monthly' && tier.launchPromo
      ? tier.launchPromo.priceMonthly
      : billingCycle === 'annual'
      ? tier.priceAnnual
      : tier.priceMonthly;
  }
  return null;
}

function calculateDiscount(originalPrice: number, discountType: string, discountValue: number): number {
  if (discountType === 'percentage') {
    return Math.round(originalPrice * (discountValue / 100));
  } else if (discountType === 'fixed') {
    return Math.min(discountValue, originalPrice);
  }
  return 0;
}

export interface PromoValidationResult {
  valid: boolean;
  error?: string;
  discountType?: string;
  discountValue?: number;
  originalPrice: number;
  discountAmount: number;
  finalPrice: number;
}

/** Re-runs promo validation and discount calc server-side. Never trust a client-sent price. */
export async function validatePromoCode(
  code: string,
  productType: string,
  userId: string,
  originalPrice: number
): Promise<PromoValidationResult> {
  const supabase = getSupabaseServer();
  const { data: validation, error } = await supabase.rpc('validate_promo_code', {
    p_code: code.toUpperCase(),
    p_product_type: productType,
    p_user_id: userId,
  });

  if (error || !validation || validation.length === 0) {
    if (error) console.error('Promo validation error:', error);
    return { valid: false, error: 'Invalid promo code', originalPrice, discountAmount: 0, finalPrice: originalPrice };
  }

  const result = validation[0];
  if (!result || !result.valid) {
    return { valid: false, error: result?.error_message, originalPrice, discountAmount: 0, finalPrice: originalPrice };
  }

  const discountAmount = calculateDiscount(originalPrice, result.discount_type, result.discount_value);
  const finalPrice = Math.max(0, originalPrice - discountAmount);

  return {
    valid: true,
    discountType: result.discount_type,
    discountValue: result.discount_value,
    originalPrice,
    discountAmount,
    finalPrice,
  };
}
