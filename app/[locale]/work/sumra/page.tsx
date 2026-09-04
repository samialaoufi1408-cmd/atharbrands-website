import Image from 'next/image';
import { caseMetadata } from '@/lib/case-metadata';
import { ProjectContact } from '@/components/sections/ProjectContact';
import type { Locale } from '@/content/site';
import Link from 'next/link';
import { Seal } from '@/components/brand/Seal';
import styles from './sumra.module.css';
import galleryStyles from './sumra-gallery.module.css';

type Props = {
  params: {
    locale: 'ar' | 'en';
  };
};

function SumraMark() {
  return (
    <div className={styles.mark} aria-label="SUMRA">
      <i />
      <i />
      <i />
    </div>
  );
}

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  return caseMetadata(params.locale, 'sumra');
}

export default function SumraCase({ params }: Props) {
  const ar = params.locale === 'ar';

  return (
    <main className={styles.page} dir={ar ? 'rtl' : 'ltr'}>
      <header className={styles.nav}>
        <Link href={`/${params.locale}`} className={styles.brand}>
          <Seal variant="full" idSuffix="sumra-case" />
          <span>ATHR BRANDS</span>
        </Link>
        <Link href={`/${params.locale}#work`}>
          {ar ? 'العودة إلى الأعمال' : 'Back to work'}
        </Link>
      </header>

      <section className={styles.hero}>
        <div>
          <p>
            {ar
              ? 'مشروع تصوري من ATHR BRANDS'
              : 'Concept project by ATHR BRANDS'}
          </p>
          <SumraMark />
          <h1>
            {ar ? 'سُمرة' : 'SUMRA'}
            <small>SUMRA</small>
          </h1>
          <h2>
            {ar ? 'كل حبة لها سُمرتها.' : 'Every bean has its own sumra.'}
          </h2>
          <p>
            {ar
              ? 'محمصة ومقهى قهوة مختصة · الرياض'
              : 'Specialty coffee roastery & café · Riyadh'}
          </p>
        </div>
        <div className={styles.roast}>
          <i />
          <i />
          <i />
        </div>
      </section>

      <section className={styles.light}>
        <span>01</span>
        <div>
          <p>{ar ? 'التموضع' : 'Positioning'}</p>
          <h2>
            {ar
              ? 'درجة التحميص بطل القصة.'
              : 'Roast level is the hero of the story.'}
          </h2>
          <p>
            {ar
              ? 'سُمرة محمصة قهوة مختصة ومقهى في الرياض، تحمّص حبوبها بدفعات صغيرة. تأخذ من التراث الدفء لا الرموز، ومن الحرفة الدقة لا البرود. كل حبة لها سُمرتها — ونحن نعرّفك عليها.'
              : 'SUMRA is a Riyadh specialty roastery and café roasting in small batches. It takes warmth—not symbols—from heritage, and precision—not coldness—from craft.'}
          </p>
        </div>
      </section>

      <section className={styles.dark}>
        <div>
          <span>02</span>
          <p>{ar ? 'الركائز' : 'Brand pillars'}</p>
          <h2>
            {ar
              ? 'مصدر واضح. تحميص مدروس. ضيافة لا خدمة.'
              : 'Clear origin. Considered roast. Hospitality, not service.'}
          </h2>
        </div>
        <div className={styles.cards}>
          <article>
            <b>01</b>
            <h3>{ar ? 'مصدر واضح' : 'Clear origin'}</h3>
            <p>
              {ar
                ? 'اسم المزرعة والمنطقة والارتفاع على كل كيس. لا خلطة سرية.'
                : 'Farm, region and altitude on every bag. No secret blend.'}
            </p>
          </article>
          <article>
            <b>02</b>
            <h3>{ar ? 'تحميص مدروس' : 'Considered roast'}</h3>
            <p>
              {ar
                ? 'ثلاث درجات فقط، لكل درجة نكهاتها وطريقة التحضير الموصى بها.'
                : 'Three roast levels, each with its flavor profile and recommended brew.'}
            </p>
          </article>
          <article>
            <b>03</b>
            <h3>{ar ? 'ضيافة لا خدمة' : 'Hospitality, not service'}</h3>
            <p>
              {ar
                ? 'الباريستا يرشح ولا يبيع، والكوب الأول يأتي مع تعريف قصير بالحبة.'
                : 'The barista recommends rather than sells; the first cup introduces the bean.'}
            </p>
          </article>
        </div>
      </section>

      <section className={styles.identity}>
        <span>03</span>
        <div>
          <p>{ar ? 'التوجه الإبداعي' : 'Creative direction'}</p>
          <h2>
            {ar
              ? 'التدرّج: من الحبة الفاتحة إلى سُمرتها.'
              : 'The gradient: from light bean to its sumra.'}
          </h2>
          <p>
            {ar
              ? 'ثلاثة أقواس متدرجة على قاعدة واحدة: درجات التحميص، مدخل المقهى، والشمس التي تُسمّر. النظام يتجنب رموز التراث المباشرة، ويحتفظ بالدفء عبر اللون والخامة والإيقاع.'
              : 'Three graduated arches on one base: roast levels, the café entrance and the sun that deepens color. Heritage is expressed through warmth, material and rhythm rather than literal symbols.'}
          </p>
        </div>
        <div className={styles.logoStage}>
          <SumraMark />
          <strong>{ar ? 'سُمرة' : 'SUMRA'}</strong>
          <small>SUMRA</small>
        </div>
      </section>

      <section className={styles.palette}>
        <div>
          <span>04</span>
          <p>{ar ? 'النظام البصري' : 'Visual system'}</p>
          <h2>
            {ar ? 'خمس درجات ولون تمييز واحد.' : 'Five tones and one accent.'}
          </h2>
        </div>
        <div className={styles.colors}>
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <p>
          {ar
            ? 'كريمي، تحميص فاتح، متوسط، غامق، إسبرسو، وزعفران للإشارات الصغيرة فقط.'
            : 'Cream, light roast, medium roast, dark roast, espresso and saffron for small accents only.'}
        </p>
      </section>

      <section className={styles.pack}>
        <div>
          <span>05</span>
          <p>{ar ? 'التطبيق' : 'Applications'}</p>
          <h2>
            {ar
              ? 'المنتج يشرح النظام بنفسه.'
              : 'The product explains the system.'}
          </h2>
          <p className={galleryStyles.packIntro}>
            {ar
              ? 'تنتقل درجات التحميص من النظام البصري إلى أكياس القهوة والأكواب، فتظهر الفروق بوضوح من دون إضافة عناصر زخرفية جديدة.'
              : 'Roast levels move directly from the visual system to coffee bags and cups, making each difference clear without adding decorative elements.'}
          </p>
        </div>

        <div className={galleryStyles.gallery}>
          <figure className={galleryStyles.galleryMain}>
            <Image
              src="/assets/sumra/full.jpg"
              width={1536} height={1024} sizes="(max-width: 760px) 100vw, 84vw"
              alt={
                ar
                  ? 'أكياس وأكواب سُمرة بتطبيق الهوية البصرية'
                  : 'SUMRA coffee bags and cups with the visual identity applied'
              }
              loading="lazy"
              decoding="async"
            />
          </figure>

          <figure className={galleryStyles.galleryTall}>
            <Image
              src="/assets/sumra/bags.jpg"
              width={1122} height={1402} sizes="(max-width: 760px) 100vw, 42vw"
              alt={
                ar
                  ? 'أكياس قهوة سُمرة للتحميص الفاتح والغامق'
                  : 'SUMRA light and dark roast coffee bags'
              }
              loading="lazy"
              decoding="async"
            />
          </figure>

          <figure className={galleryStyles.galleryWide}>
            <Image
              src="/assets/sumra/cups.jpg"
              width={1536} height={1024} sizes="(max-width: 760px) 100vw, 42vw"
              alt={
                ar
                  ? 'أكواب قهوة سُمرة باللونين الكريمي والبني'
                  : 'SUMRA coffee cups in cream and brown'
              }
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      <section className={styles.close}>
        <p>
          {ar
            ? 'مشروع تصوري لعلامة خيالية أُعد لعرض منهجية ATHR BRANDS. جميع الأسماء والبيانات في التطبيقات افتراضية.'
            : 'A concept brand created to demonstrate the ATHR BRANDS methodology. Application names and data are fictional.'}
        </p>
        <Link href={`/${params.locale}#work`}>
          {ar ? 'العودة إلى الأعمال' : 'Back to selected work'}
        </Link>
      </section>
    <ProjectContact locale={params.locale} project="SUMRA" />
    </main>
  );
}
