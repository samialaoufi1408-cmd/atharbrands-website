import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  SitePage,
  assertSeal,
  assertLightbox,
  assertContactForm,
  assertArabicMode,
} from './contract';
import { htmlAttrs } from '../app/[locale]/layout';

// The contract exercises the fully-composed page. Mocks stand in for
// external boundaries: Supabase reads (fetchCms) and Supabase writes (sendEnquiry).
vi.mock('@/lib/cms', () => ({
  fetchCms: async () => ({ overrides: {}, work: [], journal: [] }),
}));
vi.mock('@/app/actions', () => ({
  sendEnquiry: async () => ({ ok: true }),
}));

import Page from '../app/[locale]/page';
import { LightboxProvider, LightboxRoot } from '../components/fx/Lightbox';

async function loadNew(locale: 'en' | 'ar'): Promise<SitePage> {
  const a = htmlAttrs(locale);
  document.documentElement.setAttribute('lang', a.lang);
  document.documentElement.setAttribute('dir', a.dir);
  const ui = await Page({ params: { locale } });
  const container = document.body.appendChild(document.createElement('div'));
  render(
    <LightboxProvider>
      {ui}
      <LightboxRoot />
    </LightboxProvider>,
    { container },
  );
  return {
    doc: document,
    fireIO: () => {
      const IO = (globalThis as any).__IO;
      for (const io of IO.instances) {
        io.cb(
          io.targets.map((t: Element) => ({
            target: t,
            isIntersecting: true,
            intersectionRatio: 1,
          })),
          io,
        );
      }
    },
    tick: async (ms: number) => {
      await act(() => vi.advanceTimersByTimeAsync(ms));
    },
  };
}

describe('Contract on new site — the loop that must be green', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.style.overflow = '';
    (globalThis as any).__IO.instances.length = 0;
  });

  it('EN: sales-ready structure uses real contact details and no placeholder sections', async () => {
    const p = await loadNew('en');
    for (const id of ['philosophy', 'services', 'launch-package', 'work', 'contact']) {
      expect(p.doc.getElementById(id), `#${id} section must exist`).toBeTruthy();
    }
    expect(p.doc.getElementById('journal')).toBeNull();
    expect(p.doc.querySelector('.impact')).toBeNull();
    const body = p.doc.body.textContent ?? '';
    expect(body).toContain('7,500');
    expect(body).toContain('Al Qassim');
    expect(body).toContain('admin@atharbrands.com');
    expect(body).toContain('059 944 4486');
    expect(body).toContain('AURA OUD');
    expect(body).not.toContain('Rimal Atelier');
    expect(p.doc.querySelector('a[href*="wa.me/966599444486"]')).toBeTruthy();
  });

  it('EN: seal has the correct ray counts', async () => {
    const p = await loadNew('en');
    assertSeal(p);
  });

  it('EN: lightbox opens/closes with body scroll lock', async () => {
    vi.useFakeTimers();
    const p = await loadNew('en');
    await assertLightbox(p);
    vi.useRealTimers();
  });

  it('EN: contact form shows confirmation and resets', async () => {
    vi.useFakeTimers();
    const p = await loadNew('en');
    await assertContactForm(p);
    vi.useRealTimers();
  });

  it('AR: page renders in RTL with Arabic accent line', async () => {
    const p = await loadNew('ar');
    assertArabicMode(p);
  });
});
