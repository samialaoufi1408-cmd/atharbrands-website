import { render, fireEvent, act, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/* ------------------------------------------------------------------ */
/* Scripted Supabase fake shared by all admin tests                     */
/* ------------------------------------------------------------------ */

interface Call {
  table?: string;
  op: string;
  args?: any;
}

const fake = {
  session: null as any,
  authChangeCb: null as null | ((e: string, s: any) => void),
  signInResult: { data: {}, error: null } as any,
  tables: {} as Record<string, { data: any; error: any }>,
  calls: [] as Call[],
  uploads: [] as string[],
};

function builder(table: string) {
  const result = () => fake.tables[table] ?? { data: [], error: null };
  const b: any = {
    select() {
      fake.calls.push({ table, op: 'select' });
      return b;
    },
    order(col: string, opts?: any) {
      fake.calls.push({ table, op: 'order', args: { col, ...opts } });
      return b;
    },
    insert(row: any) {
      fake.calls.push({ table, op: 'insert', args: row });
      return Promise.resolve({ data: null, error: null });
    },
    upsert(rows: any, opts: any) {
      fake.calls.push({ table, op: 'upsert', args: { rows, opts } });
      return Promise.resolve({ data: null, error: null });
    },
    delete() {
      return {
        eq(col: string, val: any) {
          fake.calls.push({ table, op: 'delete', args: { col, val } });
          return Promise.resolve({ data: null, error: null });
        },
      };
    },
    then(resolve: (v: any) => void) {
      resolve(result());
    },
  };
  return b;
}

const fakeClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: fake.session } }),
    onAuthStateChange(cb: (e: string, s: any) => void) {
      fake.authChangeCb = cb;
      return { data: { subscription: { unsubscribe() {} } } };
    },
    signInWithPassword(creds: any) {
      fake.calls.push({ op: 'signIn', args: creds });
      return Promise.resolve(fake.signInResult);
    },
    signOut() {
      fake.calls.push({ op: 'signOut' });
      fake.session = null;
      return Promise.resolve({ error: null });
    },
  },
  from: (table: string) => builder(table),
  storage: {
    from(bucket: string) {
      return {
        upload(path: string) {
          fake.uploads.push(`${bucket}/${path}`);
          return Promise.resolve({ data: { path }, error: null });
        },
        getPublicUrl(path: string) {
          return { data: { publicUrl: `https://cdn.test/${bucket}/${path}` } };
        },
      };
    },
  },
};

vi.mock('@/lib/supabase-browser', () => ({
  getBrowserClient: () => fakeClient,
}));

import { AdminApp } from './AdminApp';
import { TextsPanel } from './TextsPanel';
import { WorkPanel } from './WorkPanel';
import { JournalPanel } from './JournalPanel';
import { EnquiriesPanel } from './EnquiriesPanel';

const SESSION = { access_token: 'tok-123', user: { id: 'u1', email: 'a@b.c' } } as any;

