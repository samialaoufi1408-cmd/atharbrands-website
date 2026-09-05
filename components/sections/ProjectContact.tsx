import Link from 'next/link';
import type { Locale } from '@/content/site';
import { whatsappUrl } from '@/lib/contact';
import styles from './StudioSections.module.css';

export function ProjectContact({ locale, project }: { locale: Locale; project: string }) {
  const ar = locale === 'ar';
  return (
    <section className={styles.caseCta} aria-label={ar ? 'ابدأ مشروع هوية' : 'Start an identity project'}>
      <div><h2>{ar ? 'كيف ممكن تظهر علامتك؟' : 'What could your brand become?'}</h2><p>{ar ? 'نبدأ من نشاطك وجمهورك، ونبني اتجاهًا يخص علامتك.' : 'We start with your business and audience to build a direction that is yours.'}</p></div>
      <div className={styles.caseActions}>
        <Link className={styles.button} href={`/${locale}#contact`}>{ar ? 'ابدأ مشروعك' : 'Start your project'}</Link>
        <a className={styles.textLink} href={whatsappUrl(locale, project)} target="_blank" rel="noopener noreferrer" data-cta="project-whatsapp">{ar ? 'ناقشنا عبر واتساب' : 'Discuss it on WhatsApp'}</a>
      </div>
    </section>
  );
}

export function FloatingContact({ locale }: { locale: Locale }) {
  return <a href={whatsappUrl(locale)} className={styles.floatingContact} target="_blank" rel="noopener noreferrer" data-cta="floating-whatsapp" aria-label={locale === 'ar' ? 'تواصل مع أثر عبر واتساب' : 'Contact ATHR on WhatsApp'}>{locale === 'ar' ? 'واتساب' : 'WhatsApp'}</a>;
}
