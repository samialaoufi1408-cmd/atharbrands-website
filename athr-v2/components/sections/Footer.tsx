import { Seal } from '@/components/brand/Seal';
import { Locale, tHtml, NAV_LABELS } from '@/content/site';
import { Mixed } from '@/lib/Mixed';

const CONNECT = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Behance', href: '#' },
  { label: 'hello@athrbrands.sa', href: 'mailto:hello@athrbrands.sa' },
];

export function Footer({ locale, ov }: { locale: Locale; ov?: Record<string, string> }) {
  const html = (k: any) => tHtml(locale, k, ov);
  const ar = locale === 'ar';
  const nav = NAV_LABELS[locale];
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
