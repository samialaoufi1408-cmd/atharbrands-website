import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/content/site';
import type { PortfolioFeasibilityStudy as Study, StudyCard } from '@/content/feasibility/types';
import { calculatePortfolioModel, modelFields, type BudgetRow } from '@/lib/portfolio-feasibility-model';
import { FeasibilityFrame, DataTable } from './FeasibilityFrame';
import { PortfolioCalculator } from './PortfolioCalculator';
import styles from './Feasibility.module.css';

export function PortfolioFeasibilityStudy({ locale, study }: { locale: Locale; study: Study }) {
  if (locale !== 'ar' && locale !== 'en') notFound();
  const t = (ar: string, en: string) => locale === 'ar' ? ar : en;
  const format = (n: number, digits = 0) => new Intl.NumberFormat(locale === 'ar' ? 'ar-SA-u-nu-latn' : 'en-GB', { maximumFractionDigits: digits }).format(n);
  const amount = (n: number | null, digits = 0) => n === null ? '—' : <bdi>{format(n, digits)}</bdi>;
  const config = study.model, v = config.base;
  const base = calculatePortfolioModel(config, v)!;
  const development = config.kind === 'development';
  const subscription = config.kind === 'subscription';
  const chapters = [
    ['decision', t('الملخص وحدود الدراسة', 'Summary and scope')], ['market', t('السوق والعميل', 'Market and customer')],
    ['offer', t('العرض ونموذج الإيراد', 'Offer and revenue model')], ['operations', t('التشغيل والطاقة', 'Operations and capacity')],
    ['assumptions', t('سجل الافتراضات', 'Assumptions register')], ['budget', t('التأسيس والتكاليف', 'Setup and costs')],
    ['model', t('الحاسبة والسيناريوهات', 'Calculator and scenarios')], ['risks', t('المخاطر وشروط القرار', 'Risks and decision gates')],
    ['brand', t('من الجدوى إلى الهوية', 'From feasibility to identity')], ['sources', t('المصادر والتحديث', 'Sources and updates')],
  ];
  const heading = (index: number) => <><span className={styles.sectionNumber}><bdi>{String(index + 1).padStart(2, '0')}</bdi></span><h2>{chapters[index][1]}</h2></>;
  const cards = (items: StudyCard[]) => <div className={styles.grid}>{items.map(item => <article className={styles.card} key={item.title.en}><h3>{item.title[locale]}</h3><p>{item.body[locale]}</p></article>)}</div>;
  const budgetTable = (caption: string, rows: BudgetRow[]) => <DataTable caption={caption} headers={[t('البند', 'Item'), t('المبلغ — ر.س', 'Amount — SAR')]} rows={[
    ...rows.map(row => [row.label[locale], amount(row.amount)]), [t('الإجمالي', 'Total'), amount(rows.reduce((sum, row) => sum + row.amount, 0))],
  ]} />;
  const scenarios = [
    { id: 'conservative' as const, label: t('متحفّظ', 'Conservative') },
    { id: 'base' as const, label: t('أساسي', 'Base') },
    { id: 'optimistic' as const, label: t('متفائل', 'Optimistic') },
  ];
  return <FeasibilityFrame locale={locale} path={`/work/${study.slug}/feasibility`} theme={study.theme} project={{ slug: study.slug, name: study.name[locale] }}>
    <section className={styles.hero}>
      <div><p className={styles.eyebrow}>{t('دراسة جدوى توضيحية · ', 'Illustrative feasibility · ')}{study.sector[locale]}</p>
        <h1>{t(`دراسة جدوى ${study.name.ar}`, `${study.name.en} feasibility`)}</h1>
        <p className={styles.lead}>{study.summary[locale]}</p>
        <div className={styles.actions}><a className={`${styles.button} ${styles.buttonFilled}`} href="#model">{t('جرّب الحاسبة', 'Try the calculator')}</a><Link className={styles.button} href={`/${locale}/work/${study.slug}`}>{t('استراتيجية العلامة وهويتها', 'Brand strategy and identity')}</Link></div>
      </div>
      <figure><Image src={study.hero} width={study.hero.includes('/mark.') ? 1200 : 1536} height={study.hero.includes('/mark.') ? 640 : 1024} priority sizes="(max-width: 900px) 100vw, 48vw" alt={t(`الهوية البصرية لعلامة ${study.name.ar}`, `${study.name.en} visual identity`)} /><figcaption>{t('هوية العلامة · صورة تطبيق تصوري', 'Brand identity · Concept application image')}</figcaption></figure>
    </section>
    <div className={styles.notice}><p>{study.scope[locale]}</p><p>{t('لم يُجرَ لهذه الدراسة بحث ميداني أو اختبار بيع أو جمع عروض أسعار. جميع الأرقام التجارية افتراضات من إعداد أثر؛ المصادر الرسمية تدعم المنهج أو تحدد جهات التحقق فقط. الإصدار: ', 'No fieldwork, sales test or quotation exercise has been completed for this study. All commercial figures are assumptions prepared by ATHR; official sources support methodology or identify verification authorities only. Version: ')}<bdi>2026-09-06</bdi>.</p></div>
    <div className={styles.body}>
      <nav className={styles.contents} aria-label={t('فهرس دراسة الجدوى', 'Feasibility study contents')}>{chapters.map(([id, title], index) => <a key={id} href={`#${id}`}><bdi>{String(index + 1).padStart(2, '0')}</bdi> · {title}</a>)}</nav>
      <section className={styles.section} id="decision">{heading(0)}
        <p className={styles.lead}>{study.decision[locale]}</p>
        <DataTable caption={t('قراءة السيناريو الأساسي — افتراضات قابلة للمراجعة', 'Base-scenario reading — assumptions subject to review')} headers={[t('المؤشر', 'Indicator'), t('النتيجة', 'Result')]} rows={[
          [t('أفق التدفق — أشهر', 'Cash-flow horizon — months'), amount(base.months.length)],
          [development ? t('التمويل المدخل عند البداية — ر.س', 'Entered starting funding — SAR') : t('التأسيس والمخزون والاحتياطي — ر.س', 'Setup, stock and reserve — SAR'), amount(base.funding)],
          [development ? t('فائض / عجز نقد المشروع قبل التمويل — ر.س', 'Project cash surplus / deficit before funding — SAR') : t('فائض / عجز تشغيل السنة الأولى — ر.س', 'First-year operating surplus / deficit — SAR'), amount(base.surplus)],
          [t('تمويل إضافي لمنع الرصيد السالب داخل النطاق — ر.س', 'Extra funding to avoid negative cash within scope — SAR'), amount(base.extraFunding)],
        ]} />
        <p>{t('هذه قراءة مشروطة بالمدخلات وليست توصية استثمار نهائية. المبلغ الإضافي يغطي فجوة النموذج فقط؛ تضاف الاحتياجات المستبعدة وهامش مناسب بعد التحقق.', 'This is conditional on inputs, not a final investment recommendation. Extra funding covers only the modeled gap; add excluded needs and an appropriate buffer after verification.')}</p>
      </section>
      <section className={styles.section} id="market">{heading(1)}{cards(study.market)}
        <h3>{t('كيف نتحقق من الطلب؟', 'How do we verify demand?')}</h3>{cards(study.validation)}
        <p className={styles.small}>{t('المقابلات والتجارب أعلاه خطة مقترحة لم تُنفذ. تُوثق العينة والتاريخ والنتائج وأسباب الاستبعاد، ولا يُستبدل البحث بعدد متابعين أو انطباع عام.', 'The interviews and trials above are proposed, not completed. Record samples, dates, outcomes and exclusions; follower counts or general impressions do not replace research.')}</p>
      </section>
      <section className={styles.section} id="offer">{heading(2)}{cards(study.offer)}<aside className={styles.note}>{study.tax[locale]}</aside></section>
      <section className={styles.section} id="operations">{heading(3)}{cards(study.operations)}<p className={styles.note}>{study.capacityNote[locale]}</p><h3>{t('التحصيل ورأس المال العامل', 'Collections and working capital')}</h3><p>{study.collectionNote[locale]}</p></section>
      <section className={styles.section} id="assumptions">{heading(4)}
        <p>{t('سجل الأساس بتاريخ الإصدار أعلاه. مصدر كل قيمة رقمية في الجدول هو افتراض داخلي منخفض اليقين، وليس مرجعًا لسعر السوق؛ تُستبدل بوثيقة أو نتيجة اختبار قبل الالتزام المالي.', 'Base register at the version date above. Every numerical value below is an internal, low-confidence assumption, not market-price evidence; replace it with documentation or test results before committing funds.')}</p>
        <DataTable caption={t('مدخلات السيناريو الأساسي', 'Base scenario inputs')} headers={[t('الافتراض ووحدته', 'Assumption and unit'), t('القيمة', 'Value')]} rows={modelFields(config).map(field => [field.label[locale], amount(v[field.key], 2)])} />
        {cards(study.assumptions)}
        {config.ramp && <DataTable caption={t('التدرج المفترض من حجم الشهر المستقر', 'Assumed ramp as a share of steady-state volume')} headers={[t('الشهر', 'Month'), t('نسبة الحجم', 'Volume share')]} rows={config.ramp.map((factor, i) => [amount(i + 1), <bdi key={i}>{format(factor * 100)}%</bdi>])} />}
        <p>{t('مسؤول المشروع يجمع الدليل؛ المحاسب أو المسؤول المالي يراجع التكلفة والضريبة والتحصيل؛ ويعتمد صاحب القرار النسخة الجديدة. أي تغيير في النطاق أو الأسعار أو الطاقة يستلزم تحديث السيناريوهات معًا.', 'The project lead gathers evidence; the accountant or finance owner reviews costs, tax and collections; the decision owner approves the new version. Changes to scope, prices or capacity require all scenarios to be updated together.')}</p>
      </section>
      <section className={styles.section} id="budget">{heading(5)}
        <p>{t('مبالغ افتراضية بالريال السعودي. بنود الإجراءات والتراخيص مخصصات تخطيطية وليست رسومًا منشورة. تعديلات الحاسبة لا تغير الجداول الأساسية التالية.', 'Hypothetical SAR amounts. Administrative and licensing lines are planning allowances, not published fees. Calculator edits do not change these base budget tables.')}</p>
        {development ? <>
          <DataTable compactDetails caption={t('ميزانية المشروع الأساسية — ر.س', 'Base project budget — SAR')} headers={[t('البند', 'Item'), t('المبلغ', 'Amount'), t('موعد الصرف المفترض', 'Assumed timing')]} rows={[
            [t('الأرض', 'Land'), amount(v.land), t('الشهر الأول', 'Month one')],
            [t('أعمال البناء لجميع الوحدات', 'Construction for all units'), amount(v.construction), t('بالتساوي من الشهر الثالث إلى الثامن عشر', 'Equally from month three to eighteen')],
            [t('تجاوز تكلفة البناء المصروف', 'Construction overrun spent'), amount(v.construction * v.contingencyPct / 100), t('مع أعمال البناء', 'Alongside construction')],
            [t('تصميم وإشراف وتراخيص', 'Design, supervision and permits'), amount(v.professional), t('بالتساوي في الأشهر الستة الأولى', 'Equally across the first six months')],
            [t('إدارة المشروع لجميع الأشهر', 'Project overhead for all months'), amount(v.fixed * base.months.length), t('شهريًا؛ تزيد مع تأخير البيع', 'Monthly; increases with sales delay')],
            [t('مخصص الضرائب غير المستردة', 'Non-recoverable tax allowance'), amount(v.taxAllowance), t('دفع كامل في الشهر الأول للتحفظ؛ يُستبدل بجدول فعلي', 'Paid fully in month one conservatively; replace with actual schedule')],
            [t('تكاليف البيع', 'Selling costs'), amount(base.yearRevenue * v.salesPct / 100), t('عند تحصيل بيع الوحدة', 'When unit sales are collected')],
            [t('إجمالي الصرف', 'Total expenditure'), amount(base.totalCosts), t('التمويل المدخل ليس تكلفة ولا إيرادًا', 'Entered funding is neither cost nor revenue')],
          ]} />
        </> : <>
          {budgetTable(t('التأسيس ومصاريف ما قبل التشغيل — ر.س', 'Setup and pre-launch expenditure — SAR'), config.setup)}
          {budgetTable(t('التكلفة الثابتة الشهرية — ر.س', 'Monthly fixed operating costs — SAR'), config.fixed)}
          <DataTable compactDetails caption={t('ملخص التمويل عند البداية — ر.س', 'Starting funding summary — SAR')} headers={[t('الاستخدام', 'Use'), t('المبلغ', 'Amount'), t('التفسير', 'Explanation')]} rows={[
            [t('تأسيس وما قبل التشغيل', 'Setup and pre-launch'), amount(v.setup), t('يشمل تجاوز التأسيس؛ لا يعاد ضمن التشغيل', 'Includes setup contingency; not repeated in operations')],
            ...config.workingCapital.map(row => [row.label[locale], amount(row.amount), t('نقد مجمد أو مخزون؛ ليس مصروفًا ثابتًا', 'Tied-up cash or inventory, not a fixed expense')]),
            [t('احتياطي نقدي متاح للتشغيل', 'Cash reserve available for operations'), amount(base.openingCash), <>{amount(v.fixed)} × {amount(v.reserveMonths)} {t('أشهر؛ ليس مصروفًا إضافيًا', 'months; not an additional expense')}</>],
            [t('إجمالي التمويل الأولي داخل النطاق', 'Total initial funding within scope'), amount(base.funding), t('لا يتضمن الزيادة اللازمة إن ظهر عجز أو احتياجات مستبعدة', 'Excludes additional funding for any gap or excluded requirements')],
          ]} />
        </>}
        <h3>{t('منطق التكاليف المتغيرة', 'Variable-cost logic')}</h3><p>{study.variableCosts[locale]}</p>
        <p className={styles.note}>{t('لا يتضمن النموذج الإهلاك أو فوائد وأقساط التمويل أو الزكاة أو ضريبة الدخل أو توزيعات المالك أو قيمة تصفية نهائية. المخصصات ليست بديلًا عن العروض والجدول الضريبي. يلزم توسيع النموذج إذا تغيرت هذه الشروط.', 'The model excludes depreciation, financing interest and repayments, Zakat, income tax, owner distributions and terminal liquidation value. Allowances do not replace quotations or a tax schedule. Extend the model when these conditions change.')}</p>
      </section>
      <section className={styles.section} id="model">{heading(6)}
        <p>{development ? t('نموذج مشروع يبدأ بالصرف ثم الإتمام والتحصيل؛ يتغير الأفق مع تأخير البيع.', 'A project model with expenditure before closing and collections; the horizon changes with sales delay.') : subscription ? t('نموذج دفعات اشتراك يتتبع الانضمام والتسرّب والفوترة شهريًا، دون افتراض ثبات عدد المشتركين.', 'A subscription cohort model tracking monthly additions, churn and billing rather than holding subscriber count constant.') : t('نموذج تشغيل للسنة الأولى يربط الحجم والتدرج والسعر بالتكلفة والتحصيل، ويقارن التعادل بالطاقة.', 'A first-year operating model linking volume, ramp, price, cost and collections, with break-even compared against capacity.')}</p>
        <p className={styles.scrollHint}>{t('يمكن تمرير جداول المقارنة والتدفق أفقيًا على الشاشات الصغيرة لعرض جميع الأعمدة.', 'On small screens, scroll comparison and cash-flow tables horizontally to see every column.')}</p>
        <DataTable caption={t('مقارنة السيناريوهات الافتراضية — القيم المالية بالريال', 'Illustrative scenario comparison — financial values in SAR')} headers={[
          t('السيناريو', 'Scenario'), development ? t('الوحدات المباعة', 'Units sold') : subscription ? t('جدد / شهر', 'New / month') : t('الحجم المستقر / شهر', 'Steady volume / month'), t('السعر دون الضريبة', 'Price excluding tax'), t('إيراد الأفق', 'Horizon revenue'), development ? t('فائض نقد المشروع', 'Project cash surplus') : t('فائض تشغيل السنة', 'Year operating surplus'), t('تمويل إضافي داخل النطاق', 'Extra funding within scope'),
        ]} rows={scenarios.map(s => { const inputs = config[s.id], r = calculatePortfolioModel(config, inputs)!; return [s.label, amount(development ? inputs.soldUnits : subscription ? inputs.newUsers : inputs.volume), amount(inputs.price), amount(r.yearRevenue), amount(r.surplus), amount(r.extraFunding)]; })} />
        <p className={styles.small}>{t('كل سيناريو حزمة مدخلات كاملة وليست نسبة احتمال. اختر زر السيناريو لعرض جميع مدخلاته، ثم غيّر متغيرًا واحدًا لاختبار حساسيته. السيناريو المتفائل لا يلغي الحاجة للتحقق من الطاقة والطلب.', 'Each scenario is a full input set, not a probability. Select its button to see all inputs, then change one variable to test sensitivity. The optimistic case still requires capacity and demand validation.')}</p>
        <PortfolioCalculator key={study.slug} locale={locale} config={config} slug={study.slug} />
      </section>
      <section className={styles.section} id="risks">{heading(7)}{cards(study.risks)}<h3>{t('شروط المضي والتعديل والتأجيل', 'Conditions for proceeding, revising or deferring')}</h3>{cards(study.gates)}<p>{t('لا تُستخدم المساهمة أو التعادل وحدهما لاتخاذ القرار. تُراجع السيولة والدليل التشغيلي والمتطلبات القطاعية معًا، وتُسجل البيانات الناقصة ومسؤول جمعها قبل الالتزام.', 'Do not decide from contribution or break-even alone. Review cash, operating evidence and sector requirements together, recording missing evidence and its owner before commitment.')}</p></section>
      <section className={styles.section} id="brand">{heading(8)}{cards(study.brand)}<p>{t('تُعتمد أولًا الفرضيات التي أثبتها التحقق، ثم تنعكس في الجمهور والتموضع والعرض والرسائل. يبقى نظام الهوية مرتبطًا بقدرة المشروع على تنفيذ وعده.', 'Validate assumptions first, then translate supported findings into audience, positioning, offer and messages. The identity system remains tied to the business’s ability to deliver its promise.')}</p><Link className={styles.button} href={`/${locale}/work/${study.slug}`}>{t(`استعرض استراتيجية ${study.name.ar} وهويتها كاملة`, `Explore the complete ${study.name.en} strategy and identity`)}</Link></section>
      <section className={styles.section} id="sources">{heading(9)}
        <p>{t('مراجعة المراجع: ', 'References reviewed: ')}<bdi>2026-09-06</bdi>. {t('تختلف عن تاريخ إصدار كل مرجع. الروابط التالية للمصادر الأصلية؛ لا يوجد مصدر خارجي يثبت أرقام المبيعات أو التكاليف المفترضة.', 'This is distinct from each source’s publication date. Links point to original sources; no external source substantiates the assumed sales or cost figures.')}</p>
        <ol className={styles.sources}>{study.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title[locale]}</a><p>{source.purpose[locale]}</p></li>)}</ol>
        <p>{t('تُراجع الدراسة بعد أول عروض أسعار واختبار طلب، ثم شهريًا أثناء التجربة، وعند تغيير النشاط أو الموقع أو المورد أو النطاق. تُحفظ نسخة بتاريخها وأسباب التعديل للمقارنة بين المتوقع والمتحقق.', 'Review after initial quotations and demand testing, monthly during the pilot, and whenever activity, premises, supplier or scope changes. Keep a dated version and change reasons to compare assumptions against results.')}</p>
        <Link className={styles.button} href={`/${locale}/services/feasibility#studies`}>{t('استعرض دراسات جميع الأعمال', 'Explore all project studies')}</Link>
      </section>
    </div>
  </FeasibilityFrame>;
}
