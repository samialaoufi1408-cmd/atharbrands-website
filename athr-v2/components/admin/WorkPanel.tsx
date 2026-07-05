'use client';
import { useCallback, useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase-browser';
import { uploadImage } from './upload';
import type { WorkRow } from '@/lib/cms';

export function WorkPanel({ toast }: { toast: (m: string) => void }) {
  const sb = getBrowserClient()!;
  const [rows, setRows] = useState<WorkRow[]>([]);
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const load = useCallback(async () => {
    const res = await sb
      .from('work_items')
      .select('*')
      .order('created_at', { ascending: false });
    if (res.error) {
      setMsg(`خطأ في التحميل: ${res.error.message}`);
      return;
    }
    setRows((res.data as WorkRow[]) ?? []);
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
      const res = await sb.from('work_items').insert({
        title,
        title_ar: String(fd.get('title_ar') ?? '').trim(),
        category: String(fd.get('category') ?? '').trim(),
        year: String(fd.get('year') ?? '').trim(),
        image_url,
      });
      if (res.error) throw res.error;
      form.reset();
      setFile(null);
      setMsg('');
      toast('تمت إضافة العمل ✓');
      load();
    } catch (err) {
      setMsg(`خطأ: ${err instanceof Error ? err.message : 'insert'}`);
    }
  }

  async function onDelete(id: string) {
    if (!window.confirm('حذف هذا العمل نهائيًا؟')) return;
    const res = await sb.from('work_items').delete().eq('id', id);
    if (res.error) {
      toast(`خطأ في الحذف: ${res.error.message}`);
      return;
    }
    toast('تم الحذف');
    load();
  }

  return (
    <div data-testid="work-panel">
      <div className="admin-card">
        <h3>إضافة عمل جديد</h3>
        <form onSubmit={onAdd} data-testid="work-form">
          <div className="admin-field">
            <label htmlFor="w-title">العنوان (English) *</label>
            <input id="w-title" name="title" dir="ltr" />
          </div>
          <div className="admin-field">
            <label htmlFor="w-title-ar">العنوان (العربية)</label>
            <input id="w-title-ar" name="title_ar" dir="rtl" />
          </div>
          <div className="admin-field">
            <label htmlFor="w-cat">التصنيف (مثال: Identity · Packaging)</label>
            <input id="w-cat" name="category" dir="ltr" />
          </div>
          <div className="admin-field">
            <label htmlFor="w-year">السنة</label>
            <input id="w-year" name="year" dir="ltr" />
          </div>
          <div className="admin-field">
            <label htmlFor="w-img">الصورة (اختياري)</label>
            <input
              id="w-img"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <button type="submit" className="admin-btn solid">
            إضافة العمل
          </button>
          <div className={`admin-msg ${msg.startsWith('خطأ') || msg === 'العنوان مطلوب' ? 'err' : 'ok'}`}>
            {msg}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h3>الأعمال الحالية</h3>
        {rows.length === 0 ? (
          <p className="admin-hint">لا توجد أعمال مضافة بعد — يعرض الموقع التصميم الافتراضي.</p>
        ) : (
          rows.map((w) => (
            <div key={w.id} className="admin-row" data-testid={`work-row-${w.id}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {w.image_url ? <img src={w.image_url} alt="" /> : <span className="admin-row-ph" />}
              <div className="meta">
                <b>{w.title}</b>
                <small>
                  {w.category ?? ''} · {w.year ?? ''}
                </small>
              </div>
              <button className="admin-btn danger" onClick={() => onDelete(w.id)}>
                حذف
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
