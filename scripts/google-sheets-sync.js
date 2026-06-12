/**
 * Google Apps Script for Google Sheets → Supabase Auto-Sync
 *
 * Setup Instructions:
 * 1. Open your Google Sheet
 * 2. Extensions → Apps Script
 * 3. Paste this code
 * 4. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Script Properties
 *    (Project Settings → Script Properties)
 * 5. Save and authorize
 * 6. Test by editing a cell in the sheet
 */

const SUPABASE_URL = 'https://kvolkllkmzhueciuqwxv.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = PropertiesService.getScriptProperties().getProperty('SUPABASE_SERVICE_ROLE_KEY');

/**
 * Triggered automatically when a cell is edited
 */
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const sheetName = sheet.getName();

  // Only sync the "Businesses" sheet (adjust name as needed)
  if (sheetName !== 'Businesses (3)') {
    return;
  }

  const row = e.range.getRow();

  // Skip header row
  if (row === 1) {
    return;
  }

  try {
    syncRowToSupabase(sheet, row);
    Logger.log(`✓ Synced row ${row} to Supabase`);
  } catch (error) {
    Logger.log(`✗ Error syncing row ${row}: ${error.message}`);
    // Optional: Show toast notification in sheet
    SpreadsheetApp.getActiveSpreadsheet().toast(
      `Failed to sync: ${error.message}`,
      'Supabase Sync Error',
      5
    );
  }
}

/**
 * Sync a specific row to Supabase
 */
function syncRowToSupabase(sheet, rowIndex) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const rowData = sheet.getRange(rowIndex, 1, 1, sheet.getLastColumn()).getValues()[0];

  // Map row to object
  const business = {};
  headers.forEach((header, index) => {
    const value = rowData[index];
    if (value !== null && value !== '') {
      business[header] = value;
    }
  });

  // Skip empty rows
  if (!business.business_id) {
    return;
  }

  // Transform to Supabase schema
  const payload = {
    business_id: business.business_id,
    business_name: business.business_name || 'Unnamed Business',
    phone_number: business.phone_number,
    status: business.status || 'active',
    details: business.details || null,
    business_profile_compact: business.business_profile_compact || null,
    policies_compact: business.policies_compact || null,
    faqs_compact: business.faqs_compact || null,
    hours: business.hours || null,
    intent: business.intent || null,
    knowledge_stage: business.knowledge_stage || null,
    validation_started_at: business.validation_started_at || null,
    call_sid: business.call_sid || null,
    calendly_token: business.calendly_token || null,
    calendly_refresh_token: business.calendly_refresh_token || null,
    calendly_user_uri: business.calendly_user_uri || null,
    calendly_connected_at: business.calendly_connected_at || null,
    calendly_setup_step: business.calendly_setup_step ? parseInt(business.calendly_setup_step) : null,
    calendly_setup_duration: business.calendly_setup_duration || null,
    calendly_setup_hours: business.calendly_setup_hours || null,
    calendly_setup_event_name: business.calendly_setup_event_name || null,
    calendly_event_type_uri: business.calendly_event_type_uri || null,
    instagram: business.instegram || null, // Note: typo in sheet
    pending_state: business.pending_state || null,
    pending_image_url: business.pending_image_url || null,
    wa_template: business.wa_template || null,
    notes: business.notes || null,
    blocked: business['blocked '] === 'true' || business['blocked '] === '1', // Note: space in column
    updated_at: new Date().toISOString(),
  };

  // Upsert to Supabase
  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'apikey': SUPABASE_SERVICE_ROLE_KEY,
      'Prefer': 'resolution=merge-duplicates'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(
    `${SUPABASE_URL}/rest/v1/businesses?on_conflict=business_id`,
    options
  );

  if (response.getResponseCode() !== 201 && response.getResponseCode() !== 200) {
    throw new Error(`Supabase error: ${response.getContentText()}`);
  }

  return JSON.parse(response.getContentText());
}

/**
 * Manual sync all rows (run once to test)
 */
function syncAllRows() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Businesses (3)');
  const lastRow = sheet.getLastRow();

  let synced = 0;
  let errors = 0;

  for (let row = 2; row <= lastRow; row++) {
    try {
      syncRowToSupabase(sheet, row);
      synced++;
      Logger.log(`✓ Row ${row}`);
    } catch (error) {
      errors++;
      Logger.log(`✗ Row ${row}: ${error.message}`);
    }
  }

  Logger.log(`\nSync complete: ${synced} succeeded, ${errors} failed`);
  SpreadsheetApp.getActiveSpreadsheet().toast(
    `Synced ${synced} rows, ${errors} errors`,
    'Bulk Sync Complete',
    5
  );
}

/**
 * Add menu to Google Sheets UI
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Supabase Sync')
    .addItem('Sync All Rows', 'syncAllRows')
    .addItem('Test Connection', 'testSupabaseConnection')
    .addToUi();
}

/**
 * Test Supabase connection
 */
function testSupabaseConnection() {
  try {
    const options = {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SUPABASE_SERVICE_ROLE_KEY
      },
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(
      `${SUPABASE_URL}/rest/v1/businesses?limit=1`,
      options
    );

    if (response.getResponseCode() === 200) {
      SpreadsheetApp.getActiveSpreadsheet().toast(
        '✓ Connected to Supabase successfully!',
        'Connection Test',
        3
      );
    } else {
      throw new Error(response.getContentText());
    }
  } catch (error) {
    SpreadsheetApp.getActiveSpreadsheet().toast(
      `✗ Connection failed: ${error.message}`,
      'Connection Test',
      5
    );
  }
}
