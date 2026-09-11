import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/content/site';
import { Seal } from '@/components/brand/Seal';
import { StudioContact } from '@/components/sections/StudioContact';
import { CONTACT_PHONE } from '@/lib/contact';
import { SITE_URL } from '@/lib/case-metadata';
import styles from './loyalty.module.css';

const COPY = {
  ar: {
    title: 'تصميم وتجهيز بطاقات الولاء الرقمية',
    description: 'بطاقات ولاء بهوية مشروعك، مع تصميم واضح وآلية نقاط ومكافآت وتجهيز بحسب احتياج نشاطك. اطلب عرضك من أثر براند.',
    home: 'الرئيسية', language: 'EN', label: 'خدمة من أثر براند',
    headline: 'بطاقة بهويتك.', accent: 'وسبب للعودة.',
    intro: 'نصمّم بطاقة ولاء رقمية تعكس مشروعك، ونرتّب معك آلية النقاط والمكافآت وتفاصيل التجهيز. مناسبة للمقاهي والصالونات والمتاجر التي تبني علاقة مستمرة مع عملائها.',
    cta: 'اطلب عرض بطاقتك', whatsapp: 'ناقش فكرتك عبر واتساب',
    message: 'السلام عليكم، أرغب في عرض لتصميم وتجهيز بطاقات ولاء لمشروعي. شاهدت تفاصيل الخدمة على موقع أثر.',
    imageAlt: 'تصميم إعلاني من أثر يعرض بطاقة ولاء بهوية المشروع ونموذجًا للبطاقة على الجوال.',
    scopeTitle: 'ماذا نجهّز لك؟',
    scope: [
      ['تصميم يعكس مشروعك', 'نرتّب شعارك وألوانك وبياناتك في بطاقة واضحة ومتسقة مع هويتك.'],
      ['آلية ولاء مفهومة', 'نحدّد معك طريقة جمع النقاط أو الأختام وشروط المكافأة المناسبة لنشاطك.'],
      ['تجهيز بحسب احتياجك', 'نتفق على منصة التشغيل والمحافظ المدعومة وطريقة الاستخدام قبل بدء التجهيز.'],
      ['تسليم وشرح الاستخدام', 'نسلّم المخرجات المتفق عليها ونوضّح خطوات الاستخدام والتحديث.'],
    ],
    stepsTitle: 'من الفكرة إلى بطاقة جاهزة للاستخدام',
    steps: [
      ['نفهم نشاطك', 'اسم المشروع، عدد الفروع، هويتك الحالية وفكرة المكافأة.'],
      ['نحدّد النطاق', 'التصميم والتجهيز والمدة ورسوم المنصة إن وجدت، في عرض واضح.'],
      ['نصمّم ونراجع', 'نطوّر البطاقة ونراجع معك التصميم وتفاصيل برنامج الولاء.'],
      ['نجهّز ونسلّم', 'نختبر الاستخدام ضمن النطاق المتفق عليه، ثم نسلّم البطاقة وطريقة تشغيلها.'],
    ],
    faqTitle: 'قبل ما تبدأ',
    faq: [
      ['كم سعر الخدمة؟', 'يتحدد السعر بحسب نطاق التصميم، وعدد الفروع، ومنصة التشغيل والتجهيز المطلوب. تحصل على عرض يوضّح المخرجات والمدة والتكلفة قبل البدء.'],
      ['هل فيه اشتراك شهري؟', 'قد تتطلب منصة التشغيل اشتراكًا أو رسوم استخدام. نوضح رسوم التصميم والتجهيز وأي تكاليف تشغيل منفصلة في العرض.'],
      ['هل البطاقة تُضاف إلى محفظة الجوال؟', 'نحدّد المحافظ المدعومة وطريقة إضافة البطاقة وفق المنصة المختارة، ونؤكد المتطلبات قبل التنفيذ.'],
      ['وش تحتاجون مني؟', 'اسم النشاط، الشعار وملفات الهوية المتاحة، عدد الفروع، وفكرة النقاط أو المكافأة إن كانت محددة. نساعدك في ترتيب التفاصيل.'],
      ['هل أقدر أطلب التصميم فقط؟', 'نعم، يمكن تحديد نطاق مستقل للتصميم، أو إضافة التجهيز بحسب احتياجك. يوضّح العرض ملفات التسليم وما يشمله العمل.'],
      ['كم يستغرق التنفيذ؟', 'نحدد المدة بعد مراجعة النطاق والمتطلبات، ويبدأ الجدول المتفق عليه بعد استلام الملفات والاعتمادات اللازمة.'],
    ],
  },
  en: {
    title: 'Digital loyalty card design and setup',
    description: 'Branded digital loyalty cards, a clear points and rewards structure, and setup tailored to your business. Request a quote from ATHR BRANDS.',
    home: 'Home', language: 'العربية', label: 'A service by ATHR BRANDS',
    headline: 'A card that feels like you.', accent: 'A reason to return.',
    intro: 'We design a digital loyalty card around your brand and work with you on points, rewards and setup. For cafés, salons and shops building lasting customer relationships.',
    cta: 'Request a card quote', whatsapp: 'Discuss it on WhatsApp',
    message: 'Hello, I would like a quote for loyalty card design and setup. I viewed the service on the ATHR website.',
    imageAlt: 'ATHR campaign showing a branded loyalty card and a mobile loyalty pass.',
    scopeTitle: 'What we prepare',
    scope: [
      ['A card in your identity', 'Your logo, colors and business details in a clear, consistent card.'],
      ['A clear loyalty structure', 'A points or stamps structure and reward terms suited to your business.'],
      ['Setup for your needs', 'We agree on the operating platform, supported wallets and usage before setup.'],
      ['Handover and guidance', 'The agreed deliverables, with an explanation of how to use and update them.'],
    ],
    stepsTitle: 'From an idea to a card ready to use',
    steps: [
      ['Understand the business', 'Your business, locations, existing brand and reward idea.'],
      ['Agree on scope', 'Design, setup, timing and any platform fees in a clear proposal.'],
      ['Design and review', 'We develop the card and review its design and loyalty details with you.'],
      ['Set up and deliver', 'We test the agreed workflow, then hand over the card and usage guidance.'],
    ],
    faqTitle: 'Before you begin',
    faq: [
      ['How much does it cost?', 'Pricing depends on design scope, locations, platform and setup needs. Your proposal specifies deliverables, timing and cost before work begins.'],
      ['Is there a monthly subscription?', 'The platform may charge a subscription or usage fees. Design, setup and operating costs are explained separately in the proposal.'],
      ['Can customers add it to a mobile wallet?', 'Supported wallets and the add-to-wallet flow depend on the selected platform. We confirm requirements before implementation.'],
      ['What do you need from me?', 'Your business name, logo and available brand files, number of locations and any points or reward idea. We help define the details.'],
      ['Can I request design only?', 'Yes. Design can be scoped separately, with setup added to suit your needs. The proposal lists the deliverables and included work.'],
      ['How long does it take?', 'Timing is agreed after reviewing the scope and requirements. The schedule starts once the necessary files and approvals are received.'],
    ],
  },
} as const;

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale === 'en' ? 'en' : 'ar';
  const c = COPY[locale];
  return {
    title: `${c.title} | ATHR BRANDS`, description: c.description,
    alternates: { canonical: `/${locale}/services/loyalty`, languages: { ar: '/ar/services/loyalty', en: '/en/services/loyalty' } },
    openGraph: { title: c.title, description: c.description, url: `${SITE_URL}/${locale}/services/loyalty`, images: ['/assets/aura-featured.png'] },
  };
}

