/**
 * Test script to verify promo code system is working
 * Run with: node test-promo.js
 */

const SITE_URL = 'http://localhost:4321'; // Change to your dev server URL

async function testPromoValidation() {
  console.log('Testing promo code validation...\n');

  // First, you need to have a valid session cookie
  // For testing, you can get one by going through the login flow first

  const testCases = [
    { code: 'FREE100', productType: 'credit_pack', productId: 'taste' },
    { code: 'LAUNCH50', productType: 'credit_pack', productId: 'taste' },
    { code: 'INVALID', productType: 'credit_pack', productId: 'taste' },
  ];

  for (const test of testCases) {
    console.log(`Testing code: ${test.code}`);
    try {
      const response = await fetch(`${SITE_URL}/api/promo/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(test),
      });

      const result = await response.json();
      console.log('Response:', JSON.stringify(result, null, 2));
      console.log('---\n');
    } catch (error) {
      console.error('Error:', error.message);
      console.log('---\n');
    }
  }
}

testPromoValidation();
