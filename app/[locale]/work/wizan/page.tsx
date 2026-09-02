import Link from 'next/link';
import { Seal } from '@/components/brand/Seal';
import styles from './wizan.module.css';

type Props = { params: { locale: 'ar' | 'en' } };

function Mark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 512 512" role="img" aria-label="WIZAN"><path d="M184.15 410.07A170 170 0 1 1 327.85 410.07" fill="none" stroke="currentColor" strokeWidth="34" strokeLinecap="round"/><path d="M208.67 357.51A112 112 0 0 1 208.67 154.49" fill="none" stroke="#91A79D" strokeWidth="34" strokeLinecap="round"/><path d="M303.33 154.49A112 112 0 0 1 208.67 357.51" fill="none" stroke="#DD776A" strokeWidth="34" strokeLinecap="round"/><circle cx="256" cy="256" r="26" fill="currentColor"/><circle cx="365" cy="118" r="14" fill="#6087A0"/></svg>;
}

export default function WizanCase({ params }: Props) {
  const ar = params.locale === 'ar';
  return <main className={styles.page} dir={ar ? 'rtl' : 'ltr'}>
    <header className={styles.nav}><Link href={`/${params.locale}`} className={styles.brand}><Seal variant="full" idSuffix="wizan-case" className={styles.seal}/><span>ATHRBRANDS</span></Link><Link href={`/${params.locale}#work`} className={styles.back}>{ar ? 'العودة إلى الأعمال' : 'Back to work'}</Link></header>

    <section className={styles.hero}>
      <div className={styles.heroCopy}><p>{ar ? 'مشروع تصوري مستقل من ATHRBRANDS' : 'Independent concept project by ATHRBRANDS'}</p><h1>{ar ? 'وِزان' : 'WIZAN'}<small>WIZAN</small></h1><h2>{ar ? 'عافية تُقاس. حياة تتوازن.' : 'Measure wellbeing. Live in balance.'}</h2><div className={styles.meta}>{ar ? 'استراتيجية · تسمية · هوية لفظية وبصرية · نظام رقمي' : 'Strategy · Naming · Verbal & Visual Identity · Digital System'}</div></div>
      <Mark className={styles.heroMark}/>
    </section>

    <section className={styles.intro}><span>01</span><div><p>{ar ? 'عن المشروع' : 'About the project'}</p><h2>{ar ? 'من بيانات متفرقة إلى قرار واحد واضح كل يوم.' : 'From scattered data to one clear decision every day.'}</h2><p>{ar ? 'وِزان منصة عافية وقائية تجمع مؤشرات نمط الحياة المتفرقة، وتفسرها بلغة مفهومة، ثم تقترح خطوة واحدة قابلة للتنفيذ في يوم واقعي.' : 'WIZAN is a preventive wellbeing platform that gathers fragmented lifestyle indicators, interprets them in plain language, then suggests one realistic next step.'}</p></div></section>

    <section className={styles.dark}><div className={styles.sectionHead}><span>02</span><p>{ar ? 'الفكرة المنظمة' : 'Organizing idea'}</p><h2>{ar ? 'الاتزان في حركة' : 'Balance in motion'}</h2><p>{ar ? 'الاتزان ليس رقمًا يُبلغ مرة واحدة، بل إيقاع يومي يمكن قراءته وتحسينه.' : 'Balance is not a number reached once, but a daily rhythm that can be read and improved.'}</p></div><Mark className={styles.bigMark}/><div className={styles.principles}><article><b>{ar?'نفهم':'Understand'}</b><span>{ar?'السياق قبل الرقم':'Context before the number'}</span></article><article><b>{ar?'نوازن':'Balance'}</b><span>{ar?'الأولويات قبل الخطة':'Priorities before the plan'}</span></article><article><b>{ar?'نبني':'Build'}</b><span>{ar?'العادة قبل النتيجة':'Habit before outcome'}</span></article></div></section>

    <section className={styles.identity}><div className={styles.sectionHead}><span>03</span><p>{ar ? 'النظام البصري' : 'Visual identity'}</p><h2>{ar ? 'مؤشر عافية مفتوح، لا دائرة مغلقة تدّعي الكمال.' : 'An open wellbeing indicator, not a closed circle claiming perfection.'}</h2></div><div className={styles.anatomy}><Mark/><div><p>{ar?'المسارات الدائرية غير المكتملة تمثل أبعاد العافية المتغيرة. المركز ثابت لأن الإنسان هو المرجع، والنقطة الحرة تشير إلى الخطوة التالية.':'Open circular paths represent changing dimensions of wellbeing. The center stays fixed because the person is the reference; the free point signals the next step.'}</p><strong>{ar?'الفجوة ليست تفصيلًا جماليًا؛ بل هي المعنى نفسه.':'The gap is not decoration; it is the meaning itself.'}</strong></div></div><div className={styles.palette}><i/><i/><i/><i/><i/></div></section>

    <section className={styles.product}><div className={styles.sectionHead}><span>04</span><p>{ar?'التطبيق الرقمي':'Digital product'}</p><h2>{ar?'القرار أهم من القراءة.':'The decision matters more than the reading.'}</h2></div><div className={styles.phone}><div className={styles.phoneTop}><Mark/><b>WIZAN</b></div><small>{ar?'صباح الخير، نورة':'Good morning, Noura'}</small><strong>78</strong><em>{ar?'مؤشر العافية اليوم':'Today’s wellbeing indicator'}</em><div className={styles.bars}><i/><i/><i/><i/><i/></div><button>{ar?'عرض خطة اليوم':'View today’s plan'}</button></div><div className={styles.report}><b>{ar?'تقرير العافية':'WELLBEING REPORT'}</b><span>WEEK 24</span><h3>{ar?'صورة أسبوعية تساعدك على اختيار الأولوية التالية.':'A weekly view that helps you choose the next priority.'}</h3><div><i/><i/><i/></div></div></section>

    <section className={styles.close}><p>{ar?'هذا المشروع تصوري وليس عملًا منفذًا لعميل حقيقي. الاسم والهوية والادعاءات الصحية تحتاج فحصًا قانونيًا وتنظيميًا قبل أي استخدام تجاري.':'This is a concept project, not commissioned client work. The name, identity and health claims require legal and regulatory review before commercial use.'}</p><Link href={`/${params.locale}#work`}>{ar?'العودة إلى الأعمال':'Back to selected work'}</Link></section>
  </main>;
}
