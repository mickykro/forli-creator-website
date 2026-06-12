#!/usr/bin/env node
/**
 * Create user accounts for all businesses and link them
 * Usage: SUPABASE_SERVICE_ROLE_KEY=xxx node scripts/create-business-users.js
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kvolkllkmzhueciuqwxv.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable not set');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createBusinessUsers() {
  console.log('Fetching businesses without user accounts...\n');

  // Get all businesses without user_id
  const { data: businesses, error } = await supabase
    .from('businesses')
    .select('*')
    .is('user_id', null);

  if (error) {
    console.error('Error fetching businesses:', error);
    return;
  }

  console.log(`Found ${businesses.length} businesses without user accounts\n`);

  let created = 0;
  let errors = 0;

  for (const business of businesses) {
    const email = `${business.business_id.toLowerCase()}@call4li.com`; // e.g., c063@call4li.com
    const password = generatePassword(); // Random secure password

    console.log(`Creating user for ${business.business_name} (${business.business_id})...`);

    // Create auth user
    const { data: user, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        business_id: business.business_id,
        business_name: business.business_name,
        phone_number: business.phone_number
      }
    });

    if (authError) {
      console.error(`  ✗ Auth error: ${authError.message}`);
      errors++;
      continue;
    }

    // Link business to user
    const { error: updateError } = await supabase
      .from('businesses')
      .update({ user_id: user.user.id })
      .eq('business_id', business.business_id);

    if (updateError) {
      console.error(`  ✗ Link error: ${updateError.message}`);
      errors++;
      continue;
    }

    // Initialize credits
    const { error: creditsError } = await supabase
      .from('user_credits')
      .insert({ user_id: user.user.id, credits: 0 })
      .select();

    if (creditsError && creditsError.code !== '23505') { // Ignore duplicate key
      console.error(`  ✗ Credits error: ${creditsError.message}`);
    }

    console.log(`  ✓ User created: ${email} (${user.user.id})`);
    console.log(`  Password: ${password}\n`);
    created++;
  }

  console.log(`\n✅ Complete: ${created} users created, ${errors} errors`);
  console.log('\nIMPORTANT: Save the passwords above! They are not stored anywhere.');
}

function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

createBusinessUsers().catch(console.error);
