import { describe, it, expect } from 'vitest';
import { wrapArabic } from '../lib/arabic';
import { tHtml } from '../content/site';

describe('Arabic glyph-joining protection (.ar-run wrapping)', () => {
  it('wraps a contiguous Arabic run — including inner spaces — in one span', () => {
    expect(wrapArabic('ختم الأثر')).toBe('<span class="ar-run">ختم الأثر</span>');
  });

  it('wraps only the Arabic part of a bilingual string', () => {
    expect(wrapArabic('The Seal of Impact · ختم الأثر')).toBe(
      'The Seal of Impact · <span class="ar-run">ختم الأثر</span>',
    );
  });

  it('leaves pure Latin strings untouched', () => {
    expect(wrapArabic('Send Enquiry')).toBe('Send Enquiry');
  });

  it('skips HTML tags and processes only text segments', () => {
    const input = 'أثرٌ هو — <em>القيمة</em> التي نصنعها';
    const out = wrapArabic(input);
    expect(out).toContain('<em><span class="ar-run">القيمة</span></em>');
    // tag markup itself untouched
    expect(out).toContain('<em>');
    expect(out).toContain('</em>');
  });

  it('does not change the visible text content', () => {
    const raw = 'Name · الاسم';
    const div = document.createElement('div');
    div.innerHTML = wrapArabic(raw);
    expect(div.textContent).toBe(raw);
  });

  it('tHtml wraps Arabic in EN-locale dictionary values (the mixed-content case)', () => {
    const { __html } = tHtml('en', 'hero_eyebrow');
    expect(__html).toContain('<span class="ar-run">ختم الأثر</span>');
    expect(__html).toContain('The Seal of Impact');
  });

  it('tHtml wraps AR-locale values too, so tracked containers are safe in both modes', () => {
    const { __html } = tHtml('ar', 'hero_eyebrow');
    expect(__html).toContain('ar-run');
  });
});
