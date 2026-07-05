import type { SupabaseClient } from '@supabase/supabase-js';

export const STORAGE_BUCKET = 'work-images';

/**
 * Upload an image to the public bucket and return its public URL.
 * Path scheme matches legacy admin.js: u/<timestamp>_<sanitized-name>.
 */
export async function uploadImage(sb: SupabaseClient, file: File): Promise<string> {
  const safe = file.name.replace(/[^\w.\-]+/g, '_');
  const path = `u/${Date.now()}_${safe}`;
  const up = await sb.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { cacheControl: '3600', upsert: false });
  if (up.error) throw up.error;
  return sb.storage.from(STORAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}
