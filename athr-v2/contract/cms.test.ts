import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

/**
 * C1 — lib/cms.ts must speak the REAL legacy Supabase schema:
 * site_content(key,value), work_items, journal_items ordered by created_at asc.
 */

const state: {
  rows: Record<string, { data: any; error: any }>;
  calls: { table: string; orderCol?: string; ascending?: boolean }[];
} = { rows: {}, calls: [] };

vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from(table: string) {
      const result = state.rows[table] ?? { data: null, error: new Error('no such table') };
      const call: (typeof state.calls)[number] = { table };
      state.calls.push(call);
      const thenable = {
        select() {
          return thenable;
        },
        order(col: string, opts?: { ascending?: boolean }) {
          call.orderCol = col;
          call.ascending = opts?.ascending;
          return thenable;
        },
        then(resolve: (v: any) => void) {
          resolve(result);
        },
      };
      return thenable;
    },
  }),
}));

import { fetchCms } from '../lib/cms';
import schema from '../content/schema.json';
import en from '../content/en.json';

beforeEach(() => {
  state.rows = {};
  state.calls = [];
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'anon';
});
afterEach(() => {
  delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
});

describe('C1: fetchCms against the legacy schema', () => {
  it('reads work_items + journal_items (created_at ascending) and site_content', async () => {
    state.rows = {
      site_content: { data: [{ key: 'hero_btn', value: 'Explore' }], error: null },
      work_items: {
        data: [
          {
            id: '1',
            title: 'New Brand',
            title_ar: 'علامة',
            category: 'Identity',
            year: '2026',
            image_url: null,
            created_at: '2026-01-01',
          },
        ],
        error: null,
      },
      journal_items: {
        data: [
          {
            id: 'j1',
            title: 'Post',
            tag: 'Craft',
            date_label: 'Jun 2026',
            excerpt: 'x',
            image_url: null,
            created_at: '2026-01-01',
          },
        ],
        error: null,
      },
    };
    const cms = await fetchCms();
    expect(cms.overrides.hero_btn).toBe('Explore');
    expect(cms.work[0].title).toBe('New Brand');
    expect(cms.journal[0].tag).toBe('Craft');

    const workCall = state.calls.find((c) => c.table === 'work_items');
    const jrnCall = state.calls.find((c) => c.table === 'journal_items');
    expect(workCall?.orderCol).toBe('created_at');
    expect(workCall?.ascending).toBe(true);
    expect(jrnCall?.orderCol).toBe('created_at');
    expect(jrnCall?.ascending).toBe(true);
  });

  it('sanitizes copy overrides but leaves data keys (URLs/JSON/sizes) intact', async () => {
    state.rows = {
      site_content: {
        data: [
          { key: 'hero_sub', value: 'safe <em>em</em> <script>alert(1)</script>' },
          { key: 'philosophy_image', value: 'https://x/img.png?a=1&b=2' },
          { key: 'footer_extra_lines', value: '["CR 1010"]' },
          { key: 'hero_sub__size', value: '1.4rem' },
        ],
        error: null,
      },
      work_items: { data: [], error: null },
      journal_items: { data: [], error: null },
    };
    const cms = await fetchCms();
    expect(cms.overrides.hero_sub).toBe('safe <em>em</em> alert(1)');
    expect(cms.overrides.philosophy_image).toBe('https://x/img.png?a=1&b=2');
    expect(cms.overrides.footer_extra_lines).toBe('["CR 1010"]');
    expect(cms.overrides.hero_sub__size).toBe('1.4rem');
  });

  it('fails silently to EMPTY when env is missing', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    const cms = await fetchCms();
    expect(cms).toEqual({ overrides: {}, work: [], journal: [] });
  });

  it('tolerates per-table errors (null data → empty arrays)', async () => {
    state.rows = {
      site_content: { data: null, error: new Error('boom') },
      work_items: { data: null, error: new Error('boom') },
      journal_items: { data: null, error: new Error('boom') },
    };
    const cms = await fetchCms();
    expect(cms).toEqual({ overrides: {}, work: [], journal: [] });
  });
});

describe('C1: generated schema.json', () => {
  it('covers every content key with group/label/selector metadata', () => {
    expect(schema).toHaveLength(Object.keys(en).length);
    for (const entry of schema) {
      expect(entry.key in en, entry.key).toBe(true);
      expect(entry.group).toBeTruthy();
      expect(entry.label).toBeTruthy();
      expect(entry.selector).toMatch(/^[.#]/);
      expect(typeof entry.multiline).toBe('boolean');
      expect(typeof entry.hasAr).toBe('boolean');
    }
  });
});
