import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/content/site';
import { FeasibilityFrame, DataTable } from '@/components/feasibility/FeasibilityFrame';
import { feasibilityMetadata } from '@/lib/feasibility-metadata';
import { CASE_SLUGS } from '@/lib/case-metadata';
import { PORTFOLIO_FEASIBILITY } from '@/content/feasibility/studies';
import styles from '@/components/feasibility/Feasibility.module.css';

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  return feasibilityMetadata(params.locale);
}

export default function FeasibilityServicePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  if (locale !== 'ar' && locale !== 'en') notFound();
  const t = (ar: string, en: string) => locale === 'ar' ? ar : en;
  const steps = [
    [t('دراسة الجدوى', 'Business feasibility'), t('هل الفكرة قابلة للتشغيل؟ وما شروط نجاحها واحتياجها النقدي؟', 'Can the idea operate sustainably? What must hold true, and how much cash does it need?')],
    [t('استراتيجية العلامة', 'Brand strategy'), t('لمن نقدم القيمة؟ وكيف نتموضع ونبني عرضًا ووعدًا واضحين؟', 'Who is the offer for, and what positioning and promise can the business deliver?')],
    [t('الهوية البصرية والتطبيقات', 'Visual identity and applications'), t('كيف تظهر الاستراتيجية في الاسم والشعار والألوان والخطوط والتجربة؟', 'How does the strategy become a name, logo, colour system, typography and customer experience?')],
  ];
  return <FeasibilityFrame locale={locale} path="/services/feasibility">
    <section className={styles.hero}>
      <div><p className={styles.eyebrow}>{t('خدمات أثر · دراسة الجدوى', 'ATHR services · Feasibility studies')}</p><h1>{t('من دراسة المشروع إلى بناء هويته.', 'From business feasibility to brand identity.')}</h1>
        <p className={styles.lead}>{t('نربط قرار الاستثمار بوضوح العلامة: ندرس الفكرة والسوق والتشغيل والأرقام، ثم نترجم ما تثبته الدراسة إلى استراتيجية وهوية قابلة للتطبيق.', 'Connect the business decision to a clear brand: examine the idea, market, operations and numbers, then translate supported findings into an actionable strategy and identity.')}</p>
        <div className={styles.actions}><a className={`${styles.button} ${styles.buttonFilled}`} href="#studies">{t('استكشف دراسات الأعمال الثمانية', 'Explore all eight project studies')}</a><Link className={styles.button} href={`/${locale}#contact`}>{t('اطلب تحديد نطاق الدراسة', 'Discuss the study scope')}</Link></div>
      </div>
      <ol className={styles.heroSteps}>{steps.map(([title, body], index) => <li key={title}><span aria-hidden="true">0{index + 1}</span><div><h2>{title}</h2><p>{body}</p></div></li>)}</ol>
    </section>
    <div className={styles.notice}><p>{t('يمكن طلب دراسة الجدوى مستقلة، أو ضمن مسار متكامل مع استراتيجية العلامة والهوية. نحدد قبل التعاقد سؤال الدراسة، والبيانات المتاحة، وعمق البحث، والمخرجات والمدة.', 'Commission feasibility on its own or alongside brand strategy and identity. Before contracting, we agree the decision question, available data, research depth, deliverables and timing.')}</p></div>
    <div className={styles.body}>
      <section className={styles.section} id="scope"><span className={styles.sectionNumber}>01</span><h2>{t('ما الذي تدرسه الخدمة؟', 'What does the service examine?')}</h2>
        <div className={styles.grid}>{[
          [t('السوق والطلب', 'Market and demand'), t('العميل المستهدف، المشكلة، البدائل والمنافسون، منطقة الخدمة وقنوات الوصول. نميّز البيانات المنشورة والمقابلات والملاحظات الميدانية عن الفرضيات التي لم تُختبر.', 'Target customers, their needs, alternatives, competitors, catchment and acquisition channels. Published evidence, interviews and field observations are distinguished from untested hypotheses.')],
          [t('النموذج التجاري والتشغيل', 'Commercial and operating model'), t('المنتجات والخدمات والتسعير، الموقع والطاقة الاستيعابية، الفريق والموردون وتسلسل الخدمة. نحدد المتطلبات القطاعية التي تحتاج تحققًا من الجهة المختصة أو متخصص.', 'Products, services, pricing, location, capacity, team, suppliers and service flow. Identify sector requirements that need confirmation by the relevant authority or specialist.')],
          [t('التكاليف والجدوى المالية', 'Costs and financial feasibility'), t('مصاريف التأسيس والتشغيل، الإيرادات، هامش المساهمة، نقطة التعادل ورأس المال العامل والتدفق النقدي. يُتفق على أفق التوقعات ومعالجة الضريبة والتمويل وفق طبيعة المشروع.', 'Setup and operating costs, revenue, contribution, break-even, working capital and cash flow. The forecast horizon and treatment of tax and financing are agreed for the project.')],
          [t('المخاطر وقرار المضي', 'Risks and the decision to proceed'), t('سيناريو متحفّظ وأساسي ومتفائل، حساسية النتائج للمدخلات المؤثرة، وخطة تحقق وشروط للمضي أو التعديل أو التوقف. النتيجة قد تكون إعادة تصميم الفكرة.', 'Conservative, base and optimistic cases, sensitivity to key inputs, validation work and conditions for proceeding, revising or stopping. The conclusion may be to redesign the idea.')],
        ].map(([title, body]) => <article key={title} className={styles.card}><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>
      <section className={styles.section} id="deliverables"><span className={styles.sectionNumber}>02</span><h2>{t('مخرجات تساعدك على اتخاذ قرار.', 'Deliverables that support a decision.')}</h2>
        <DataTable caption={t('المخرجات المقترحة؛ تُعتمد في نطاق العمل', 'Proposed deliverables, confirmed in the scope of work')} headers={[t('المخرج', 'Deliverable'), t('ما الذي يوضحه؟', 'What it explains')]} rows={[
          [t('ملخص تنفيذي وتوصية مشروطة', 'Executive summary and conditional recommendation'), t('الفرصة، السؤال المحسوم، البدائل، وشروط التنفيذ أو المراجعة.', 'The opportunity, decision, alternatives and conditions for implementation or review.')],
          [t('دراسة السوق والتشغيل', 'Market and operating study'), t('الأدلة والفرضيات، منطق العرض، متطلبات التشغيل والطاقة، وخطة التحقق.', 'Evidence and hypotheses, offer logic, operating requirements, capacity and validation plan.')],
          [t('نموذج مالي قابل للتعديل', 'Editable financial model'), t('مدخلات واضحة، ميزانية تأسيس وتشغيل، تدفق نقدي، تعادل وسيناريوهات مترابطة.', 'Transparent inputs, setup and operating budgets, cash flow, break-even and linked scenarios.')],
          [t('سجل افتراضات ومصادر', 'Assumptions and sources register'), t('مصدر كل رقم، تاريخ مرجعه، درجة تأكده، وما يحتاج عرض سعر أو بحثًا إضافيًا.', 'Each figure’s source, reference date, confidence and required quotation or further research.')],
          [t('خريطة الانتقال إلى العلامة', 'Bridge to the brand'), t('كيف تؤثر النتائج في الجمهور والتموضع والتسعير والرسائل وأولويات تطبيق الهوية.', 'How findings inform the audience, positioning, pricing, messages and identity rollout priorities.')],
        ]} />
        <p>{t('إذا كان المطلوب ملفًا لجهة تمويل أو اعتمادًا مهنيًا محددًا، نراجع متطلبات تلك الجهة ونحدد المختصين والمخرجات اللازمة ضمن النطاق قبل البدء.', 'If a lender-specific submission or professional certification is required, its requirements, relevant specialists and deliverables are defined in scope before work begins.')}</p>
      </section>
      <section className={styles.section} id="process"><span className={styles.sectionNumber}>03</span><h2>{t('كيف نعمل؟', 'How we work')}</h2>
        <div className={styles.grid}>{[
          [t('1. تعريف القرار', '1. Define the decision'), t('نحدد النشاط والمدينة والمرحلة والميزانية المبدئية: هل القرار افتتاح، توسع، فرع جديد، أم تعديل نموذج قائم؟', 'Clarify the sector, city, stage and indicative budget: launch, expansion, a new branch or changes to an existing model?')],
          [t('2. جمع الأدلة', '2. Gather evidence'), t('نحصر البيانات ونراجع المصادر وعروض الأسعار. يحدد النطاق ما إذا كانت هناك مقابلات أو زيارات أو اختبار بيع، وكيف ستُوثق.', 'Inventory available information and review sources and quotations. The scope specifies any interviews, site visits or sales tests and how they will be documented.')],
          [t('3. بناء النموذج واختباره', '3. Build and challenge the model'), t('نربط الطلب بالطاقة والتكلفة والتسعير، ونحسب أثر التدرّج والتغيرات، ثم نراجع نقاط الضعف والبيانات الناقصة معك.', 'Connect demand to capacity, cost and pricing; calculate ramp-up and sensitivity, then review weak points and missing information with you.')],
          [t('4. القرار ثم التصميم', '4. Decide, then design'), t('نسلّم التوصية وشروطها. عند اختيار المسار المتكامل، تتحول النتائج المعتمدة إلى استراتيجية علامة وهوية وتطبيقات مرتبة بحسب أولوية الإطلاق.', 'Deliver the recommendation and its conditions. In an integrated engagement, validated findings become brand strategy, identity and applications prioritised for launch.')],
        ].map(([title, body]) => <article className={styles.card} key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>
      <section className={styles.section} id="inputs"><span className={styles.sectionNumber}>04</span><h2>{t('ماذا نحتاج منك في البداية؟', 'What do we need at the start?')}</h2>
        <ul><li>{t('وصف الفكرة والمنتجات والعملاء والمدينة أو المواقع المحتملة.', 'The idea, products, customers, city and potential locations.')}</li><li>{t('الميزانية المتاحة وموعد الإطلاق وطبيعة دورك في التشغيل.', 'Available budget, launch timing and your role in operations.')}</li><li>{t('عروض الإيجار والتجهيز والموردين، إن كانت متاحة.', 'Available rent, fit-out and supplier quotations.')}</li><li>{t('للمشروعات القائمة: المبيعات والفواتير وتكلفة المنتجات والمصروفات الفعلية لفترة متفق عليها.', 'For existing businesses: sales, transactions, product costs and actual expenses for an agreed period.')}</li><li>{t('أي شروط تمويل أو متطلبات قطاعية أو قرارات سبق اعتمادها.', 'Financing conditions, sector requirements and decisions already made.')}</li></ul>
        <p>{t('إذا كانت البيانات ناقصة، نوضح أثر ذلك ونقترح طريقة جمعها. تُوسم التقديرات كافتراضات إلى أن تتوفر أدلة تدعمها.', 'When data is missing, we explain the effect and propose how to obtain it. Estimates stay labelled as assumptions until evidence supports them.')}</p>
      </section>
      <section className={styles.section} id="studies"><span className={styles.sectionNumber}>05</span><h2>{t('دراسة جدوى لكل عمل.', 'A feasibility study for every project.')}</h2>
        <p className={styles.lead}>{t('ثمانية أعمال، ولكل نشاط سوق وتشغيل وميزانية ومخاطر وحاسبة تناسبه؛ من المشروع أو الطلب والزيارة، إلى الاشتراك والتطوير العقاري.', 'Eight projects, each with its own market, operations, budget, risks and suitable calculator: projects, orders, visits, subscriptions and property development.')}</p>
        <p>{t('هذه دراسات توضيحية بافتراضات معلنة، وليست نتائج تشغيل أو بحث ميداني أو عروض أسعار. حتى دراسة أثر تستخدم تكوينًا افتراضيًا، وليست حسابات الاستوديو الفعلية. اختر العمل لقراءة الدراسة كاملة وتجربة سيناريوهاته.', 'These are illustrative studies with disclosed assumptions, not operating results, field research or quotations. Even the ATHR study uses a hypothetical configuration, not the studio’s actual accounts. Choose a project to read its full study and try its scenarios.')}</p>
        <div className={styles.grid}>{CASE_SLUGS.map(slug => {
          const study = PORTFOLIO_FEASIBILITY.find(item => item.slug === slug);
          const name = study?.name[locale] ?? t('سُمرة', 'SUMRA');
          const sector = study?.sector[locale] ?? t('فرع مقهى قهوة مختصة', 'Specialty café branch');
          const summary = study?.summary[locale] ?? t('تكلفة الفاتورة والتعادل اليومي والتأسيس واحتياطي النقد، مع تدرج السنة الأولى.', 'Transaction costs, daily break-even, setup and cash reserve, with first-year ramp-up.');
          return <article className={styles.card} key={slug}><p className={styles.eyebrow}>{sector}</p><h3>{name}</h3><p>{summary}</p><div className={styles.actions}><Link className={styles.button} href={`/${locale}/work/${slug}/feasibility`}>{t(`دراسة جدوى ${name}`, `${name} feasibility study`)}</Link><Link href={`/${locale}/work/${slug}`}>{t('الاستراتيجية والهوية', 'Strategy and identity')}</Link></div></article>;
        })}</div>
      </section>
    </div>
  </FeasibilityFrame>;
}
