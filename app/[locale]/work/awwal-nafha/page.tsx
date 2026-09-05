import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/content/site';
import { Seal } from '@/components/brand/Seal';
import { NaysarMark } from '@/components/brand/NaysarMark';
import { ProjectContact } from '@/components/sections/ProjectContact';
import { caseMetadata } from '@/lib/case-metadata';
import styles from './fragrance.module.css';

type Props = { params: { locale: Locale } };

const COPY = {
  ar: {
    back: 'العودة إلى الأعمال', concept: 'مشروع تصوري من أثر', sector: 'عطور معاصرة · هوية وتغليف وتجربة رقمية',
    name: 'أوّل نفحة', tagline: 'حضورٌ يُحَسّ.', intro: 'من أول نظرة إلى لحظة فتح العبوة؛ لغة واحدة تمنح العطر شخصيته.',
    scope: ['الاستراتيجية والتسمية', 'الهوية البصرية', 'التغليف', 'المتجر والمحتوى'],
    heroAlt: 'مجموعة أول نفحة: ثلاث زجاجات عطر شفافة بأغطية فضية وعبوات بلون عنابي تحمل الاسم وأرقام المجموعة',
    briefLabel: 'التحدي', briefTitle: 'كيف تُرى رائحة لم يجرّبها العميل؟',
    briefBody: 'تصور لعلامة عطور تخاطب من يختار عطره كتعبير شخصي. التحدي هو ترجمة طابع المجموعة إلى إشارات بصرية مفهومة قبل التجربة: اسم واضح، حضور هادئ، وتسلسل يساعد على المقارنة.',
    audienceLabel: 'الجمهور', audience: 'محبو العطور المعاصرة والهدايا المدروسة.',
    positionLabel: 'التموضع', position: 'عطر ذو شخصية، وتجربة اختيار واضحة.',
    approachLabel: 'الاتجاه', approach: 'تفاصيل قليلة، ومواد تحمل الإحساس.',
    identityLabel: 'الفكرة البصرية', identityTitle: 'مسار مفتوح، وحضور ممتد.',
    identityBody: 'قوس بيضاوي غير مغلق يستحضر مسار الرائحة في الهواء. يظهر بارزًا على العبوة، وخطًا رفيعًا في المطبوعات، وعنصرًا ضوئيًا في الصور؛ ليمنح التطبيقات صلة بصرية واضحة.',
    naming: '«أوّل نفحة» يسمّي لحظة اللقاء الأولى بالعطر. معنى مباشر يرتبط بالانطباع الأول، ويمنح الاسم مكانه على العبوة بلغة عربية واضحة وصياغة لاتينية متّسقة.',
    paletteLabel: 'نظام الألوان', paletteNames: ['عنابي', 'وردي هادئ', 'عاجي', 'فضي'],
    packagingLabel: 'تجربة المنتج', packagingTitle: 'العلبة جزء من الانطباع.',
    packagingBody: 'زجاج شفاف، غطاء فضي، وعلبة صلبة ذات ملمس مطفأ. تنتقل تفاصيل الهوية من العبوة الرئيسية إلى مجموعة التجربة وبطاقة العطر، مع إبقاء اسم العلامة ورقم الإصدار واضحين.',
    packagingAlt: 'تصور تغليف أول نفحة: علبة هدايا عنابية مفتوحة، زجاجة عطر، مجموعة عينات وبطاقة عطر',
    collectionLabel: 'تنظيم المجموعة', collectionTitle: 'رقم تتذكره. طابع تختاره.',
    collectionIntro: 'ثلاثة اتجاهات مقترحة توضّح كيف يتسع النظام لإصدارات مختلفة، مع الحفاظ على شكل موحّد للعلامة.',
    collection: [
      { number: '01', name: 'منعش', notes: 'حمضيات · أوراق خضراء', mood: 'بداية خفيفة وواضحة.' },
      { number: '02', name: 'زهري', notes: 'سوسن · مسك', mood: 'نعومة ذات شخصية.' },
      { number: '03', name: 'خشبي', notes: 'أخشاب · عنبر', mood: 'دفء يمتد بهدوء.' },
    ],
    digitalLabel: 'التجربة الرقمية', digitalTitle: 'التفاصيل التي تساعد على الاختيار.',
    digitalBody: 'تصور لصفحة منتج يرتّب ما يحتاجه العميل: صورة واضحة، طابع العطر، النوتات المقترحة وحجم العبوة. وتظهر مجموعة التجربة كمدخل للتعرّف على الإصدارات.',
    storeCaption: 'تصور تصميم صفحة منتج، ضمن دراسة الهوية.', storeNav: ['المجموعة', 'عن أول نفحة', 'مجموعة التجربة'],
    storeKicker: 'الإصدار الثاني', storeTitle: 'نعومة ذات شخصية.', storeBody: 'اتجاه زهري، تلتقي فيه ملامح السوسن والمسك في حضور هادئ.',
    storeDetail: 'زهري · 50 مل', storeLink: 'تعرّف على المجموعة',
    campaignLabel: 'لغة الإطلاق', campaignTitle: 'صورة تحمل الفكرة.',
    campaignBody: 'إضاءة جانبية، لون عنابي، ومسار شفاف يحتضن الزجاجة. يتكرر هذا التكوين عبر صور المنتجات والمحتوى، ليصبح التعرف على العلامة ممكنًا حتى قبل قراءة اسمها.',
    campaignAlt: 'زجاجة أول نفحة 02 على منصة عنابية مع إضاءة جانبية وقوس شفاف وردي',
    campaignLine: 'حضورٌ يُحَسّ.', campaignSub: 'AWWAL NAFHA · 02',
    deliveryLabel: 'مخرجات الدراسة', deliveryTitle: 'نظام يصل إلى نقاط التواصل.',
    deliverables: ['التموضع والتسمية والرسالة', 'الاسم البصري بالعربية والإنجليزية', 'الألوان والعنصر البيضاوي', 'العبوة الرئيسية ومجموعة التجربة', 'تصور صفحة المنتج', 'اتجاه تصوير المنتجات والإطلاق'],
    disclosure: 'مشروع تصوري مستقل من أثر. طُوّرت العلامة والمنتجات والصور لعرض نظام الهوية، ولا تمثل تكليفًا من عميل أو منتجات معروضة للبيع.',
  },
  en: {
    back: 'Back to work', concept: 'An independent ATHR concept', sector: 'Contemporary fragrance · Identity, packaging and digital experience',
    name: 'AWWAL NAFHA', tagline: 'Presence, felt.', intro: 'From the first glance to the unboxing: one visual language gives the fragrance its character.',
    scope: ['Strategy & naming', 'Visual identity', 'Packaging', 'Digital & content'],
    heroAlt: 'AWWAL NAFHA fragrance collection: three clear glass bottles with silver caps and numbered burgundy packaging',
    briefLabel: 'The challenge', briefTitle: 'How do you see a scent you have never tried?',
    briefBody: 'A fragrance concept for people who choose scent as a personal expression. The challenge is to translate the collection into understandable visual cues before a first encounter: a clear name, a quiet presence and a system that makes comparison easier.',
    audienceLabel: 'Audience', audience: 'Contemporary fragrance lovers and thoughtful gift buyers.',
    positionLabel: 'Positioning', position: 'Fragrance with character. A clear way to choose.',
    approachLabel: 'Direction', approach: 'Fewer details. Materials that carry the feeling.',
    identityLabel: 'The visual idea', identityTitle: 'An open path. A lingering presence.',
    identityBody: 'An unfinished ellipse evokes a scent trail in the air. It becomes a blind emboss on the box, a fine line in print and a translucent light element in photography, connecting the applications through one recognizable gesture.',
    naming: 'AWWAL NAFHA means “the first waft” in Arabic: the first encounter with a fragrance. The name connects the identity to that opening impression, with a clear Arabic wordmark and consistent Latin lettering.',
    paletteLabel: 'Color system', paletteNames: ['Burgundy', 'Soft rose', 'Ivory', 'Silver'],
    packagingLabel: 'The product experience', packagingTitle: 'The box is part of the impression.',
    packagingBody: 'Clear glass, a silver cap and a tactile matte presentation box. The identity extends from the full-size bottle to a discovery set and scent card, keeping the brand name and edition number easy to recognize.',
    packagingAlt: 'AWWAL NAFHA packaging concept with an open burgundy gift box, perfume bottle, discovery samples and scent card',
    collectionLabel: 'Collection architecture', collectionTitle: 'A number to remember. A character to choose.',
    collectionIntro: 'Three proposed scent directions show how the system can accommodate distinct editions while keeping one recognizable brand.',
    collection: [
      { number: '01', name: 'Fresh', notes: 'Citrus · Green leaves', mood: 'A light, clear opening.' },
      { number: '02', name: 'Floral', notes: 'Iris · Musk', mood: 'Softness with character.' },
      { number: '03', name: 'Woody', notes: 'Woods · Amber', mood: 'Warmth that unfolds quietly.' },
    ],
    digitalLabel: 'The digital experience', digitalTitle: 'Details that make choosing easier.',
    digitalBody: 'A product-page concept arranges the information a customer needs: clear imagery, fragrance character, proposed notes and bottle size. The discovery set provides an introduction to the collection.',
    storeCaption: 'Product-page design concept, presented as part of the identity study.', storeNav: ['Collection', 'About AWWAL NAFHA', 'Discovery set'],
    storeKicker: 'Edition two', storeTitle: 'Softness with character.', storeBody: 'A proposed floral direction, bringing iris and musk into a quiet, distinctive presence.',
    storeDetail: 'Floral · 50 ml', storeLink: 'Explore the collection',
    campaignLabel: 'The launch language', campaignTitle: 'An image that carries the idea.',
    campaignBody: 'Directional light, a burgundy field and a translucent path around the bottle. The same composition extends across product imagery and content, building visual recognition before the name is read.',
    campaignAlt: 'A AWWAL NAFHA 02 bottle on a burgundy plinth with directional light and a translucent rose arc',
    campaignLine: 'Presence, felt.', campaignSub: 'AWWAL NAFHA · 02',
    deliveryLabel: 'Study deliverables', deliveryTitle: 'A system across touchpoints.',
    deliverables: ['Positioning, naming and message', 'Arabic and Latin wordmarks', 'Color and ellipse motif', 'Presentation box and discovery set', 'Product-page design concept', 'Product and launch art direction'],
    disclosure: 'An independent concept by ATHR. The brand, products and imagery were developed for this identity study. They do not represent a client commission or products offered for sale.',
  },
} as const;

