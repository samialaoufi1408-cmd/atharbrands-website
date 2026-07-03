import { Reveal } from '@/components/fx/Reveal';
import { Locale, t } from '@/content/site';

const ROWS = [1, 2, 3, 4, 5] as const;

export function Services({ locale, ov }: { locale: Locale; ov?: Record<string, string> }) {
  const html = (k: any) => ({ __html: t(locale, k, ov) });
  return (
    <section className="services" id="services" data-screen-label="Services">
      <div className="container">
        <div className="sect-head">
          <div>
            <Reveal as="span" className="eyebrow" dangerouslySetInnerHTML={html('svc_eyebrow')} />
            <Reveal
              as="h2"
              delay={1}
              className="title"
              style={{ marginTop: '1.4rem' }}
              dangerouslySetInnerHTML={html('svc_title')}
            />
          </div>
          <Reveal
            as="p"
            delay={2}
            className="meta"
            dangerouslySetInnerHTML={html('svc_meta')}
          />
        </div>
        <div className="svc-list">
          {ROWS.map((n) => (
            <Reveal key={n} className="svc-row">
              <span className="svc-num">{String(n).padStart(2, '0')}</span>
              <div>
                <div
                  className="svc-name"
                  dangerouslySetInnerHTML={html(`svc${n}_name` as any)}
                />
                <div
                  className="svc-ar"
                  dangerouslySetInnerHTML={html(`svc${n}_ar` as any)}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <p className="svc-desc" dangerouslySetInnerHTML={html(`svc${n}_desc` as any)} />
                <span className="arr">{locale === 'ar' ? '←' : '→'}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
