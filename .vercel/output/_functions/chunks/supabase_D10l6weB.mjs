import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://kvolkllkmzhueciuqwxv.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2b2xrbGxrbXpodWVjaXVxd3h2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTcyMTEwNSwiZXhwIjoyMDk1Mjk3MTA1fQ.wBUupAD3K-SH5_4Bv2fyySOzBXIrlfq3Gdabr2lxGY4";
function getSupabaseServer() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export { getSupabaseServer as g };
