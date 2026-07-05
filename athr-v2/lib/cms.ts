import { createClient } from '@supabase/supabase-js';

/**
 * Row shapes match the REAL legacy Supabase schema (see legacy/admin.js +
 * legacy/cms.js): tables `work_items` and `journal_items`, ordered by
 * created_at ascending on the public site.
 */
export interface WorkRow {
  id: string;
  title: string;
  title_ar: string | null;
  category: string | null;
  year: string | null;
  image_url: string | null;
  created_at: string;
}

export interface JournalRow {
  id: string;
  title: string;
  tag: string | null;
  date_label: string | null;
  excerpt: string | null;
  image_url: string | null;
  created_at: string;
}

export interface CmsData {
  overrides: Record<string, string>;
  work: WorkRow[];
  journal: JournalRow[];
}

const EMPTY: CmsData = { overrides: {}, work: [], journal: [] };

/** Only allow the same inline tags the legacy control panel produces. */
const DISALLOWED = /<(?!\/?(em|br|span)\b)[^>]*>/gi;
const sanitize = (raw: string) => raw.replace(DISALLOWED, '');

/** Keys whose values are data (URLs, JSON, sizes) — never HTML-sanitized as copy. */
const DATA_KEY = /(__size$|^philosophy_image$|^footer_extra_lines$)/;

/**
 * Fetch site content, work items, and journal articles from Supabase.
 * Falls back to an empty result on any failure (missing env, network,
 * schema drift) — mirroring the legacy cms.js "fails silently" contract
 * so a broken CMS never breaks the public site.
 */
export async function fetchCms(): Promise<CmsData> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return EMPTY;
  try {
    const sb = createClient(url, key);
    const [content, work, journal] = await Promise.all([
      sb.from('site_content').select('key,value'),
      sb.from('work_items').select('*').order('created_at', { ascending: true }),
      sb.from('journal_items').select('*').order('created_at', { ascending: true }),
    ]);
    const overrides: Record<string, string> = {};
    for (const r of content.data ?? []) {
      if (typeof r.value !== 'string') continue;
      overrides[r.key] = DATA_KEY.test(r.key) ? r.value : sanitize(r.value);
    }
    return {
      overrides,
      work: (work.data as WorkRow[]) ?? [],
      journal: (journal.data as JournalRow[]) ?? [],
    };
  } catch {
    return EMPTY;
  }
}
