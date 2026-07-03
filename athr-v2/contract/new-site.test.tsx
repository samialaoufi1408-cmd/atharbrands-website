import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  SitePage,
  assertStructure,
  assertSeal,
  assertCounters,
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

async function driveCounters(p: SitePage) {
  // Counters use performance.now + rAF; drive both.
  vi.useFakeTimers();
  const clock = { t: 0 };
  vi.spyOn(performance, 'now').mockImplementation(() => clock.t);
  const rafs: FrameRequestCallback[] = [];
  vi.stubGlobal('requestAnimationFrame', (fn: FrameRequestCallback) => {
    rafs.push(fn);
    return rafs.length;
  });
  await act(async () => {
    p.fireIO();
  });
  for (let step = 0; step <= 1800; step += 16) {
    clock.t = step;
    const pending = rafs.splice(0);
    await act(async () => {
      pending.forEach((fn) => fn(step));
    });
  }
  vi.unstubAllGlobals();
  vi.useRealTimers();
}

describe('Contract on new site — the loop that must be green', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.style.overflow = '';
    (globalThis as any).__IO.instances.length = 0;
  });

  it('EN: structure + all bilingual content', async () => {
    const p = await loadNew('en');
    assertStructure(p);
  });

  it('EN: seal has the correct ray counts', async () => {
    const p = await loadNew('en');
    assertSeal(p);
  });

  it('EN: counters animate to 14 / 90 / 12', async () => {
    const p = await loadNew('en');
    // Fire IO for every observed element so Reveals + Counters start
    const nums = [...p.doc.querySelectorAll<HTMLElement>('[data-count]')];
    expect(nums.map((n) => Number(n.getAttribute('data-count')))).toEqual([14, 90, 12]);
    await driveCounters(p);
    expect(nums.map((n) => Number(n.textContent))).toEqual([14, 90, 12]);
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
