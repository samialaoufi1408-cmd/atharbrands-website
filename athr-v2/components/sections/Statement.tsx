import { Reveal } from '@/components/fx/Reveal';
import { Locale, t } from '@/content/site';

export function Statement({ locale, ov }: { locale: Locale; ov?: Record<string, string> }) {
  const html = (k: any) => ({ __html: t(locale, k, ov) });
  return (
    <section className="statement">
      <div className="container">
        <Reveal className="rule-center" />
        <Reveal
          as="p"
          delay={1}
          className="statement-quote"
          dangerouslySetInnerHTML={html('stmt_quote')}
        />
        <Reveal
          as="p"
          delay={2}
          className="statement-ar"
          dangerouslySetInnerHTML={html('stmt_ar')}
        />
      </div>
    </section>
  );
}
