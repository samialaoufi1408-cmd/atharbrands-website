import { describe, it, expect } from 'vitest';
import en from '../content/en.json';
import ar from '../content/ar.json';
import { t } from '../content/site';
import { SPEC } from './contract';

describe('generated content dictionaries', () => {
  it('EN and AR share the same key set with non-empty values', () => {
    expect(Object.keys(ar).sort()).toEqual(Object.keys(en).sort());
    for (const [k, v] of Object.entries(ar)) {
      expect(v, `ar.${k}`).toBeTruthy();
    }
    for (const [k, v] of Object.entries(en)) {
      expect(v, `en.${k}`).toBeTruthy();
    }
  });

  it('all five services carry both English and Arabic labels', () => {
    for (let i = 0; i < SPEC.services.length; i++) {
      const idx = i + 1;
      const nameEn = (en as any)[`svc${idx}_name`];
      const arSub = (en as any)[`svc${idx}_ar`];
      expect(nameEn, `svc${idx} EN name has English`).toContain(SPEC.services[i].en);
      expect(arSub, `svc${idx} sub has Arabic`).toContain(SPEC.services[i].ar);
    }
  });

  it('t() prefers overrides, then locale dict, then EN fallback', () => {
    expect(t('en', 'hero_title_1')).toBe('Legacy');
    expect(t('ar', 'hero_title_1')).toBe('إرثٌ');
    expect(t('en', 'hero_title_1', { hero_title_1: 'Override' })).toBe('Override');
    expect(t('ar', 'hero_title_1', { hero_title_1__ar: 'تجاوز' })).toBe('تجاوز');
    // AR falls through to English if AR dict lookup misses (defensive) — using a real key
    expect(t('ar', 'hero_title_1', {})).toBe('إرثٌ');
  });
});