const palette = ['#57272B', '#DDBBB0', '#F5F0E9', '#B6B5B4'];

export function generateMetadata({ params }: Props) {
  return caseMetadata(params.locale, 'awwal-nafha');
}

export default function AwwalNafhaCase({ params }: Props) {
  const { locale } = params;
  const ar = locale === 'ar';
  const c = COPY[locale];
  return (
    <main className={styles.page} dir={ar ? 'rtl' : 'ltr'}>
      <header className={styles.nav}>
        <Link href={`/${locale}`} className={styles.studio} aria-label={ar ? 'أثر — الرئيسية' : 'ATHR — home'}><Seal variant="full" idSuffix="awwal-nafha-nav" /><span>ATHR BRANDS</span></Link>
        <div><Link href={`/${ar ? 'en' : 'ar'}/work/awwal-nafha`} lang={ar ? 'en' : 'ar'}>{ar ? 'EN' : 'العربية'}</Link><Link href={`/${locale}#work`}>{c.back}</Link></div>
      </header>

      <section className={styles.intro} aria-labelledby="awwal-nafha-title">
        <div className={styles.topline}><span>{c.concept}</span><span>{c.sector}</span></div>
        <div className={styles.titleRow}>
          <div><h1 id="awwal-nafha-title" lang={locale}>{c.name}</h1><p className={styles.otherName} lang={ar ? 'en' : 'ar'}>{ar ? 'AWWAL NAFHA' : 'أوّل نفحة'}</p></div>
          <div className={styles.introCopy}><h2>{c.tagline}</h2><p>{c.intro}</p></div>
        </div>
        <ul className={styles.scope}>{c.scope.map(item => <li key={item}>{item}</li>)}</ul>
      </section>

      <figure className={styles.hero}><Image src="/assets/naysar/hero.png?v=names-v2" alt={c.heroAlt} width={1536} height={1024} sizes="100vw" priority /></figure>

      <section className={styles.section} aria-labelledby="awwal-nafha-brief">
        <div className={styles.sectionHeading}><span className={styles.number}>01</span><p>{c.briefLabel}</p><h2 id="awwal-nafha-brief">{c.briefTitle}</h2></div>
        <div className={styles.sectionBody}><p>{c.briefBody}</p><dl className={styles.facts}>
          <div><dt>{c.audienceLabel}</dt><dd>{c.audience}</dd></div><div><dt>{c.positionLabel}</dt><dd>{c.position}</dd></div><div><dt>{c.approachLabel}</dt><dd>{c.approach}</dd></div>
        </dl></div>
      </section>

      <section className={styles.identity} aria-labelledby="awwal-nafha-identity">
        <div className={styles.identityArt} aria-hidden="true"><NaysarMark className={styles.largeMark} /><div><span className={styles.arabicWordmark}>أوّل نفحة</span><span className={styles.wordmark}>AWWAL NAFHA</span></div></div>
        <div className={styles.identityCopy}><span className={styles.number}>02</span><p className={styles.eyebrow}>{c.identityLabel}</p><h2 id="awwal-nafha-identity">{c.identityTitle}</h2><p>{c.identityBody}</p><p>{c.naming}</p></div>
      </section>

      <section className={styles.palette} aria-label={c.paletteLabel}><p>{c.paletteLabel}</p><div>{palette.map((color, i) => <div className={styles.swatch} key={color}><span style={{ backgroundColor: color }} /><p>{c.paletteNames[i]}<small dir="ltr">{color}</small></p></div>)}</div></section>

      <section className={styles.section} id="packaging" aria-labelledby="awwal-nafha-packaging"><div className={styles.sectionHeading}><span className={styles.number}>03</span><p>{c.packagingLabel}</p><h2 id="awwal-nafha-packaging">{c.packagingTitle}</h2></div><div className={styles.sectionBody}><p>{c.packagingBody}</p></div></section>
      <figure className={styles.wideImage}><Image src="/assets/naysar/packaging.png?v=names-v2" alt={c.packagingAlt} width={1536} height={1024} sizes="(max-width: 760px) 100vw, 90vw" /></figure>

      <section className={styles.collection} id="collection" aria-labelledby="awwal-nafha-collection"><p className={styles.eyebrow}>{c.collectionLabel}</p><h2 id="awwal-nafha-collection">{c.collectionTitle}</h2><p className={styles.collectionIntro}>{c.collectionIntro}</p><div className={styles.editions}>{c.collection.map(item => <article key={item.number}><span className={styles.editionNumber}>{item.number}</span><h3>{item.name}</h3><p>{item.notes}</p><span className={styles.editionRule}/><p>{item.mood}</p></article>)}</div></section>

      <section className={styles.digital} aria-labelledby="awwal-nafha-digital"><div className={styles.section}><div className={styles.sectionHeading}><span className={styles.number}>04</span><p>{c.digitalLabel}</p><h2 id="awwal-nafha-digital">{c.digitalTitle}</h2></div><div className={styles.sectionBody}><p>{c.digitalBody}</p></div></div>
        <figure className={styles.storeFigure}><div className={styles.storeFrame}>
          <div className={styles.browserBar} aria-hidden="true"><i/><i/><i/><span>AWWAL NAFHA · COLLECTION</span></div>
          <div className={styles.storeHeader}><span className={styles.storeBrand}>AWWAL NAFHA</span><div>{c.storeNav.map(item => <span key={item}>{item}</span>)}</div></div>
          <div className={styles.storeProduct}><Image src="/assets/naysar/campaign.png?v=names-v2" alt={c.campaignAlt} width={1536} height={1024} sizes="(max-width: 760px) 90vw, 45vw" /><div><span className={styles.eyebrow}>{c.storeKicker}</span><h3>{c.storeTitle}</h3><p>{c.storeBody}</p><p className={styles.storeDetail}>{c.storeDetail}</p><a href="#collection">{c.storeLink}<span aria-hidden="true">↗</span></a></div></div>
        </div><figcaption>{c.storeCaption}</figcaption></figure>
      </section>

      <section className={styles.section} aria-labelledby="awwal-nafha-campaign"><div className={styles.sectionHeading}><span className={styles.number}>05</span><p>{c.campaignLabel}</p><h2 id="awwal-nafha-campaign">{c.campaignTitle}</h2></div><div className={styles.sectionBody}><p>{c.campaignBody}</p></div></section>
      <figure className={styles.campaign}><Image src="/assets/naysar/campaign.png?v=names-v2" alt={c.campaignAlt} width={1536} height={1024} sizes="100vw" /><figcaption><span dir="ltr">{c.campaignSub}</span><p>{c.campaignLine}</p><NaysarMark /></figcaption></figure>

      <section className={styles.deliverables} aria-labelledby="awwal-nafha-deliverables"><div><p className={styles.eyebrow}>{c.deliveryLabel}</p><h2 id="awwal-nafha-deliverables">{c.deliveryTitle}</h2></div><ul>{c.deliverables.map(item => <li key={item}>{item}</li>)}</ul></section>
      <p className={styles.disclosure}>{c.disclosure}</p>
      <ProjectContact locale={locale} project="AWWAL NAFHA" />
    </main>
  );
}
