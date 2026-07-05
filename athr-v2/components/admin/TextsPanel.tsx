'use client';
import { useEffect, useMemo, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase-browser';
import { uploadImage } from './upload';
import schema from '@/content/schema.json';
import en from '@/content/en.json';
import ar from '@/content/ar.json';

const SIZES = ['', '0.7rem', '0.8rem', '0.9rem', '1rem', '1.1rem', '1.25rem', '1.4rem',
  '1.6rem', '1.8rem', '2rem', '2.5rem', '3rem', '3.5rem', '4rem', '5rem', '6rem'];

interface SchemaEntry {
  group: string;
  key: string;
  label: string;
  multiline: boolean;
  hasAr: boolean;
  selector: string;
}

/**
 * Schema-driven texts editor. Values layer exactly like the public site:
 * saved override → generated default. Saving upserts every field as one
 * batch on site_content with onConflict:'key' — identical to legacy admin.js
 * (keys: k, k__ar, k__size, footer_extra_lines, philosophy_image).
 */
export function TextsPanel({ toast }: { toast: (m: string) => void }) {
  const sb = getBrowserClient()!;
  const entries = schema as SchemaEntry[];
  const groups = useMemo(() => {
    const order: string[] = [];
    const byGroup: Record<string, SchemaEntry[]> = {};
    for (const e of entries) {
      if (!byGroup[e.group]) {
        byGroup[e.group] = [];
        order.push(e.group);
      }
      byGroup[e.group].push(e);
    }
    return { order, byGroup };
  }, [entries]);

  const [values, setValues] = useState<Record<string, string>>({});
  const [extraLines, setExtraLines] = useState<string[]>([]);
  const [philImage, setPhilImage] = useState('');
  const [philFile, setPhilFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await sb.from('site_content').select('key,value');
      if (cancelled) return;
      if (res.error) {
        setError(`تعذّر تحميل المحتوى: ${res.error.message}`);
        setLoading(false);
        return;
      }
      const overrides: Record<string, string> = {};
      for (const r of res.data ?? []) overrides[r.key] = r.value ?? '';
      const initial: Record<string, string> = {};
      for (const e of entries) {
        initial[e.key] = overrides[e.key] ?? (en as any)[e.key] ?? '';
        if (e.hasAr) initial[`${e.key}__ar`] = overrides[`${e.key}__ar`] ?? (ar as any)[e.key] ?? '';
        initial[`${e.key}__size`] = overrides[`${e.key}__size`] ?? '';
      }
      setValues(initial);
      setPhilImage(overrides['philosophy_image'] ?? '');
      try {
        const lines = JSON.parse(overrides['footer_extra_lines'] ?? '[]');
        setExtraLines(Array.isArray(lines) ? lines : []);
      } catch {
        setExtraLines([]);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [sb, entries]);

  const set = (k: string, v: string) => setValues((prev) => ({ ...prev, [k]: v }));

  async function save() {
    const rows: { key: string; value: string }[] = Object.entries(values).map(
      ([key, value]) => ({ key, value }),
    );
    rows.push({
      key: 'footer_extra_lines',
      value: JSON.stringify(extraLines.map((l) => l.trim()).filter(Boolean)),
    });
    const res = await sb.from('site_content').upsert(rows, { onConflict: 'key' });
    if (res.error) {
      toast(`خطأ في الحفظ: ${res.error.message}`);
      return;
    }
    toast('تم حفظ النصوص ✓');
  }

  async function uploadPhilosophyImage() {
    if (!philFile) {
      toast('اختر صورة أولًا');
      return;
    }
    try {
      const url = await uploadImage(sb, philFile);
      const res = await sb
        .from('site_content')
        .upsert([{ key: 'philosophy_image', value: url }], { onConflict: 'key' });
      if (res.error) throw res.error;
      setPhilImage(url);
      setPhilFile(null);
      toast('تم حفظ الصورة ✓');
    } catch (e) {
      toast(`خطأ: ${e instanceof Error ? e.message : 'upload'}`);
    }
  }

  async function removePhilosophyImage() {
    const res = await sb
      .from('site_content')
      .upsert([{ key: 'philosophy_image', value: '' }], { onConflict: 'key' });
    if (res.error) {
      toast(`خطأ: ${res.error.message}`);
      return;
    }
    setPhilImage('');
    toast('تمت الإزالة ✓');
  }

  if (loading) return <p className="admin-hint">جارٍ تحميل النصوص…</p>;
  if (error) return <p className="admin-msg err">{error}</p>;

  return (
    <div data-testid="texts-panel">
      <div className="admin-card">
        <h3>صورة فلسفتنا · Philosophy image</h3>
        <p className="admin-hint">
          تظهر مكان ختم الأثر في قسم الفلسفة. إن تركتها فارغة يظهر الختم الافتراضي.
        </p>
        {philImage ? (
          <div className="admin-inline" style={{ marginBottom: '.8rem' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={philImage} alt="" style={{ width: 120, height: 150, objectFit: 'cover' }} />
            <button type="button" className="admin-btn danger" onClick={removePhilosophyImage}>
              إزالة الصورة (رجوع للختم)
            </button>
          </div>
        ) : (
          <p className="admin-hint">لا توجد صورة حالياً.</p>
        )}
        <div className="admin-inline">
          <input
            type="file"
            accept="image/*"
            aria-label="philosophy image file"
            onChange={(e) => setPhilFile(e.target.files?.[0] ?? null)}
          />
          <button type="button" className="admin-btn" onClick={uploadPhilosophyImage}>
            رفع وحفظ الصورة
          </button>
        </div>
      </div>

      {groups.order.map((g) => (
        <div key={g} className="admin-card">
          <h3>{g}</h3>
          {groups.byGroup[g].map((e) => (
            <div key={e.key} className="admin-field">
              <label htmlFor={`f-${e.key}`}>{e.label} · English</label>
              <textarea
                id={`f-${e.key}`}
                data-key={e.key}
                rows={e.multiline ? 3 : 1}
                value={values[e.key] ?? ''}
                onChange={(ev) => set(e.key, ev.target.value)}
              />
              {e.hasAr && (
                <>
                  <span className="admin-ar-label">العربية · Arabic</span>
                  <textarea
                    aria-label={`${e.label} Arabic`}
                    data-key={`${e.key}__ar`}
                    dir="rtl"
                    rows={e.multiline ? 3 : 1}
                    value={values[`${e.key}__ar`] ?? ''}
                    onChange={(ev) => set(`${e.key}__ar`, ev.target.value)}
                  />
                </>
              )}
              <div className="admin-inline" style={{ marginTop: '.35rem' }}>
                <span style={{ fontSize: '.66rem', color: 'var(--ink-faint)' }}>حجم الخط</span>
                <select
                  aria-label={`${e.label} font size`}
                  data-size-key={`${e.key}__size`}
                  value={values[`${e.key}__size`] ?? ''}
                  onChange={(ev) => set(`${e.key}__size`, ev.target.value)}
                  style={{ width: 'auto' }}
                >
                  {SIZES.map((s) => (
                    <option key={s} value={s}>
                      {s === '' ? 'افتراضي' : s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="admin-card">
        <h3>خانات الفوتر الإضافية</h3>
        <p className="admin-hint">أسطر تظهر أسفل الفوتر (سجل تجاري، رقم ضريبي، عنوان…).</p>
        <div data-testid="extra-lines">
          {extraLines.map((line, i) => (
            <div key={i} className="admin-inline" style={{ marginBottom: '.5rem' }}>
              <input
                aria-label={`extra line ${i + 1}`}
                value={line}
                onChange={(e) =>
                  setExtraLines((prev) => prev.map((l, j) => (j === i ? e.target.value : l)))
                }
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="admin-btn danger"
                aria-label={`delete extra line ${i + 1}`}
                onClick={() => setExtraLines((prev) => prev.filter((_, j) => j !== i))}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="admin-btn"
          onClick={() => setExtraLines((prev) => [...prev, ''])}
        >
          + أضف خانة
        </button>
      </div>

      <button type="button" className="admin-btn solid" onClick={save} data-testid="save-texts">
        حفظ النصوص
      </button>
    </div>
  );
}
