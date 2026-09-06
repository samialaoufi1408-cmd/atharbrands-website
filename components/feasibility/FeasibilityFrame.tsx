import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import type { Locale } from '@/content/site';
import { Seal } from '@/components/brand/Seal';
import styles from './Feasibility.module.css';

export function FeasibilityFrame({ locale, path, children, theme, project }: { locale: Locale; path: string; children: ReactNode; theme?: { ink: string; paper: string; soft: string }; project?: { slug: string; name: string } }) {
  const ar = locale === 'ar';
  const palette = theme ? { '--ink': theme.ink, '--paper': theme.paper, '--soft': theme.soft, '--line': `${theme.ink}38` } as CSSProperties : undefined;
  return <div className={styles.page} dir={ar ? 'rtl' : 'ltr'} style={palette}>
    <a href="#content" className={styles.skip}>{ar ? 'انتقل إلى المحتوى' : 'Skip to content'}</a>
    <header className={styles.nav}>
      <Link href={`/${locale}`} className={styles.brand} aria-label={ar ? 'أثر — الرئيسية' : 'ATHR — home'}><Seal variant="full" idSuffix="feasibility-nav" /><span>ATHR BRANDS</span></Link>
      <nav className={styles.navLinks} aria-label={ar ? 'التنقل الرئيسي' : 'Main navigation'}>
        <Link href={`/${locale}#services`}>{ar ? 'الخدمات' : 'Services'}</Link>
        <Link href={`/${locale}/services/feasibility#studies`}>{ar ? 'دراسات الأعمال' : 'Project studies'}</Link>
        <Link href={`/${ar ? 'en' : 'ar'}${path}`} lang={ar ? 'en' : 'ar'}>{ar ? 'EN' : 'العربية'}</Link>
      </nav>
    </header>
    <main id="content">{children}</main>
    <footer className={styles.closing}>
      <p className={styles.eyebrow}>{ar ? 'أثر · من دراسة المشروع إلى بناء هويته' : 'ATHR · From business feasibility to brand identity'}</p>
      <h2>{ar ? 'نبدأ بسؤال مشروعك.' : 'Start with your business question.'}</h2>
      <p>{ar ? 'شاركنا النشاط والمرحلة والمدينة والقرار الذي تريد حسمه، لنحدد نطاق الدراسة المناسب.' : 'Tell us your sector, stage, city and the decision you need to make so we can define an appropriate study scope.'}</p>
      <div className={styles.actions}><Link className={`${styles.button} ${styles.buttonFilled}`} href={`/${locale}#contact`}>{ar ? 'ناقش مشروعك معنا' : 'Discuss your project'}</Link><Link className={styles.button} href={project ? `/${locale}/work/${project.slug}` : `/${locale}#work`}>{project ? (ar ? `استراتيجية ${project.name} وهويتها` : `${project.name} strategy and identity`) : (ar ? 'استعرض جميع الأعمال' : 'Explore all work')}</Link></div>
    </footer>
  </div>;
}

export function DataTable({ caption, headers, rows, compactDetails = false }: { caption: string; headers: readonly string[]; rows: readonly (readonly ReactNode[])[]; compactDetails?: boolean }) {
  const compact = compactDetails && headers.length === 3;
  return <div className={`${styles.tableScroll}${compact ? ` ${styles.compactDetails}` : ''}`} role="region" aria-label={caption} tabIndex={0}>
    <table><caption>{caption}</caption><thead><tr>{headers.map(header => <th key={header} scope="col">{header}</th>)}</tr></thead>
      <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th key={cellIndex} scope="row">{cell}{compact && <span className={styles.cellDetails}>{row[2]}</span>}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}
