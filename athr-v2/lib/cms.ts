import { createClient } from '@supabase/supabase-js';

export interface WorkRow {
  id: string;
  category: string;
  name: string;
  name_ar: string;
  year: string;
  image_url: string | null;
  sort: number;
}

export interface JournalRow {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  published_at: string;
  sort: number;
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
      sb.from('work').select('*').order('sort'),
      sb.from('journal').select('*').order('sort'),
    ]);
    const overrides: Record<string, string> = {};
    for (const r of content.data ?? []) {
      if (typeof r.value === 'string') overrides[r.key] = sanitize(r.value);
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
