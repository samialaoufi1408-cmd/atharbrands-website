import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createClient } from '@supabase/supabase-js';

/**
 * On-demand ISR refresh for the control panel ("تحديث الموقع الآن").
 * Auth: the caller must present a valid Supabase access token belonging to an
 * authenticated panel user — verified server-side via auth.getUser(token).
 */
export async function POST(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: false, error: 'unconfigured' }, { status: 500 });
  }

  const auth = req.headers.get('authorization') ?? '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) {
    return NextResponse.json({ ok: false, error: 'missing token' }, { status: 401 });
  }

  const sb = createClient(url, key);
  const { data, error } = await sb.auth.getUser(token);
  if (error || !data?.user) {
    return NextResponse.json({ ok: false, error: 'invalid token' }, { status: 401 });
  }

  revalidatePath('/en');
  revalidatePath('/ar');
  return NextResponse.json({ ok: true, revalidated: ['/en', '/ar'] });
}
