#!/usr/bin/env node
/**
 * Extract EN/AR content from legacy/cms-config.js + legacy/ATHAR.html
 * → content/en.json + content/ar.json.
 *
 * The legacy site's cms-config.js declares each editable text with a CSS
 * selector `s` that points at the corresponding element in ATHAR.html.
 * The English default is the innerHTML at that selector; the Arabic default
 * lives on the `ar` field of the entry (falling back to English when omitted,
 * matching legacy behavior).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Load CMS_CONFIG by evaluating the legacy script against a captured `window`.
const cmsSrc = readFileSync(path.join(ROOT, 'legacy/cms-config.js'), 'utf8');
const captured = { CMS_CONFIG: null };
new Function('window', cmsSrc)(captured);
const cfg = captured.CMS_CONFIG;
if (!cfg?.texts) throw new Error('CMS_CONFIG.texts not found in legacy/cms-config.js');

// Parse ATHAR.html and pull each selector's innerHTML as the English default.
const html = readFileSync(path.join(ROOT, 'legacy/ATHAR.html'), 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;

const decodeAmp = (s) => s.replace(/&amp;/g, '&');
const en = {};
const ar = {};
let missing = 0;
for (const t of cfg.texts) {
  const el = doc.querySelector(t.s);
  const enValue = el ? decodeAmp(el.innerHTML.trim()) : '';
  if (!el) {
    missing++;
    console.warn(`  ! no element matched selector for ${t.k}: ${t.s}`);
  }
  en[t.k] = enValue;
  // Legacy behavior: if `ar` is provided, use it. Otherwise fall back to EN.
  ar[t.k] = typeof t.ar === 'string' && t.ar.length > 0 ? t.ar : enValue;
}

const outDir = path.join(ROOT, 'content');
mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, 'en.json'), JSON.stringify(en, null, 2) + '\n');
writeFileSync(path.join(outDir, 'ar.json'), JSON.stringify(ar, null, 2) + '\n');

console.log(
  `extracted ${cfg.texts.length} keys → content/en.json + content/ar.json` +
    (missing ? ` (${missing} selector(s) did not match)` : ''),
);
