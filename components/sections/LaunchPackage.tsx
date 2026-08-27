import { Reveal } from '@/components/fx/Reveal';
import { Locale } from '@/content/site';
import { Mixed } from '@/lib/Mixed';

const COPY = {
  ar: {
    eyebrow: 'باقة إطلاق المنتج · Product Launch Package',
    titleLead: 'من منتجٍ واعد إلى',
    titleEm: 'علامة جاهزة للإطلاق',
    lede: 'باقة مركّزة للعلامات السعودية في التمور والقهوة والعسل والمعمول والعطور — تمنح المنتج حضورًا واضحًا ومتّسقًا دون الدخول في مشروع هوية شامل.',
    badge: 'استثمار الإطلاق',
    price: '7,500',
    currency: 'ريال سعودي',
    deposit: '50% عند البدء · 3,750 ريال',
    items: [
      'هوية بصرية مصغّرة',
      'توجّه تغليف لمنتج واحد',
      '6 قوالب لإطلاق العلامة',
      'دليل استخدام مختصر',
    ],
    timing: '10 أيام عمل · جولتا تعديل',
    cta: 'ابدأ عبر واتساب',
    message: 'السلام عليكم، أرغب في باقة أثر لإطلاق المنتج السعودي بسعر 7,500 ريال.',
  },
  en: {
    eyebrow: 'Product Launch Package · باقة إطلاق المنتج',
    titleLead: 'From a promising product to a',
    titleEm: 'launch-ready brand',
    lede: 'A focused package for Saudi dates, coffee, honey, maamoul and fragrance brands — built to give one product a clear, consistent market presence without the scope of a full identity programme.',
    badge: 'Launch investment',
    price: '7,500',
    currency: 'Saudi riyals',
    deposit: '50% to begin · SAR 3,750',
    items: [
      'Focused visual identity',
      'Packaging direction for one product',
      '6 launch-ready social templates',
      'Concise usage guide',
    ],
    timing: '10 working days · Two revision rounds',
    cta: 'Start on WhatsApp',
    message: 'Hello, I am interested in the ATHR Saudi Product Launch Package for SAR 7,500.',
  },
} as const;

export function LaunchPackage({ locale }: { locale: Locale }) {
  const copy = COPY[locale];
  const whatsapp = `https://wa.me/966599444486?text=${encodeURIComponent(copy.message)}`;

  return (
    <section className="launch-package" id="launch-package" data-screen-label="Launch Package">
      <div className="container launch-package-shell">
        <div className="launch-package-copy">
          <Reveal as="span" className="eyebrow">
            <Mixed text={copy.eyebrow} />
          </Reveal>
          <Reveal as="h2" delay={1}>
            <Mixed text={copy.titleLead} /> <em><Mixed text={copy.titleEm} /></em>
          </Reveal>
          <Reveal as="p" delay={2} className="lede">
            <Mixed text={copy.lede} />
          </Reveal>
        </div>

        <Reveal delay={2} className="launch-card">
          <Mixed as="span" className="package-badge" text={copy.badge} />
          <div className="package-price">
            <strong>{copy.price}</strong>
            <Mixed as="span" text={copy.currency} />
          </div>
          <Mixed as="p" className="package-deposit" text={copy.deposit} />
          <ul className="package-list">
            {copy.items.map((item) => (
              <li key={item}><Mixed text={item} /></li>
            ))}
          </ul>
          <Mixed as="p" className="package-timing" text={copy.timing} />
          <a href={whatsapp} className="btn package-cta" target="_blank" rel="noreferrer">
            <span className="dot" />
            <span className="txt"><Mixed text={copy.cta} /></span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
