import { Reveal } from '@/components/fx/Reveal';
import { ProcessIcon, type ProcessName } from '@/components/brand/ProcessIcon';
import { Locale, t } from '@/content/site';

const STEPS: { icon: ProcessName; n: string }[] = [
  { icon: 'listen', n: '01' },
  { icon: 'distill', n: '02' },
  { icon: 'craft', n: '03' },
  { icon: 'endure', n: '04' },
];

export function Process({ locale, ov }: { locale: Locale; ov?: Record<string, string> }) {
  const html = (k: any) => ({ __html: t(locale, k, ov) });
  return (
    <section className="process" data-screen-label="Process">
      <div className="container">
        <div className="sect-head">
          <div>
            <Reveal as="span" className="eyebrow" dangerouslySetInnerHTML={html('proc_eyebrow')} />
            <Reveal
              as="h2"
              delay={1}
              className="title"
              style={{ marginTop: '1.4rem' }}
              dangerouslySetInnerHTML={html('proc_title')}
            />
          </div>
          <Reveal
            as="p"
            delay={2}
            className="meta"
            dangerouslySetInnerHTML={html('proc_meta')}
          />
        </div>
        <div className="proc-grid">
          {STEPS.map((s, i) => (
            <Reveal
              key={s.n}
              className="proc-step"
              delay={(i as 0 | 1 | 2 | 3)}
            >
              <div className="num">{s.n}</div>
              <div className="ic">
                <ProcessIcon name={s.icon} />
              </div>
              <h3 dangerouslySetInnerHTML={html(`proc${i + 1}_h` as any)} />
              <div className="ar" dangerouslySetInnerHTML={html(`proc${i + 1}_ar` as any)} />
              <p dangerouslySetInnerHTML={html(`proc${i + 1}_p` as any)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
