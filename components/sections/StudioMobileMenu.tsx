'use client';

import { useRef } from 'react';
import type { Locale } from '@/content/site';
import styles from './StudioHomeV4.module.css';

export function StudioMobileMenu({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const ar = locale === 'ar';
  const links = [
    ['work', ar ? 'الأعمال' : 'Work'],
    ['approach', ar ? 'المنهج' : 'Approach'],
    ['services', ar ? 'الخدمات' : 'Services'],
    ['contact', ar ? 'ابدأ مشروعك' : 'Start a project'],
  ];
  function close() { if (ref.current) ref.current.open = false; }
  return (
    <details ref={ref} className={styles.mobileMenu} onKeyDown={event => {
      if (event.key === 'Escape') { close(); ref.current?.querySelector('summary')?.focus(); }
    }}>
      <summary aria-label={ar ? 'قائمة التنقل' : 'Navigation menu'}><i/><i/></summary>
      <div>{links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={close}>{label}</a>)}</div>
    </details>
  );
}
