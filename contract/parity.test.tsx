import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CmsSizeStyles } from '../components/CmsSizeStyles';
import { Philosophy } from '../components/sections/Philosophy';
import { Footer } from '../components/sections/Footer';
import { Work } from '../components/sections/Work';
import { Journal } from '../components/sections/Journal';
import { LightboxProvider } from '../components/fx/Lightbox';
import type { WorkRow, JournalRow } from '../lib/cms';

describe('C2: per-key font-size overrides (key__size)', () => {
  it('emits one style rule per valid override, targeting the legacy selector', () => {
    const { container } = render(
      <CmsSizeStyles
        overrides={{
          hero_sub__size: '1.4rem',
          svc_title__size: '3rem',
          hero_btn: 'not-a-size-key',
        }}
      />,
    );
    const css = container.querySelector('style')!.textContent!;
    expect(css).toContain('.hero-sub{font-size:1.4rem}');
    expect(css).toContain('.services .sect-head .title{font-size:3rem}');
    expect(css).not.toContain('not-a-size-key');
  });

  it('rejects unsafe values and renders nothing without overrides', () => {
    const { container } = render(
      <CmsSizeStyles overrides={{ hero_sub__size: 'url(javascript:x)' }} />,
    );
    expect(container.querySelector('style')).toBeNull();
    const empty = render(<CmsSizeStyles overrides={{}} />);
    expect(empty.container.querySelector('style')).toBeNull();
  });
});

describe('C3: philosophy image override', () => {
  it('default: seal watermark, no background image', () => {
    const { container } = render(<Philosophy locale="en" ov={{}} />);
    expect(container.querySelector('.seal-watermark')).toBeTruthy();
    const frame = container.querySelector<HTMLElement>('.frame')!;
    expect(frame.style.backgroundImage).toBe('');
  });

  it('with philosophy_image: frame background set, watermark hidden', () => {
    const { container } = render(
      <Philosophy locale="en" ov={{ philosophy_image: 'https://x/p.png' }} />,
    );
    expect(container.querySelector('.seal-watermark')).toBeNull();
    const frame = container.querySelector<HTMLElement>('.frame')!;
    expect(frame.style.backgroundImage).toContain('https://x/p.png');
    expect(frame.style.backgroundImage).toContain('linear-gradient');
  });
});

describe('C4: footer extra lines', () => {
  it('renders each line from the JSON array as a freelance-permit paragraph', () => {
    const { container } = render(
      <Footer
        locale="en"
        ov={{ footer_extra_lines: '["سجل تجاري 1010", "VAT 300123"]' }}
      />,
    );
    const permits = [...container.querySelectorAll('.freelance-permit')];
    // 1 default permit + 2 extra lines
    expect(permits.length).toBe(3);
    expect(container.textContent).toContain('سجل تجاري 1010');
    expect(container.textContent).toContain('VAT 300123');
  });

  it('ignores malformed JSON and strips disallowed tags', () => {
    const bad = render(<Footer locale="en" ov={{ footer_extra_lines: 'not-json' }} />);
    expect(bad.container.querySelectorAll('.freelance-permit').length).toBe(1);

    const xss = render(
      <Footer locale="en" ov={{ footer_extra_lines: '["<script>x</script>CR <em>1</em>"]' }} />,
    );
    expect(xss.container.querySelector('script')).toBeNull();
    expect(xss.container.textContent).toContain('CR');
  });
});

describe('C1 follow-through: CMS rows replace grids with the legacy row shape', () => {
  const workRows: WorkRow[] = [
    {
      id: 'w1',
      title: 'Noor Estate',
      title_ar: 'نور العقارية',
      category: 'Identity',
      year: '2026',
      image_url: 'https://x/noor.png',
      created_at: '2026-01-01',
    },
    {
      id: 'w2',
      title: 'Sadu Textiles',
      title_ar: 'سدو',
      category: 'Packaging',
      year: '2026',
      image_url: null,
      created_at: '2026-01-02',
    },
  ];
  const jrnRows: JournalRow[] = [
    {
      id: 'j1',
      title: 'On Gold',
      tag: 'Craft',
      date_label: 'Jun 2026',
      excerpt: 'ex',
      image_url: 'https://x/j.png',
      created_at: '2026-01-01',
    },
  ];

  it('Work: CMS rows replace the 4 defaults; image card is a lightbox trigger, imageless gets mono seal', () => {
    const { container } = render(
      <LightboxProvider>
        <Work locale="en" ov={{}} extra={workRows} />
      </LightboxProvider>,
    );
    expect(container.textContent).toContain('Noor Estate');
    expect(container.textContent).not.toContain('AURA OUD');
    expect(container.querySelectorAll('.work-card').length).toBe(2);
    expect(container.querySelector('[data-lightbox="https://x/noor.png"]')).toBeTruthy();
    // Imageless card: placeholder tag + watermark seal
    expect(container.textContent).toContain('Image · صورة');
  });

  it('Journal: CMS rows replace the 3 defaults; image renders, tag + date shown', () => {
    const { container } = render(<Journal locale="en" ov={{}} extra={jrnRows} />);
    expect(container.textContent).toContain('On Gold');
    expect(container.textContent).not.toContain('Why Luxury Whispers');
    expect(container.querySelector('img[src="https://x/j.png"]')).toBeTruthy();
    expect(container.textContent).toContain('Craft');
    expect(container.textContent).toContain('Jun 2026');
  });
});
