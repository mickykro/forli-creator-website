# Google Sheets → Supabase Auto-Sync Setup

Automatically sync every edit in Google Sheets to Supabase in real-time.

## Step 1: Apply Database Migration

In **Supabase SQL Editor**:
```sql
-- Copy and run the SQL from:
-- supabase/migrations/20240101000008_businesses_table.sql
```

## Step 2: Import Existing Data (One-Time)

In **Supabase SQL Editor**:
```sql
-- Copy and run the SQL from:
-- scripts/import-businesses.sql
```

## Step 3: Set Up Google Apps Script

### 3.1 Open Apps Script Editor

1. Open your Google Sheet: **Call4li automation - Businesses (3)**
2. Click **Extensions** → **Apps Script**
3. Delete any existing code in the editor

### 3.2 Paste the Sync Script

Copy the entire contents of `scripts/google-sheets-sync.js` and paste into the Apps Script editor.

### 3.3 Configure Credentials

1. In Apps Script, click the **⚙️ Project Settings** icon (left sidebar)
2. Scroll to **Script Properties**
3. Click **Add script property**
4. Add:
   - **Property:** `SUPABASE_SERVICE_ROLE_KEY`
   - **Value:** Your Supabase service role key from Supabase Dashboard → Settings → API

### 3.4 Save and Authorize

1. Click **💾 Save** (or Ctrl+S)
2. Click **Run** → Select `onOpen` function
3. Click **Review permissions** and authorize the script
4. Accept the permissions (read/write sheet data, make external HTTP requests)

### 3.5 Rename the Sheet (Important!)

The script syncs from a sheet named `"Businesses (3)"`. If your sheet has a different name:
- Either rename your sheet to `"Businesses (3)"`
- OR edit line 23 in the script to match your sheet name:
  ```javascript
  if (sheetName !== 'YOUR_ACTUAL_SHEET_NAME') {
  ```

## Step 4: Test the Setup

### Test Connection
1. Reload your Google Sheet
2. You'll see a new menu: **Supabase Sync**
3. Click **Supabase Sync** → **Test Connection**
4. Should show: ✓ Connected to Supabase successfully!

### Test Auto-Sync
1. Edit any cell in a business row (not the header)
2. Check Apps Script logs: **View** → **Executions**
3. Should see: `✓ Synced row X to Supabase`

### Bulk Sync All Rows
1. Click **Supabase Sync** → **Sync All Rows**
2. All existing rows will sync to Supabase
3. Toast notification shows results

## How It Works

### Automatic Sync
- **Trigger:** Every time you edit a cell
- **Action:** That entire row syncs to Supabase immediately
- **Method:** Upsert (creates if new, updates if exists)
- **Deduplication:** Uses `business_id` as unique key

### What Gets Synced
All columns from your sheet:
- `business_id` (required, unique key)
- `business_name`, `phone_number`, `status`
- `details`, `hours`, `notes`
- Calendly integration fields
- Instagram handle, pending state, etc.

### Error Handling
- If sync fails, you'll see a toast notification
- Check **Apps Script** → **Executions** for error logs
- The script won't block your edits

## Verification

Check if data is in Supabase:

```sql
-- In Supabase SQL Editor
SELECT business_id, business_name, status, updated_at
FROM public.businesses
ORDER BY updated_at DESC
LIMIT 10;
```

## Troubleshooting

### "Authorization failed"
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set correctly in Script Properties
- Verify the key has `service_role` permissions (not `anon` key)

### "Supabase error: 409 Conflict"
- This means the `business_id` already exists
- The script uses upsert, so this shouldn't happen
- Check that the `on_conflict=business_id` parameter is in the URL

### Script not triggering
- Make sure you saved the script after pasting
- Verify the `onEdit` trigger is installed (Apps Script → Triggers)
- Check that you're editing the correct sheet name

### Slow performance
- The script syncs one row at a time on each edit
- For bulk updates, use **Supabase Sync → Sync All Rows** instead of editing many cells individually

## Advanced: Trigger Setup (If Auto-Sync Doesn't Work)

If `onEdit` doesn't trigger automatically:

1. Apps Script → **Triggers** (clock icon, left sidebar)
2. Click **+ Add Trigger**
3. Configure:
   - Function: `onEdit`
   - Event source: From spreadsheet
   - Event type: On edit
4. Save

## Cost & Performance

- **Google Apps Script:** Free (quotas: 20,000 executions/day)
- **Supabase:** Free tier includes 500MB database + 2GB bandwidth
- **Latency:** ~500ms per edit (HTTP request to Supabase)

## Next Steps

Now that sync is set up:
1. **Continue using Google Sheets** as your primary interface
2. **Query Supabase** for advanced reporting, analytics, or integrations
3. **Use n8n workflows** to trigger actions based on Supabase data
4. **Build admin dashboards** that read from Supabase

Your Google Sheet is now the master data source, with Supabase as a real-time replica.
