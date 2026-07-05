'use client';
import { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { getBrowserClient } from '@/lib/supabase-browser';

interface EnquiryRow {
  id: string;
  created_at: string;
  name: string;
  email: string;
  organisation: string | null;
  vision: string;
  locale: string;
}

export function EnquiriesPanel({
  toast,
  session,
}: {
  toast: (m: string) => void;
  session: Session;
}) {
  const sb = getBrowserClient()!;
  const [rows, setRows] = useState<EnquiryRow[]>([]);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const res = await sb
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (res.error) {
      setMsg(`تعذّر تحميل الرسائل: ${res.error.message}`);
      return;
    }
    setRows((res.data as EnquiryRow[]) ?? []);
  }, [sb]);

  useEffect(() => {
    load();
  }, [load]);

  async function revalidateSite() {
    try {
      const res = await fetch('/api/revalidate', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast('تم تحديث الموقع ✓ — التعديلات ظاهرة الآن');
    } catch (e) {
      toast(`تعذّر التحديث: ${e instanceof Error ? e.message : 'network'}`);
    }
  }

  return (
    <div data-testid="enquiries-panel">
      <div className="admin-card">
        <h3>تحديث الموقع</h3>
        <p className="admin-hint">
          تعديلات المحتوى تظهر تلقائياً خلال ٥ دقائق. هذا الزر يجعلها تظهر فوراً.
        </p>
        <button type="button" className="admin-btn" onClick={revalidateSite}>
          تحديث الموقع الآن
        </button>
      </div>

      <div className="admin-card">
        <h3>رسائل التواصل</h3>
        {msg && <p className="admin-msg err">{msg}</p>}
        {!msg && rows.length === 0 && <p className="admin-hint">لا توجد رسائل بعد.</p>}
        {rows.map((r) => (
          <div key={r.id} className="admin-row" data-testid={`enquiry-${r.id}`}>
            <div className="meta">
              <b>
                {r.name} — <span dir="ltr">{r.email}</span>
              </b>
              <small>
                {r.organisation ? `${r.organisation} · ` : ''}
                {new Date(r.created_at).toLocaleString(r.locale === 'ar' ? 'ar-SA' : 'en-GB')}
                {' · '}
                {r.locale}
              </small>
              <p style={{ marginTop: '.4rem', color: 'var(--ink-soft)', fontSize: '.9rem' }}>
                {r.vision}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
