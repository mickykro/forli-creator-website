#!/usr/bin/env node
/**
 * Import businesses from CSV to Supabase
 * Usage: node scripts/import-businesses.js
 */

import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kvolkllkmzhueciuqwxv.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable not set');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const CSV_PATH = process.argv[2] || '/Users/MichaelKrotorio/Downloads/Call4li automation - Businesses (3).csv';

async function importBusinesses() {
  const businesses = [];
  const seenIds = new Set();

  const parser = createReadStream(CSV_PATH).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
      trim: true,
    })
  );

  for await (const row of parser) {
    // Skip empty rows or duplicates
    if (!row.business_id || seenIds.has(row.business_id)) {
      continue;
    }
    seenIds.add(row.business_id);

    // Parse date (handle multiple formats)
    let createdAt = null;
    if (row.date) {
      const dateStr = row.date;
      if (dateStr.includes('T')) {
        // ISO format: 2026-05-27 - 19:47
        createdAt = dateStr.replace(' - ', 'T').replace(/(\d{2}:\d{2})$/, '$1:00');
      } else {
        // DD/MM/YYYY HH:MM format
        const [datePart, timePart] = dateStr.split(' ');
        const [day, month, year] = datePart.split('/');
        createdAt = `${year}-${month}-${day}T${timePart || '00:00'}:00`;
      }
    }

    const business = {
      business_id: row.business_id,
      business_name: row.business_name || 'Unnamed Business',
      phone_number: row.phone_number,
      status: row.status || 'active',
      details: row.details || null,
      business_profile_compact: row.business_profile_compact || null,
      policies_compact: row.policies_compact || null,
      faqs_compact: row.faqs_compact || null,
      hours: row.hours || null,
      intent: row.intent || null,
      knowledge_stage: row.knowledge_stage || null,
      validation_started_at: row.validation_started_at || null,
      call_sid: row.call_sid || null,
      calendly_token: row.calendly_token || null,
      calendly_refresh_token: row.calendly_refresh_token || null,
      calendly_user_uri: row.calendly_user_uri || null,
      calendly_connected_at: row.calendly_connected_at || null,
      calendly_setup_step: row.calendly_setup_step ? parseInt(row.calendly_setup_step) : null,
      calendly_setup_duration: row.calendly_setup_duration || null,
      calendly_setup_hours: row.calendly_setup_hours || null,
      calendly_setup_event_name: row.calendly_setup_event_name || null,
      calendly_event_type_uri: row.calendly_event_type_uri || null,
      instagram: row.instegram || null, // Note: typo in CSV
      pending_state: row.pending_state || null,
      pending_image_url: row.pending_image_url || null,
      wa_template: row.wa_template || null,
      notes: row.notes || null,
      blocked: row['blocked '] === 'true' || row['blocked '] === '1', // Note: space in column name
      created_at: createdAt || new Date().toISOString(),
    };

    businesses.push(business);
  }

  console.log(`Parsed ${businesses.length} unique businesses from CSV`);

  // Insert in batches of 100
  const BATCH_SIZE = 100;
  for (let i = 0; i < businesses.length; i += BATCH_SIZE) {
    const batch = businesses.slice(i, i + BATCH_SIZE);

    console.log(`Inserting batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} records)...`);

    const { data, error } = await supabase
      .from('businesses')
      .upsert(batch, { onConflict: 'business_id' });

    if (error) {
      console.error(`Error inserting batch:`, error);
      continue;
    }

    console.log(`✓ Batch inserted successfully`);
  }

  console.log(`\n✅ Import complete! ${businesses.length} businesses migrated to Supabase.`);
}

importBusinesses().catch(console.error);
