import { readFileSync } from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { describe, it } from 'vitest';
import {
  SitePage,
  assertStructure,
  assertSeal,
  assertCounters,
  assertLightbox,
  assertContactForm,
} from './contract';

const LEGACY = path.resolve(__dirname, '../legacy');

function loadLegacy(): SitePage {
  const html = readFileSync(path.join(LEGACY, 'ATHAR.html'), 'utf8');
  const dom = new JSDOM(html, {
    url: 'https://athrbrands.sa/',
    runScripts: 'outside-only',
    pretendToBeVisual: true,
  });
  const w = dom.window as unknown as typeof globalThis & {
    __fireIO: () => void;
    __advance: (ms: number) => void;
    eval(code: string): void;
  };
  // Inject IO+timer shim first, then run legacy main.js against the DOM.
  w.eval(readFileSync(path.join(__dirname, 'io-shim.js'), 'utf8'));
  w.eval(readFileSync(path.join(LEGACY, 'main.js'), 'utf8'));
  return {
    doc: w.document,
    fireIO: () => w.__fireIO(),
    tick: async (ms: number) => {
      w.__advance(ms);
    },
  };
}

describe('Contract on legacy site — green baseline (spec == reality)', () => {
  it('structure and content', () => {
    assertStructure(loadLegacy());
  });
  it('seal with 96 outer + 72 inner rays', () => {
    assertSeal(loadLegacy());
  });
  it('impact counters 14 / 90 / 12', async () => {
    await assertCounters(loadLegacy());
  });
  it('lightbox: open, body-scroll lock, image-click no-close, Escape closes', async () => {
    await assertLightbox(loadLegacy());
  });
  it('contact form: confirmation then reset after 3.2s', async () => {
    await assertContactForm(loadLegacy());
  });
});