export default function LoyaltyPage({ params }: { params: { locale: string } }) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale = params.locale as Locale;
  const c = COPY[locale];
  const ar = locale === 'ar';
  const whatsapp = `https://wa.me/${CONTACT_PHONE.replace('+', '')}?text=${encodeURIComponent(c.message)}`;
  return (
    <div className={styles.page} lang={locale} dir={ar ? 'rtl' : 'ltr'}>
      <header className={styles.header}>
        <Link href={`/${locale}`} className={styles.brand} aria-label={ar ? 'أثر براند الرئيسية' : 'ATHR BRANDS home'}><Seal variant="full" idSuffix="loyalty-nav"/><span>ATHR BRANDS</span></Link>
        <nav aria-label={ar ? 'تنقل الخدمة' : 'Service navigation'}><Link href={`/${locale}`}>{c.home}</Link><Link href={`/${ar ? 'en' : 'ar'}/services/loyalty`}>{c.language}</Link></nav>
      </header>
      <main>
        <section className={styles.hero}>
          <div><p className={styles.eyebrow}>{c.label}</p><h1>{c.headline}<span>{c.accent}</span></h1><p className={styles.intro}>{c.intro}</p><div className={styles.actions}><a className={styles.button} href="#contact">{c.cta}</a><a className={styles.textLink} href={whatsapp} target="_blank" rel="noopener noreferrer">{c.whatsapp}</a></div></div>
          <Image className={styles.poster} src="/assets/services/loyalty-cards.png" alt={c.imageAlt} width={941} height={1672} priority sizes="(max-width: 760px) calc(100vw - 48px), 360px"/>
        </section>
        <section className={styles.scope} aria-labelledby="scope-title"><h2 id="scope-title">{c.scopeTitle}</h2><div className={styles.grid}>{c.scope.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>
        <section className={styles.process} aria-labelledby="steps-title"><h2 id="steps-title">{c.stepsTitle}</h2><ol className={styles.steps}>{c.steps.map(([title, body], i) => <li key={title}><span aria-hidden="true">0{i + 1}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></section>
        <section className={styles.faq} aria-labelledby="faq-title"><h2 id="faq-title">{c.faqTitle}</h2>{c.faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
        <StudioContact locale={locale} service="loyalty"/>
      </main>
      <footer className={styles.footer}><span>ATHR BRANDS</span><Link href={`/${locale}`}>{ar ? 'استكشف أعمال أثر وخدماتها' : 'Explore ATHR’s work and services'}</Link></footer>
    </div>
  );
}
