import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const revalidated: string[] = [];
vi.mock('next/cache', () => ({
  revalidatePath: (p: string) => revalidated.push(p),
}));

let userResult: { data: any; error: any } = { data: { user: null }, error: null };
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    auth: {
      getUser: async (token: string) =>
        token === 'valid-token' ? { data: { user: { id: 'u1' } }, error: null } : userResult,
    },
  }),
}));

import { POST } from '../app/api/revalidate/route';

function req(authHeader?: string) {
  return {
    headers: {
      get: (name: string) =>
        name.toLowerCase() === 'authorization' ? (authHeader ?? null) : null,
    },
  } as any;
}

beforeEach(() => {
  revalidated.length = 0;
  userResult = { data: { user: null }, error: { message: 'bad token' } };
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon';
});
afterEach(() => {
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
});

describe('B5: POST /api/revalidate', () => {
  it('401 without a bearer token; nothing revalidated', async () => {
    const res = await POST(req());
    expect(res.status).toBe(401);
    expect(revalidated).toEqual([]);
  });

  it('401 with an invalid token', async () => {
    const res = await POST(req('Bearer garbage'));
    expect(res.status).toBe(401);
    expect(revalidated).toEqual([]);
  });

  it('revalidates /en and /ar with a valid Supabase session token', async () => {
    const res = await POST(req('Bearer valid-token'));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ ok: true, revalidated: ['/en', '/ar'] });
    expect(revalidated).toEqual(['/en', '/ar']);
  });

  it('500 when Supabase env is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    const res = await POST(req('Bearer valid-token'));
    expect(res.status).toBe(500);
    expect(revalidated).toEqual([]);
  });
});
