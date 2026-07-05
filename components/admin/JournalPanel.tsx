'use client';
import { useCallback, useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase-browser';
import { uploadImage } from './upload';
import type { JournalRow } from '@/lib/cms';

export function JournalPanel({ toast }: { toast: (m: string) => void }) {
  const sb = getBrowserClient()!;
  const [rows, setRows] = useState<JournalRow[]>([]);
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const load = useCallback(async () => {
    const res = await sb
      .from('journal_items')
      .select('*')
      .order('created_at', { ascending: false });
    if (res.error) {
      setMsg(`خطأ في التحميل: ${res.error.message}`);
      return;
    }
    setRows((res.data as JournalRow[]) ?? []);
  }, [sb]);

  useEffect(() => {
    load();
  }, [load]);

  async function onAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const title = String(fd.get('title') ?? '').trim();
    if (!title) {
      setMsg('العنوان مطلوب');
      return;
    }
    setMsg('جارٍ الإضافة…');
    try {
      let image_url: string | null = null;
      if (file) image_url = await uploadImage(sb, file);
      const res = await sb.from('journal_items').insert({
        title,
        tag: String(fd.get('tag') ?? '').trim(),
        date_label: String(fd.get('date_label') ?? '').trim(),
        excerpt: String(fd.get('excerpt') ?? '').trim(),
        image_url,
      });
      if (res.error) throw res.error;
      form.reset();
      setFile(null);
      setMsg('');
      toast('تمت إضافة المقال ✓');
      load();
    } catch (err) {
      setMsg(`خطأ: ${err instanceof Error ? err.message : 'insert'}`);
    }
  }

  async function onDelete(id: string) {
    if (!window.confirm('حذف هذا المقال نهائيًا؟')) return;
    const res = await sb.from('journal_items').delete().eq('id', id);
    if (res.error) {
      toast(`خطأ في الحذف: ${res.error.message}`);
      return;
    }
    toast('تم الحذف');
    load();
  }

  return (
    <div data-testid="journal-panel">
      <div className="admin-card">
        <h3>إضافة مقال جديد</h3>
        <form onSubmit={onAdd} data-testid="journal-form">
          <div className="admin-field">
            <label htmlFor="j-title">العنوان *</label>
            <input id="j-title" name="title" dir="ltr" />
          </div>
          <div className="admin-field">
            <label htmlFor="j-tag">الوسم (مثال: Craft)</label>
            <input id="j-tag" name="tag" dir="ltr" />
          </div>
          <div className="admin-field">
            <label htmlFor="j-date">التاريخ (مثال: May 2026)</label>
            <input id="j-date" name="date_label" dir="ltr" />
          </div>
          <div className="admin-field">
            <label htmlFor="j-excerpt">المقتطف</label>
            <textarea id="j-excerpt" name="excerpt" rows={2} dir="ltr" />
          </div>
          <div className="admin-field">
            <label htmlFor="j-img">الصورة (اختياري)</label>
            <input
              id="j-img"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <button type="submit" className="admin-btn solid">
            إضافة المقال
          </button>
          <div className={`admin-msg ${msg.startsWith('خطأ') || msg === 'العنوان مطلوب' ? 'err' : 'ok'}`}>
            {msg}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h3>المقالات الحالية</h3>
        {rows.length === 0 ? (
          <p className="admin-hint">لا توجد مقالات مضافة بعد — يعرض الموقع التصميم الافتراضي.</p>
        ) : (
          rows.map((j) => (
            <div key={j.id} className="admin-row" data-testid={`journal-row-${j.id}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {j.image_url ? <img src={j.image_url} alt="" /> : <span className="admin-row-ph" />}
              <div className="meta">
                <b>{j.title}</b>
                <small>
                  {j.tag ?? ''} · {j.date_label ?? ''}
                </small>
              </div>
              <button className="admin-btn danger" onClick={() => onDelete(j.id)}>
                حذف
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
