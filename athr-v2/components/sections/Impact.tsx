import { Reveal } from '@/components/fx/Reveal';
import { Counter } from '@/components/fx/Counter';
import { Locale, t } from '@/content/site';

const ITEMS = [
  { target: 14, suffix: '' as const, lblKey: 'imp1_lbl', arKey: 'imp1_ar' },
  { target: 90, suffix: '+' as const, lblKey: 'imp2_lbl', arKey: 'imp2_ar' },
  { target: 12, suffix: '' as const, lblKey: 'imp3_lbl', arKey: 'imp3_ar' },
] as const;

export function Impact({ locale, ov }: { locale: Locale; ov?: Record<string, string> }) {
  const html = (k: any) => ({ __html: t(locale, k, ov) });
  return (
    <section className="impact" data-screen-label="Impact">
      <div className="container impact-grid">
        {ITEMS.map((it, i) => (
          <Reveal
            key={it.target}
            className="impact-item"
            delay={(i as 0 | 1 | 2)}
          >
            <div className="num">
              <Counter target={it.target} suffix={it.suffix} />
            </div>
            <div className="lbl" dangerouslySetInnerHTML={html(it.lblKey as any)} />
            <div className="ar" dangerouslySetInnerHTML={html(it.arKey as any)} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
