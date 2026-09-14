# Promo Code System

## Overview
Promo code system supporting percentage and fixed discounts, including 100% off (free purchases).

## Database

### Tables
- `promo_codes`: Promo code definitions
- `promo_code_usage`: Usage tracking (one use per user)

### Pre-loaded Codes
- **FREE100**: 100% off, valid 1 year, max 100 uses
- **LAUNCH50**: 50% off, valid 3 months, max 500 uses

## API Endpoints

### POST /api/promo/validate
Validates promo code and calculates discount.

**Request:**
```json
{
  "code": "FREE100",
  "productType": "credit_pack",
  "productId": "taste",
  "billingCycle": null
}
```

**Response (valid):**
```json
{
  "valid": true,
  "discountType": "percentage",
  "discountValue": 100,
  "originalPrice": 20,
  "discountAmount": 20,
  "finalPrice": 0
}
```

**Response (invalid):**
```json
{
  "valid": false,
  "error": "You have already used this promo code"
}
```

### POST /api/payment/create-link
Enhanced to accept promo code data.

**Request:**
```json
{
  "productType": "credit_pack",
  "productId": "taste",
  "promoCode": "LAUNCH50",
  "discountAmount": 10,
  "finalPrice": 10
}
```

**Behavior:**
- If `finalPrice > 0`: Creates Cardcom payment link with discounted amount
- If `finalPrice === 0`: Grants credits immediately, skips payment gateway

## UI Flow

1. User enters phone, receives OTP
2. User enters OTP
3. User optionally enters promo code and clicks "Apply"
4. System validates code, shows discount
5. User submits form
6. If free: redirects to success directly
7. If paid: redirects to Cardcom payment

## Validation Rules

- Code must exist and be active
- Must not be expired (valid_from/valid_until)
- Must not exceed max_uses
- User cannot reuse same code
- Must apply to product type

## Adding New Promo Codes

```sql
INSERT INTO public.promo_codes (code, discount_type, discount_value, applies_to, valid_from, valid_until, max_uses, active)
VALUES
  ('SUMMER25', 'percentage', 25, 'all', NOW(), NOW() + INTERVAL '2 months', 200, TRUE);
```

## Security

- Promo codes converted to uppercase
- One-time use per user enforced at DB level
- Usage tracked with original price, discount, and final price
- Session required for validation

## Files Modified

1. `supabase/migrations/20240101000012_promo_codes.sql` - Database schema
2. `src/pages/api/promo/validate.ts` - Validation endpoint
3. `src/pages/api/payment/create-link.ts` - Enhanced payment creation
4. `src/pages/checkout/login.astro` - UI with promo input
5. `src/pages/checkout/success.astro` - Free purchase handling
