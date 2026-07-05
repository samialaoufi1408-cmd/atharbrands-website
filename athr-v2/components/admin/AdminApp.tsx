'use client';
import { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { getBrowserClient } from '@/lib/supabase-browser';
import { TextsPanel } from './TextsPanel';
import { WorkPanel } from './WorkPanel';
import { JournalPanel } from './JournalPanel';
import { EnquiriesPanel } from './EnquiriesPanel';

type Tab = 'texts' | 'work' | 'journal' | 'enquiries';

const TABS: { id: Tab; label: string }[] = [
  { id: 'texts', label: 'النصوص' },
  { id: 'work', label: 'الأعمال' },
  { id: 'journal', label: 'المجلة' },
  { id: 'enquiries', label: 'الرسائل' },
];

export function AdminApp() {
  const sb = getBrowserClient();
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<Tab>('texts');
  const [toast, setToast] = useState('');

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2600);
  }, []);

  useEffect(() => {
    if (!sb) {
      setChecking(false);
      return;
    }
    sb.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setChecking(false);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [sb]);

  if (!sb) {
    return (
      <div className="admin-wrap">
        <div className="admin-card">
          <h3>لوحة التحكم غير مهيأة</h3>
          <p className="admin-hint">
            متغيرا البيئة NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY غير موجودين.
          </p>
        </div>
      </div>
    );
  }

  if (checking) {
    return (
      <div className="admin-wrap">
        <p className="admin-hint">جارٍ التحقق من الجلسة…</p>
      </div>
    );
  }

  if (!session) return <LoginForm />;

  return (
    <div className="admin-wrap">
      <div className="admin-head">
        <h1>أثر · لوحة التحكم</h1>
        <button
          className="admin-btn danger"
          onClick={async () => {
            await sb.auth.signOut();
            setSession(null);
          }}
        >
          تسجيل الخروج
        </button>
      </div>
      <div className="admin-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={`admin-tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'texts' && <TextsPanel toast={showToast} />}
      {tab === 'work' && <WorkPanel toast={showToast} />}
      {tab === 'journal' && <JournalPanel toast={showToast} />}
      {tab === 'enquiries' && <EnquiriesPanel toast={showToast} session={session} />}
      <div className={`admin-toast ${toast ? 'show' : ''}`}>{toast}</div>
    </div>
  );
}

function LoginForm() {
  const sb = getBrowserClient()!;
  const [msg, setMsg] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setMsg('جارٍ الدخول…');
    const { error } = await sb.auth.signInWithPassword({
      email: String(fd.get('email') ?? '').trim(),
      password: String(fd.get('password') ?? ''),
    });
    // onAuthStateChange in AdminApp flips to the editor on success.
    setMsg(error ? `تعذّر الدخول: ${error.message}` : '');
  }

  return (
    <div className="admin-wrap" style={{ maxWidth: 420 }}>
      <div className="admin-card">
        <h3>الدخول إلى لوحة التحكم</h3>
        <form onSubmit={onSubmit} data-testid="login-form">
          <div className="admin-field">
            <label htmlFor="admin-email">البريد الإلكتروني</label>
            <input id="admin-email" name="email" type="email" required dir="ltr" />
          </div>
          <div className="admin-field">
            <label htmlFor="admin-password">كلمة المرور</label>
            <input id="admin-password" name="password" type="password" required dir="ltr" />
          </div>
          <button type="submit" className="admin-btn solid">
            دخول
          </button>
          <div className={`admin-msg ${msg.startsWith('تعذّر') ? 'err' : 'ok'}`}>{msg}</div>
        </form>
      </div>
    </div>
  );
}
