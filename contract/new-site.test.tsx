import { render, act, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  SitePage,
  assertSeal,
} from './contract';
import { htmlAttrs } from '../app/[locale]/layout';

// The contract exercises the fully-composed page. Mocks stand in for
// external boundaries: Supabase reads (fetchCms) and Supabase writes (sendEnquiry).
vi.mock('@/lib/cms', () => ({
  fetchCms: async () => ({ overrides: {}, work: [], journal: [] }),
}));
vi.mock('@/app/actions', () => ({
  sendEnquiry: vi.fn(async () => ({ ok: true })),
}));

import Page from '../app/[locale]/page';
import { sendEnquiry } from '@/app/actions';
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
    vi.clearAllMocks();
  });

  it('EN: sales-ready structure uses real contact details and no placeholder sections', async () => {
    const p = await loadNew('en');
    for (const id of ['approach', 'services', 'work', 'contact']) {
      expect(p.doc.getElementById(id), `#${id} section must exist`).toBeTruthy();
    }
    expect(p.doc.getElementById('journal')).toBeNull();
    expect(p.doc.querySelector('.impact')).toBeNull();
    const body = p.doc.body.textContent ?? '';
    expect(p.doc.getElementById('services')?.tagName).toBe('SECTION');
    expect(p.doc.getElementById('contact')?.querySelector('form')).toBeTruthy();
    expect(body).toContain('Riyadh');
    expect(body).toContain('admin@athrbrands.com');
    expect(body).toContain('+966599444486');
    expect(body).toContain('SUMRA');
    expect(body).toContain('DAHSHA');
    expect(body).not.toContain('Phase one of the new website');
    expect(body).not.toContain('Rimal Atelier');
    expect(p.doc.querySelector('a[href*="wa.me/966599444486"]')).toBeTruthy();
  });

  it('EN: seal has the correct ray counts', async () => {
    const p = await loadNew('en');
    assertSeal(p);
  });

  it('EN: all five projects render with working destinations without DOM injection', async () => {
    const p = await loadNew('en');
    const work = p.doc.getElementById('work')!;
    expect(work.querySelectorAll('article')).toHaveLength(5);
    for (const slug of ['athrbrands', 'naysar', 'wizan', 'sumra', 'dahsha']) {
      expect(work.querySelectorAll(`a[href="/en/work/${slug}"]`)).toHaveLength(2);
    }
    const ids = [...p.doc.querySelectorAll('[id]')].map(element => element.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('EN: contact form shows confirmation and resets', async () => {
    const p = await loadNew('en');
    const form = p.doc.querySelector('form')!;
    const ui = within(form);
    fireEvent.change(ui.getByLabelText('Name'), { target: { value: 'Test enquiry' } });
    fireEvent.change(ui.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(ui.getByLabelText('Business or project name'), { target: { value: 'Test studio' } });
    fireEvent.change(ui.getByLabelText('Service needed'), { target: { value: 'Visual identity' } });
    await act(async () => { fireEvent.submit(form); });
    expect(sendEnquiry).toHaveBeenCalledWith(expect.objectContaining({name: 'Test enquiry', email: 'test@example.com', vision: 'Requested service: Visual identity\n', locale: 'en'}));
    expect(ui.getByText('Your enquiry has been received. We will contact you by email.')).toBeTruthy();
    expect(ui.getByLabelText('Name')).toHaveValue('');
    expect(ui.getByLabelText('Service needed')).toHaveValue('');
  });

  it('AR: page renders in RTL with Arabic accent line', async () => {
    const p = await loadNew('ar');
    expect(p.doc.documentElement.dir).toBe('rtl');
    expect(p.doc.documentElement.lang).toBe('ar');
    expect(p.doc.querySelector('h1')?.textContent).toContain('هويةٌ تُرى.');
    expect(p.doc.querySelector('h1')?.textContent).toContain('أثرٌ يبقى.');
    expect(p.doc.querySelector('#services h2')).toBeTruthy();
    expect(p.doc.querySelector('#approach ol')?.children).toHaveLength(4);
  });
});
