/* Brand-wide constants — single source of truth for contact info,
   canonical site URL, and CTA links. Update here, not in components. */

export const SITE_URL = 'https://call4li.com';

export const BUSINESS = {
  legalName: 'Call4li',
  brandName: 'Forly',
  brandNameHe: 'פורלי',
  email: 'info@call4li.com',
  phone: '054-801-8957',
  phoneE164: '+972548018957',
  whatsappE164: '972553163293',
};

export const WHATSAPP_URL = `https://wa.me/${BUSINESS.whatsappE164}`;
export const WHATSAPP_HELLO_URL = `${WHATSAPP_URL}?text=${encodeURIComponent('היי, אני רוצה להצטרף לפורלי')}`;
export const WHATSAPP_QUESTION_URL = `${WHATSAPP_URL}?text=${encodeURIComponent('היי, יש לי שאלה לגבי פורלי')}`;