beforeEach(() => {
  fake.session = null;
  fake.authChangeCb = null;
  fake.signInResult = { data: {}, error: null };
  fake.tables = {};
  fake.calls = [];
  fake.uploads = [];
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

/* ------------------------------------------------------------------ */
/* B1 — auth shell                                                      */
/* ------------------------------------------------------------------ */

describe('B1: AdminApp auth gate', () => {
  it('no session → login form; failed sign-in shows the error', async () => {
    fake.signInResult = { data: {}, error: { message: 'Invalid login credentials' } };
    const { findByTestId, getByLabelText, findByText } = render(<AdminApp />);
    const form = await findByTestId('login-form');
    fireEvent.change(getByLabelText('البريد الإلكتروني'), { target: { value: 'x@y.z' } });
    fireEvent.change(getByLabelText('كلمة المرور'), { target: { value: 'nope' } });
    await act(async () => {
      fireEvent.submit(form);
    });
    expect(await findByText(/تعذّر الدخول/)).toBeTruthy();
    const signIn = fake.calls.find((c) => c.op === 'signIn');
    expect(signIn?.args).toEqual({ email: 'x@y.z', password: 'nope' });
  });

  it('successful sign-in (via auth state change) shows tabs; sign-out returns to login', async () => {
    fake.tables['site_content'] = { data: [], error: null };
    const { findByTestId, findByRole, getByText, queryByTestId } = render(<AdminApp />);
    await findByTestId('login-form');

    // Supabase fires the auth callback after a successful signInWithPassword
    await act(async () => {
      fake.authChangeCb?.('SIGNED_IN', SESSION);
    });
    await findByRole('tab', { selected: true });
    expect(getByText('النصوص')).toBeTruthy();
    expect(await findByTestId('texts-panel')).toBeTruthy();

    await act(async () => {
      fireEvent.click(getByText('تسجيل الخروج'));
    });
    expect(await findByTestId('login-form')).toBeTruthy();
    expect(queryByTestId('texts-panel')).toBeNull();
    expect(fake.calls.some((c) => c.op === 'signOut')).toBe(true);
  });

  it('existing session on mount goes straight to the editor', async () => {
    fake.session = SESSION;
    fake.tables['site_content'] = { data: [], error: null };
    const { findByTestId } = render(<AdminApp />);
    expect(await findByTestId('texts-panel')).toBeTruthy();
  });
});

/* ------------------------------------------------------------------ */
/* B2 — texts editor                                                    */
/* ------------------------------------------------------------------ */

describe('B2: TextsPanel', () => {
  it('renders schema groups with EN + AR fields, saved overrides win over defaults', async () => {
    fake.tables['site_content'] = {
      data: [{ key: 'hero_btn', value: 'Explore' }],
      error: null,
    };
    const { findByTestId, container } = render(<TextsPanel toast={() => {}} />);
    await findByTestId('texts-panel');
    // Group headings from cms-config
    expect(container.textContent).toContain('Hero');
    expect(container.textContent).toContain('Services');
    // Override wins over the generated default
    const heroBtn = container.querySelector<HTMLTextAreaElement>('[data-key="hero_btn"]')!;
    expect(heroBtn.value).toBe('Explore');
    // Default fills when no override
    const heroTitle = container.querySelector<HTMLTextAreaElement>('[data-key="hero_title_1"]')!;
    expect(heroTitle.value).toBe('Legacy');
    // Arabic field present for keys with an Arabic default
    expect(container.querySelector('[data-key="hero_btn__ar"]')).toBeTruthy();
  });

  it('save upserts EN, AR, size and footer_extra_lines rows with onConflict key', async () => {
    fake.tables['site_content'] = { data: [], error: null };
    const toast = vi.fn();
    const { findByTestId, container, getByText } = render(<TextsPanel toast={toast} />);
    await findByTestId('texts-panel');

    fireEvent.change(container.querySelector('[data-key="hero_btn"]')!, {
      target: { value: 'Begin' },
    });
    fireEvent.change(container.querySelector('[data-key="hero_btn__ar"]')!, {
      target: { value: 'ابدأ' },
    });
    fireEvent.change(container.querySelector('[data-size-key="hero_btn__size"]')!, {
      target: { value: '1.1rem' },
    });
    fireEvent.click(getByText('+ أضف خانة'));
    fireEvent.change(container.querySelector('[aria-label="extra line 1"]')!, {
      target: { value: 'سجل تجاري 1010' },
    });

    await act(async () => {
      fireEvent.click(await findByTestId('save-texts'));
    });

    const upsert = fake.calls.find((c) => c.op === 'upsert' && c.table === 'site_content');
    expect(upsert).toBeTruthy();
    expect(upsert!.args.opts).toEqual({ onConflict: 'key' });
    const rows: { key: string; value: string }[] = upsert!.args.rows;
    const byKey = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    expect(byKey['hero_btn']).toBe('Begin');
    expect(byKey['hero_btn__ar']).toBe('ابدأ');
    expect(byKey['hero_btn__size']).toBe('1.1rem');
    expect(byKey['footer_extra_lines']).toBe('["سجل تجاري 1010"]');
    expect(toast).toHaveBeenCalledWith(expect.stringContaining('✓'));
  });
});

/* ------------------------------------------------------------------ */
/* B3 — work CRUD                                                       */
/* ------------------------------------------------------------------ */

describe('B3: WorkPanel', () => {
  it('lists rows newest-first and deletes with confirm', async () => {
    fake.tables['work_items'] = {
      data: [
        { id: 'w1', title: 'Noor', title_ar: 'نور', category: 'Identity', year: '2026', image_url: null, created_at: '2026-01-01' },
      ],
      error: null,
    };
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const { findByTestId, getByText } = render(<WorkPanel toast={() => {}} />);
    await findByTestId('work-row-w1');
    const order = fake.calls.find((c) => c.table === 'work_items' && c.op === 'order');
    expect(order?.args).toMatchObject({ col: 'created_at', ascending: false });

    await act(async () => {
      fireEvent.click(getByText('حذف'));
    });
    const del = fake.calls.find((c) => c.op === 'delete' && c.table === 'work_items');
    expect(del?.args).toEqual({ col: 'id', val: 'w1' });
  });

  it('blocks add without a title; inserts the exact legacy row shape with one', async () => {
    fake.tables['work_items'] = { data: [], error: null };
    const { findByTestId, container, findByText } = render(<WorkPanel toast={() => {}} />);
    const form = await findByTestId('work-form');

    await act(async () => {
      fireEvent.submit(form);
    });
    expect(await findByText('العنوان مطلوب')).toBeTruthy();
    expect(fake.calls.some((c) => c.op === 'insert')).toBe(false);

    fireEvent.change(container.querySelector('#w-title')!, { target: { value: 'Sadu' } });
    fireEvent.change(container.querySelector('#w-title-ar')!, { target: { value: 'سدو' } });
    fireEvent.change(container.querySelector('#w-cat')!, { target: { value: 'Textiles' } });
    fireEvent.change(container.querySelector('#w-year')!, { target: { value: '2026' } });
    await act(async () => {
      fireEvent.submit(form);
    });
    const ins = fake.calls.find((c) => c.op === 'insert' && c.table === 'work_items');
    expect(ins?.args).toEqual({
      title: 'Sadu',
      title_ar: 'سدو',
      category: 'Textiles',
      year: '2026',
      image_url: null,
    });
  });
});

/* ------------------------------------------------------------------ */
/* B4 — journal CRUD                                                    */
/* ------------------------------------------------------------------ */

describe('B4: JournalPanel', () => {
  it('inserts the legacy journal_items row shape', async () => {
    fake.tables['journal_items'] = { data: [], error: null };
    const { findByTestId, container } = render(<JournalPanel toast={() => {}} />);
    const form = await findByTestId('journal-form');
    fireEvent.change(container.querySelector('#j-title')!, { target: { value: 'On Gold' } });
    fireEvent.change(container.querySelector('#j-tag')!, { target: { value: 'Craft' } });
    fireEvent.change(container.querySelector('#j-date')!, { target: { value: 'Jun 2026' } });
    fireEvent.change(container.querySelector('#j-excerpt')!, { target: { value: 'x' } });
    await act(async () => {
      fireEvent.submit(form);
    });
    const ins = fake.calls.find((c) => c.op === 'insert' && c.table === 'journal_items');
    expect(ins?.args).toEqual({
      title: 'On Gold',
      tag: 'Craft',
      date_label: 'Jun 2026',
      excerpt: 'x',
      image_url: null,
    });
  });
});

/* ------------------------------------------------------------------ */
/* B5 — enquiries + revalidate                                          */
/* ------------------------------------------------------------------ */

describe('B5: EnquiriesPanel', () => {
  it('renders enquiries newest-first and calls /api/revalidate with the session token', async () => {
    fake.tables['enquiries'] = {
      data: [
        {
          id: 'e1',
          created_at: '2026-07-01T10:00:00Z',
          name: 'Sami',
          email: 's@athr.sa',
          organisation: 'ATHR',
          vision: 'a lasting mark',
          locale: 'en',
        },
      ],
      error: null,
    };
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    const toast = vi.fn();
    const { findByTestId, getByText, container } = render(
      <EnquiriesPanel toast={toast} session={SESSION} />,
    );
    await findByTestId('enquiry-e1');
    expect(container.textContent).toContain('Sami');
    expect(container.textContent).toContain('a lasting mark');
    const order = fake.calls.find((c) => c.table === 'enquiries' && c.op === 'order');
    expect(order?.args).toMatchObject({ col: 'created_at', ascending: false });

    await act(async () => {
      fireEvent.click(getByText('تحديث الموقع الآن'));
    });
    expect(fetchMock).toHaveBeenCalledWith('/api/revalidate', {
      method: 'POST',
      headers: { Authorization: 'Bearer tok-123' },
    });
    expect(toast).toHaveBeenCalledWith(expect.stringContaining('✓'));
    vi.unstubAllGlobals();
  });
});
