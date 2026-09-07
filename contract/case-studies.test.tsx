import { render, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import DahshaCase from '../app/[locale]/work/dahsha/page';
import SumraCase from '../app/[locale]/work/sumra/page';

import AevuCase from '../app/[locale]/work/aevu/page';

afterEach(cleanup);

describe('Complete case studies', () => {
  it('publishes the 36-page AEVU guide and editable model with its complete content', () => {
    const { container } = render(<AevuCase params={{ locale: 'ar' }}/>);
    expect(container.querySelectorAll('#study article')).toHaveLength(34);
    expect(container.querySelector('a[download][href="/downloads/AEVU-Strategy-Identity-Feasibility.pdf"]')).toBeTruthy();
    expect(container.querySelector('a[href="/downloads/AEVU-Financial-Model.xlsx"]')).toBeTruthy();
    expect(container.querySelector('a[href="/ar/work/aevu/feasibility"]')).toBeTruthy();
    expect(readFileSync('public/downloads/AEVU-Financial-Model.xlsx').subarray(0, 2).toString()).toBe('PK');
    expect(container.textContent).toContain('إيڤو');
    expect(container.textContent).not.toContain('أول نفحة');
  });

  it('preserves the complete DAHSHA study and its current PDF guide', () => {
    const { container } = render(<DahshaCase params={{ locale: 'ar' }}/>);
    expect(container.querySelectorAll('#study article')).toHaveLength(39);
    const chapterLinks = [...container.querySelectorAll('nav[aria-label="فهرس دراسة دهشة"] ol a')];
    expect(chapterLinks).toHaveLength(9);
    for (const link of chapterLinks) {
      expect(container.querySelector(link.getAttribute('href')!)).toBeTruthy();
    }
    expect(container.querySelector('a[download]')).toHaveAttribute('href', '/downloads/DAHSHA-Strategy-and-Visual-Identity.pdf');
    expect(readFileSync('public/downloads/DAHSHA-Strategy-and-Visual-Identity.pdf').subarray(0, 4).toString()).toBe('%PDF');
    expect(container.querySelector('a[href="/ar#contact"]')).toBeTruthy();
  });

  it('adds the SUMRA feasibility link while retaining the identity study, images, PDF and enquiry', () => {
    const { container } = render(<SumraCase params={{ locale: 'en' }}/>);
    const images = [...container.querySelectorAll('figure img')];
    expect(images.length).toBeGreaterThanOrEqual(4);
    for (const image of images) {
      const src = new URL(image.getAttribute('src')!, 'https://example.com');
      const originalPath = src.searchParams.get('url') ?? src.pathname;
      expect(originalPath).toMatch(/^\/assets\/studies\/sumra\/(full|mark|bags|cups)\.webp$/);
      const bytes = readFileSync(path.join(process.cwd(), 'public', originalPath));
      expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
      expect(image).toHaveAttribute('width');
      expect(image).toHaveAttribute('height');
    }
    expect(container.querySelectorAll('#study article')).toHaveLength(39);
    expect(container.querySelector('a[href="/en/work/sumra/feasibility"]')).toBeTruthy();
    expect(container.querySelector('a[download]')).toHaveAttribute('href', '/downloads/SUMRA-Strategy-and-Visual-Identity.pdf');
    expect(readFileSync('public/downloads/SUMRA-Strategy-and-Visual-Identity.pdf').subarray(0, 4).toString()).toBe('%PDF');
    expect(container.querySelector('a[href="/en#contact"]')).toBeTruthy();
  });
});
