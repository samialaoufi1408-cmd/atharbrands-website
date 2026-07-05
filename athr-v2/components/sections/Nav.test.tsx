import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('EN: five section anchors + Enquire button + AR language switch', () => {
    const { container, getByText } = render(<Nav locale="en" />);
    for (const h of ['#philosophy', '#services', '#work', '#journal', '#contact']) {
      expect(container.querySelector(`a[href="${h}"]`), h).toBeTruthy();
    }
    expect(getByText('Enquire')).toBeTruthy();
    // Language switch points to /ar and shows the Arabic label
    const langLink = container.querySelector('a[href="/ar"]')!;
    expect(langLink.textContent).toBe('العربية');
  });

  it('AR: labels in Arabic + language switch back to /en (EN)', () => {
    const { container, getByText } = render(<Nav locale="ar" />);
    expect(getByText('فلسفتنا')).toBeTruthy();
    expect(getByText('تواصل معنا')).toBeTruthy();
    const langLink = container.querySelector('a[href="/en"]')!;
    expect(langLink.textContent).toBe('EN');
  });

  it('mobile menu: toggle opens/closes and any link click closes it', () => {
    const { container } = render(<Nav locale="en" />);
    const toggle = container.querySelector('.nav-toggle') as HTMLElement;
    fireEvent.click(toggle);
    expect(container.querySelector('.nav-links')!.classList.contains('open')).toBe(true);
    fireEvent.click(container.querySelector('a[href="#services"]')!);
    expect(container.querySelector('.nav-links')!.classList.contains('open')).toBe(false);
  });
});
