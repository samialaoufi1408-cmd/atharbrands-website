'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Seal } from '@/components/brand/Seal';
import { Locale, NAV_LABELS } from '@/content/site';

const LINKS = [
  ['#philosophy', 'philosophy'] as const,
  ['#services', 'services'] as const,
  ['#work', 'work'] as const,
  ['#journal', 'journal'] as const,
  ['#contact', 'contact'] as const,
];

interface NavProps {
  locale: Locale;
}

export function Nav({ locale }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ar = locale === 'ar';
  const labels = NAV_LABELS[locale];

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${open ? 'open' : ''}`}>
      <a className="brand" href="#top" aria-label="ATHR home" onClick={closeMenu}>
        <Seal variant="full" idSuffix="nav" className="brand-seal" />
        <span className="lockup">
          <span className="ar-mark">أثر</span>
          <span className="bar" />
          <span className="en-mark">ATHR</span>
        </span>
      </a>
      <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary">
        {LINKS.map(([href, key]) => (
          <a key={href} href={href} onClick={closeMenu}>
            {labels[key]}
          </a>
        ))}
        <Link
          href={ar ? '/en' : '/ar'}
          className="lang-switch"
          aria-label="Switch language"
          onClick={closeMenu}
        >
          {ar ? 'EN' : 'العربية'}
        </Link>
        <a href="#contact" className="btn nav-cta" onClick={closeMenu}>
          <span className="dot" />
          <span className="txt">{labels.enquire}</span>
        </a>
      </nav>
      <button
        className="nav-toggle"
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}
