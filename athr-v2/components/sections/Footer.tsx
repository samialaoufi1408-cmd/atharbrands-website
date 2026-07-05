import { Seal } from '@/components/brand/Seal';
import { Locale, tHtml, NAV_LABELS } from '@/content/site';
import { Mixed } from '@/lib/Mixed';

const CONNECT = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'hello@athrbrands.sa', href: 'mailto:hello@athrbrands.sa' },
];

const DISALLOWED_TAGS = /<(?!\/?(em|br|span)\b)[^>]*>/gi;

function parseExtraLines(raw: string | undefined): string[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr)
      ? arr
          .filter((l) => typeof l === 'string' && l.trim())
          .map((l: string) => l.replace(DISALLOWED_TAGS, ''))
      : [];
  } catch {
    return [];
  }
}

export function Footer({ locale, ov }: { locale: Locale; ov?: Record<string, string> }) {
  const html = (k: any) => tHtml(locale, k, ov);
  const ar = locale === 'ar';
  const nav = NAV_LABELS[locale];
  const extraLines = parseExtraLines(ov?.footer_extra_lines);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="seal-sm">
              <Seal variant="full" idSuffix="footer" />
            </div>
            <div className="brand" style={{ marginBottom: '1.4rem' }}>
              <span className="lockup">
                <span className="ar-mark">أثر</span>
                <span className="bar" />
                <span className="en-mark">ATHR</span>
              </span>
            </div>
            <p dangerouslySetInnerHTML={html('foot_desc')} />
            <p
              className="freelance-permit"
              style={{
                marginTop: '1rem',
                fontSize: '.78rem',
                color: 'var(--ink-faint)',
                lineHeight: 1.8,
              }}
              dangerouslySetInnerHTML={html('foot_permit')}
            />
            {extraLines.map((line, i) => (
              <p
                key={i}
                className="freelance-permit"
                style={{
                  marginTop: '.6rem',
                  fontSize: '.78rem',
                  color: 'var(--ink-faint)',
                  lineHeight: 1.8,
                }}
                dangerouslySetInnerHTML={{ __html: line }}
              />
            ))}
          </div>
          <div className="foot-col">
            <Mixed as="h4" text={ar ? 'التنقّل' : 'Navigate'} />
            <ul>
              <li><a href="#philosophy">{nav.philosophy}</a></li>
              <li><a href="#services">{nav.services}</a></li>
              <li><a href="#work">{nav.work}</a></li>
              <li><a href="#journal">{nav.journal}</a></li>
              <li><a href="#contact">{nav.contact}</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <Mixed as="h4" text={ar ? 'تواصل' : 'Connect'} />
            <ul>
              {CONNECT.map((c) => (
                <li key={c.label}>
                  <a href={c.href}>{c.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <small dangerouslySetInnerHTML={html('foot_copy')} />
          <span className="ar" dangerouslySetInnerHTML={html('foot_ar')} />
          <small dangerouslySetInnerHTML={html('foot_en')} />
        </div>
      </div>
    </footer>
  );
}
