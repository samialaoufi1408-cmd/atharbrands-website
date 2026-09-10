import Image from 'next/image';
import type { Locale } from '@/content/site';
import { CONTACT_PHONE } from '@/lib/contact';
import styles from './StudioLoyalty.module.css';

const COPY = {
  ar: {
    eyebrow: 'تصميم وتجهيز بطاقات الولاء',
    title: 'خلّ عميلك',
    accent: 'يرجع لك.',
    body: 'نصمّم بطاقات ولاء رقمية بهوية مشروعك، ونجهّزها بآلية نقاط ومكافآت تناسب نشاطك. تجربة تمتد مع عميلك بعد الزيارة الأولى.',
    features: [
      { title: 'تصميم بهويتك', body: 'شعارك وألوانك في بطاقة تعبّر عن مشروعك.' },
      { title: 'نقاط ومكافآت', body: 'آلية ولاء واضحة نرتّبها معك بحسب طبيعة نشاطك.' },
      { title: 'تجهيز وتسليم', body: 'نجهّز تفاصيل البطاقة ونوضّح لك طريقة استخدامها.' },
    ],
    cta: 'اطلب بطاقتك عبر واتساب',
    enquiry: 'أرسل تفاصيل مشروعك',
    message: 'السلام عليكم، أرغب في تصميم وتجهيز بطاقات ولاء رقمية لمشروعي مع أثر. أود معرفة التفاصيل وعرض السعر.',
    imageAlt: 'إعلان أثر لتصميم وتجهيز بطاقات الولاء الرقمية: بطاقة بهوية المشروع ونقاط ومكافآت، مع نموذج للبطاقة على الجوال.',
  },
  en: {
    eyebrow: 'Loyalty card design & setup',
    title: 'Give them a reason',
    accent: 'to return.',
    body: 'Digital loyalty cards designed around your brand and prepared with a points and rewards structure that suits your business. An experience that continues beyond the first visit.',
    features: [
      { title: 'Your brand, on every card', body: 'Your logo and colors in a card that feels like your business.' },
      { title: 'Points & rewards', body: 'A clear loyalty structure shaped with you around your business.' },
      { title: 'Setup & handover', body: 'We prepare the card details and explain how to use it.' },
    ],
    cta: 'Request your card on WhatsApp',
    enquiry: 'Send your project details',
    message: 'Hello, I would like ATHR to design and set up digital loyalty cards for my business. Please share the details and a quote.',
    imageAlt: 'ATHR digital loyalty card campaign in Arabic, showing a branded rewards card and a mobile loyalty pass.',
  },
} as const;

export function StudioLoyalty({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const requestUrl = `https://wa.me/${CONTACT_PHONE.replace('+', '')}?text=${encodeURIComponent(c.message)}`;

  return (
    <section id="loyalty" className={styles.section} aria-labelledby="loyalty-title">
      <div className={styles.panel}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{c.eyebrow}</p>
          <h2 id="loyalty-title">{c.title}<span>{c.accent}</span></h2>
          <p className={styles.intro}>{c.body}</p>
          <dl className={styles.features}>
            {c.features.map(feature => (
              <div key={feature.title}>
                <dt>{feature.title}</dt>
                <dd>{feature.body}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.actions}>
            <a className={styles.cta} href={requestUrl} target="_blank" rel="noopener noreferrer" data-cta="loyalty-whatsapp">{c.cta}</a>
            <a className={styles.enquiry} href="#contact">{c.enquiry}</a>
          </div>
        </div>
        <a className={styles.visual} href={requestUrl} target="_blank" rel="noopener noreferrer" aria-label={c.cta}>
          <Image
            src="/assets/services/loyalty-cards.png"
            alt={c.imageAlt}
            width={941}
            height={1672}
            sizes="(max-width: 760px) calc(100vw - 64px), (max-width: 1100px) 36vw, 400px"
            quality={85}
            className={styles.image}
          />
        </a>
      </div>
    </section>
  );
}
