'use server';
import { createClient } from '@supabase/supabase-js';

export interface EnquiryInput {
  name: string;
  email: string;
  organisation?: string;
  vision: string;
  locale: string;
}

export interface EnquiryResult {
  ok: boolean;
  error?: string;
}

/**
 * Insert a contact-form enquiry into the Supabase `enquiries` table.
 * Anonymous inserts are allowed by RLS; reads are locked to authenticated users
 * (the /admin panel). Fails softly with `{ ok: false }` if Supabase is
 * unreachable or credentials are missing, so the UI stays usable in every case.
 */
export async function sendEnquiry(input: EnquiryInput): Promise<EnquiryResult> {
  if (!input || typeof input !== 'object') return { ok: false, error: 'invalid' };
  const { name, email, vision, organisation, locale } = input;
  if (typeof name !== 'string' || typeof email !== 'string' || typeof vision !== 'string' ||
      !name.trim() || name.length > 100 || email.length > 254 || vision.length > 4000 ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim()) || !vision.trim() ||
      (organisation !== undefined && (typeof organisation !== 'string' || organisation.length > 200)) ||
      !['ar', 'en'].includes(locale)) {
    return { ok: false, error: 'invalid' };
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return { ok: false, error: 'unconfigured' };
  try {
    const sb = createClient(url, key);
    const { error } = await sb.from('enquiries').insert({
      name: name.trim(),
      email: email.trim(),
      organisation: organisation?.trim() || null,
      vision: vision.trim(),
      locale,
    });
    return error ? { ok: false, error: error.message } : { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'network' };
  }
}
