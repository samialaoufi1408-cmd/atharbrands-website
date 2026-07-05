import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Seal } from './Seal';

describe('Seal', () => {
  it('full: 96 outer + 72 inner rays + finials + core', () => {
    const { container } = render(<Seal variant="full" idSuffix="test" />);
    expect(container.querySelectorAll('.seal-rays line')).toHaveLength(96);
    expect(container.querySelectorAll('.seal-rays-2 line')).toHaveLength(72);
    // Two finial diamond paths (top + bottom)
    expect(container.querySelectorAll('path')).toHaveLength(2);
    // Core: two rings + two crescent notches
    expect(container.querySelectorAll('.seal-core circle')).toHaveLength(2);
    expect(container.querySelectorAll('.seal-core rect')).toHaveLength(2);
  });

  it('mono: no rays, scaled to 0.86', () => {
    const { container } = render(<Seal variant="mono" idSuffix="mono" />);
    expect(container.querySelectorAll('.seal-rays line')).toHaveLength(0);
    expect(container.querySelectorAll('.seal-rays-2 line')).toHaveLength(0);
    // Only the vertical spear line remains outside seal-core
    expect(container.querySelectorAll('line')).toHaveLength(1);
    const g = container.querySelector('g');
    expect(g?.getAttribute('transform')).toContain('0.86');
  });

  it('different idSuffix produces different gradient ids so two seals coexist', () => {
    const a = render(<Seal variant="full" idSuffix="a" />).container.innerHTML;
    const b = render(<Seal variant="full" idSuffix="b" />).container.innerHTML;
    expect(a).toContain('id="sg-a"');
    expect(b).toContain('id="sg-b"');
    expect(a).toContain('url(#sg-a)');
    expect(b).toContain('url(#sg-b)');
  });
});
