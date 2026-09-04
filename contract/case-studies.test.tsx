import { render, cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import DahshaCase from '../app/[locale]/work/dahsha/page';
import SumraCase from '../app/[locale]/work/sumra/page';

afterEach(cleanup);

describe('Restored case studies', () => {
  it('renders all 22 original DAHSHA pages, a contents index and a real PDF download', () => {
    const { container } = render(<DahshaCase params={{ locale: 'ar' }}/>);
    expect(container.querySelectorAll('figure')).toHaveLength(22);
    expect(container.querySelectorAll('nav[aria-label="أقسام دراسة دهشة"] a')).toHaveLength(22);
    for (let page = 1; page <= 22; page++) {
      const figure = container.querySelector(`#study-page-${page}`)!;
      const img = figure.querySelector('img')!;
      const filename = img.getAttribute('src')!;
      const bytes = readFileSync(path.join(process.cwd(), 'public', filename));
      expect(bytes.subarray(0, 2).toString('hex')).toBe('ffd8');
      expect(bytes.length).toBeGreaterThan(20000);
      expect(img).toHaveAttribute('loading', 'lazy');
      expect(img).toHaveAttribute('width', '1132');
      expect(img).toHaveAttribute('height', '1600');
    }
    expect(container.querySelector('a[download]')).toHaveAttribute('href', '/downloads/dahsha-case-study-ar.pdf');
    expect(readFileSync('public/downloads/dahsha-case-study-ar.pdf').subarray(0, 4).toString()).toBe('%PDF');
    expect(container.querySelector('a[href="/ar#contact"]')).toBeTruthy();
  });

  it('uses restored SUMRA photographs and an enquiry action', () => {
    const { container } = render(<SumraCase params={{ locale: 'en' }}/>);
    const images = [...container.querySelectorAll('figure img')];
    expect(images).toHaveLength(3);
    for (const image of images) {
      const src = new URL(image.getAttribute('src')!, 'https://example.com');
      const originalPath = src.searchParams.get('url') ?? src.pathname;
      expect(originalPath).toMatch(/^\/assets\/sumra\/(full|bags|cups)\.jpg$/);
      expect(statSync(path.join(process.cwd(), 'public', originalPath)).size).toBeGreaterThan(100000);
      expect(image).toHaveAttribute('width');
      expect(image).toHaveAttribute('height');
    }
    expect(container.querySelector('a[href="/en#contact"]')).toBeTruthy();
  });
});
