import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null | undefined;

/**
 * Browser-side Supabase client for the /admin panel (Supabase Auth session
 * lives in the browser, same model as the legacy admin.js). Returns null when
 * the public env vars are not configured so the panel can render a clear
 * "not configured" state instead of crashing.
 */
export function getBrowserClient(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  client = url && key ? createClient(url, key) : null;
  return client;
}

/** Test seam: reset the memoized client between tests. */
export function __resetBrowserClient() {
  client = undefined;
}
