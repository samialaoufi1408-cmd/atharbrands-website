import { expect } from 'vitest';

/**
 * The behavioral contract. Adapters (legacy or new-site) implement SitePage
 * to expose a rendered document plus a way to trigger IntersectionObserver
 * callbacks and advance fake timers/rAF. Every assertion below is content
 * derived from ATHR.html + main.js + cms-config.js and reflects the
 * observable behavior of the current production site.
 */
export interface SitePage {
  doc: Document;
  /** Fire IntersectionObserver callbacks for all observed targets. */
  fireIO(): void | Promise<void>;
  /** Advance fake timers + rAF by `ms` milliseconds. */
  tick(ms: number): Promise<void>;
}

export const SPEC = {
  sections: ['philosophy', 'services', 'work', 'journal', 'contact'] as const,
  navLabelsEn: ['Philosophy', 'Services', 'Work', 'Journal', 'Contact'] as const,
  navLabelsAr: ['فلسفتنا', 'خدماتنا', 'الأعمال', 'المجلة', 'تواصل'] as const,
  services: [
    { en: 'Brand Identity & Systems', ar: 'الهوية البصرية والأنظمة' },
    { en: 'Strategy & Positioning', ar: 'الاستراتيجية والتموضع' },
    { en: 'Naming & Verbal Identity', ar: 'التسمية والهوية اللفظية' },
    { en: 'Spatial & Experience', ar: 'التجربة والمكان' },
    { en: 'Legacy Stewardship', ar: 'رعاية الإرث' },
  ] as const,
  work: ['AURA OUD', 'Rimal Atelier', 'Wathiq Capital', 'Dar Al Qimah'] as const,
  processSteps: [
    { en: 'Listen', ar: 'الإصغاء' },
    { en: 'Distill', ar: 'التقطير' },
    { en: 'Craft', ar: 'الصناعة' },
    { en: 'Endure', ar: 'البقاء' },
  ] as const,
  counters: [14, 90, 12] as const,
  journal: [
    'The Patina of Permanence',
    'Why Luxury Whispers',
    'The Seal as a Promise',
  ] as const,
  sealRays: { outer: 96, inner: 72 } as const,
  tokens: { gold: '#D4AF7A', ivory: '#F2EFE6', charcoal: '#0F1113' } as const,
  lightboxSrc: /aura-featured/,
  hero: { titleEn: /Legacy/i, arAccent: 'إرث في كل أثر' },
  contactStudioMatch: /Riyadh|الرياض/,
  contactDubaiMatch: /Dubai|دبي/,
} as const;

export function assertStructure(p: SitePage): void {
  const d = p.doc;
  for (const id of SPEC.sections) {
    expect(d.getElementById(id), `#${id} section must exist`).toBeTruthy();
  }
  // Five services rendered with both EN + AR labels
  const svcText = d.getElementById('services')!.textContent ?? '';
  for (const s of SPEC.services) {
    expect(svcText, `service EN "${s.en}"`).toContain(s.en);
    expect(svcText, `service AR "${s.ar}"`).toContain(s.ar);
  }
  // Four work cards
  const workText = d.getElementById('work')!.textContent ?? '';
  for (const w of SPEC.work) {
    expect(workText, `work card "${w}"`).toContain(w);
  }
  // Four process steps (bilingual anywhere in body)
  const body = d.body.textContent ?? '';
  for (const st of SPEC.processSteps) {
    expect(body, `process EN "${st.en}"`).toContain(st.en);
    expect(body, `process AR "${st.ar}"`).toContain(st.ar);
  }
  // Three journal articles
  for (const j of SPEC.journal) {
    expect(body, `journal "${j}"`).toContain(j);
  }
  // Contact studio locations
  expect(body).toMatch(SPEC.contactStudioMatch);
  expect(body).toMatch(SPEC.contactDubaiMatch);
}

export function assertSeal(p: SitePage): void {
  const d = p.doc;
  // Full seal renders somewhere on the page (nav / hero / footer)
  const outerRays = d.querySelectorAll('.seal-rays line');
  const innerRays = d.querySelectorAll('.seal-rays-2 line');
  expect(outerRays.length, 'outer rays present').toBeGreaterThan(0);
  expect(innerRays.length, 'inner rays present').toBeGreaterThan(0);
  // Every full seal on the page has the exact ray counts
  expect(outerRays.length % SPEC.sealRays.outer, 'outer count multiple of 96').toBe(0);
  expect(innerRays.length % SPEC.sealRays.inner, 'inner count multiple of 72').toBe(0);
}

export async function assertCounters(p: SitePage): Promise<void> {
  const nums = [...p.doc.querySelectorAll<HTMLElement>('[data-count]')];
  expect(nums.map((n) => Number(n.getAttribute('data-count')))).toEqual([...SPEC.counters]);
  await p.fireIO();
  await p.tick(2000); // ease-out 1600ms + a little slack
  expect(nums.map((n) => Number(n.textContent))).toEqual([...SPEC.counters]);
}

export async function assertLightbox(p: SitePage): Promise<void> {
  const d = p.doc;
  const trigger = d.querySelector<HTMLElement>('[data-lightbox]')!;
  expect(trigger, 'a [data-lightbox] trigger exists').toBeTruthy();
  expect(trigger.getAttribute('data-lightbox')).toMatch(SPEC.lightboxSrc);

  trigger.click();
  await p.tick(0);

  const lb = d.getElementById('lightbox')!;
  expect(lb, '#lightbox present').toBeTruthy();
  expect(lb.classList.contains('open'), 'lightbox is open').toBe(true);
  expect(lb.getAttribute('aria-hidden')).toBe('false');
  expect(d.body.style.overflow, 'body scroll locked').toBe('hidden');

  // Clicking the image itself must NOT close
  const img = d.getElementById('lightbox-img')!;
  img.dispatchEvent(new (d.defaultView as any).MouseEvent('click', { bubbles: true, cancelable: true }));
  await p.tick(0);
  expect(lb.classList.contains('open'), 'still open after image click').toBe(true);

  // Escape closes and restores scroll
  d.dispatchEvent(new (d.defaultView as any).KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  await p.tick(0);
  expect(lb.classList.contains('open'), 'closed after Escape').toBe(false);
  expect(d.body.style.overflow, 'body scroll restored').toBe('');
}

export async function assertContactForm(p: SitePage): Promise<void> {
  const d = p.doc;
  const form = d.querySelector<HTMLFormElement>('form.form, form')!;
  expect(form, 'form exists').toBeTruthy();
  const btnTxt = form.querySelector<HTMLElement>(
    '.btn .txt, button[type="submit"] .txt, button[type="submit"]',
  )!;

  form.dispatchEvent(
    new (d.defaultView as any).Event('submit', { bubbles: true, cancelable: true }),
  );
  await p.tick(50);
  expect(btnTxt.textContent, 'shows sent confirmation').toMatch(/Message Sent|تم الإرسال/);

  await p.tick(3300); // reset after 3.2s
  expect(btnTxt.textContent, 'label restored').toMatch(/Send Enquiry|أرسل/);
}

export function assertArabicMode(p: SitePage): void {
  const d = p.doc;
  expect(d.documentElement.getAttribute('dir')).toBe('rtl');
  expect(d.documentElement.getAttribute('lang')).toMatch(/^ar/);
  expect(d.body.textContent).toContain(SPEC.hero.arAccent);
}
