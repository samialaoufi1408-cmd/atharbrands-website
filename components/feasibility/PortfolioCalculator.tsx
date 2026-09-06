'use client';

import { useState } from 'react';
import type { Locale } from '@/content/site';
import { calculatePortfolioModel, inputErrors, modelFields, type ModelConfig, type ModelInputs } from '@/lib/portfolio-feasibility-model';
import { DataTable } from './FeasibilityFrame';
import styles from './Feasibility.module.css';

export const SCENARIO_LABELS = [
  { id: 'conservative', ar: 'متحفّظ', en: 'Conservative' },
  { id: 'base', ar: 'أساسي', en: 'Base' },
  { id: 'optimistic', ar: 'متفائل', en: 'Optimistic' },
] as const;
const strings = (inputs: ModelInputs) => Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, String(value)]));

export function PortfolioCalculator({ locale, config, slug }: { locale: Locale; config: ModelConfig; slug: string }) {
  const [values, setValues] = useState(() => strings(config.base));
  const [scenario, setScenario] = useState('base');
  const [announcement, setAnnouncement] = useState('');
  const t = (ar: string, en: string) => locale === 'ar' ? ar : en;
  const format = (n: number, digits = 0) => new Intl.NumberFormat(locale === 'ar' ? 'ar-SA-u-nu-latn' : 'en-GB', { maximumFractionDigits: digits }).format(n);
  const amount = (n: number | null, digits = 0) => n === null ? '—' : <bdi>{format(n, digits)}</bdi>;
  const fields = modelFields(config);
  const inputs = Object.fromEntries(fields.map(({ key }) => [key, values[key]?.trim() === '' ? NaN : Number(values[key])]));
  const errors = inputErrors(config, inputs);
  const result = calculatePortfolioModel(config, inputs);
  const development = config.kind === 'development';
  const subscription = config.kind === 'subscription';
  const unit = t('ر.س', 'SAR');
  const metric = (id: string, label: string, value: number | null, suffix = unit, digits = 0) => <div className={styles.metric} key={id}>
    <dt>{label}</dt><dd data-testid={id} className={value !== null && value < 0 ? styles.negative : undefined}>{amount(value, digits)}<small>{suffix}</small></dd>
  </div>;

  return <div className={styles.calculator}>
    <h3>{t('جرّب الافتراضات وشاهد أثرها', 'Change the assumptions and see the effect')}</h3>
    <p>{t('كل سيناريو يعيد ضبط جميع المدخلات. التعديل يغير نتائج الحاسبة فقط؛ جداول الدراسة المحيطة توثّق الأساس. لا تُحفظ المدخلات أو تُرسل إلى الاستوديو.', 'Each preset resets every input. Edits change this calculator only; surrounding study tables document the base. Inputs are not saved or sent to the studio.')}</p>
    <div className={styles.scenarioButtons} aria-label={t('السيناريوهات الافتراضية', 'Illustrative scenarios')}>
      {SCENARIO_LABELS.map(item => <button key={item.id} type="button" aria-pressed={scenario === item.id} onClick={() => {
        setValues(strings(config[item.id])); setScenario(item.id);
        setAnnouncement(t(`تم تحميل السيناريو ${item.ar}.`, `${item.en} scenario loaded.`));
      }}>{item[locale]}</button>)}
    </div>
    <p className={styles.small}>{t('الحالة الحالية: ', 'Current inputs: ')}{SCENARIO_LABELS.find(item => item.id === scenario)?.[locale] ?? t('مخصّصة', 'Custom')}</p>
    <div className={styles.inputGrid}>{fields.map(field => {
      const id = `${slug}-${field.key}`;
      const invalid = errors.includes(field.key);
      return <div key={field.key}>
        <label htmlFor={id}>{field.label[locale]}</label>
        <input id={id} name={field.key} type="number" dir="ltr" inputMode={field.integer ? 'numeric' : 'decimal'} min={field.min} max={field.max} step={field.integer ? 1 : 'any'} value={values[field.key] ?? ''} aria-invalid={invalid} aria-describedby={`${id}-help`} onChange={event => { setValues(previous => ({ ...previous, [field.key]: event.target.value })); setScenario('custom'); setAnnouncement(''); }} />
        <span id={`${id}-help`} className={invalid ? styles.error : styles.fieldHelp}>{invalid ? t('صحّح القيمة. النطاق: ', 'Correct the value. Range: ') : t('النطاق: ', 'Range: ')}{amount(field.min)} — {amount(field.max)}{field.integer ? t('، عدد صحيح.', ', whole numbers.') : ''}{field.key === 'soldUnits' ? t(' لا يتجاوز عدد الوحدات المبنية.', ' Cannot exceed units built.') : ''}</span>
      </div>;
    })}</div>
    <p className={styles.srOnly} role="status">{announcement}</p>
    {!result ? <p className={styles.error} role="alert">{t('صحّح المدخلات الموضحة لعرض النتائج.', 'Correct the highlighted inputs to show results.')}</p> : <div data-testid="portfolio-results">
      <h3>{development ? t('نتيجة المشروع ضمن الأفق', 'Project outcome within the horizon') : subscription ? t('نهاية السنة وتعادل المشتركين', 'Year-end position and subscriber break-even') : t('الشهر المستقر والتعادل', 'Steady-state month and break-even')}</h3>
      <dl className={styles.metrics}>
        {development ? <>
          {metric('project-revenue', t('إجمالي مبيعات الوحدات المحصّلة', 'Total collected unit sales'), result.yearRevenue)}
          {metric('project-costs', t('إجمالي الصرف داخل النطاق', 'Total expenditure within scope'), result.totalCosts)}
          {metric('project-surplus', t('فائض / عجز نقد المشروع قبل التمويل', 'Project cash surplus / deficit before funding'), result.surplus)}
          {metric('break-even', t('وحدات بيع لتغطية كامل الصرف', 'Units to sell to cover all expenditure'), result.breakEven, t('وحدة — مقرب للأعلى', 'units — rounded up'))}
          {metric('break-even-price', t('سعر التعادل للوحدة عند حجم البيع المدخل', 'Unit break-even price at entered sales volume'), result.breakEvenPrice)}
          {metric('unsold-units', t('وحدات باقية دون تحصيل مفترض', 'Remaining units with no assumed receipts'), result.unsoldUnits, t('وحدة سكنية', 'residential units'))}
        </> : <>
          {subscription && metric('active-users', t('مشتركون مفوترون في الشهر الثاني عشر', 'Billed subscribers in month twelve'), result.months[11].volume, config.unit[locale], 1)}
          {metric('steady-revenue', subscription ? t('إيراد الشهر الثاني عشر دون الضريبة', 'Month-twelve revenue excluding VAT') : t('إيراد الشهر المستقر دون الضريبة', 'Steady-state revenue excluding VAT'), result.steadyRevenue)}
          {metric('steady-surplus', subscription ? t('فائض تشغيل الشهر الثاني عشر', 'Month-twelve operating surplus') : t('الفائض التشغيلي الشهري', 'Monthly operating surplus'), result.steadySurplus)}
          {metric('break-even', subscription ? t('المشتركون اللازمون للتعادل الشهري', 'Subscribers needed for monthly break-even') : t('حجم التعادل الشهري', 'Monthly break-even volume'), result.breakEven, `${config.unit[locale]} · ${t('مقرب للأعلى', 'rounded up')}`)}
          {metric('initial-funding', t('التمويل الأولي داخل النطاق', 'Initial funding within scope'), result.funding)}
          {!subscription && metric('opening-reserve', t('احتياطي النقد بعد دفع التأسيس والمخزون', 'Cash reserve after setup and stock'), result.openingCash)}
        </>}
      </dl>
      {result.breakEven === null && <p className={styles.error} role="status">{t('لا توجد نقطة تعادل بتلك المدخلات: إيراد المشترك لا يتجاوز تكلفة خدمته. زيادة العدد وحدها لا تعالج ذلك.', 'No break-even exists with these inputs: subscriber revenue does not exceed service cost. More users alone cannot resolve this.')}</p>}
      {result.breakEven !== null && result.breakEven > (development ? inputs.units : config.capacity) && <p className={styles.error} role="status">{t('التعادل يتجاوز الطاقة أو عدد الوحدات المفترض. راجع السعر والتكلفة والنطاق قبل المضي.', 'Break-even exceeds assumed capacity or units available. Review price, cost and scope before proceeding.')}</p>}
      {subscription && result.months.some(m => m.volume > config.capacity) && <p className={styles.error} role="status">{t('يتجاوز النمو طاقة الدعم المفترضة. الأرقام المعروضة تحتاج إعادة تقدير الفريق والبنية قبل اعتمادها.', 'Growth exceeds assumed support capacity. Re-estimate staffing and infrastructure before relying on these results.')}</p>}
      <p className={styles.note}>{development ? t('الفائض النقدي هو التحصيل ناقص كامل الصرف في الأفق، قبل التمويل. لا يمثل ربحًا محاسبيًا مع وجود مخزون وحدات متبقية، ولا عائدًا مضمونًا. التمويل المدخل لا يُحتسب إيرادًا.', 'Cash surplus is receipts less all expenditure in the horizon, before funding. It is not accounting profit when units remain unsold, or a guaranteed return. Entered funding is not revenue.') : t('الفائض التشغيلي لا يخصم الإهلاك أو خدمة الدين أو الزكاة أو ضريبة الدخل أو توزيعات المالك. التكلفة الثابتة كاملة من الشهر الأول؛ لذلك لا يمثل صافي الربح أو عائد الاستثمار.', 'Operating surplus excludes depreciation, debt service, Zakat, income tax and owner distributions. Full fixed costs apply from month one, so it is not net profit or investment return.')}</p>
      <h3>{t('مسار النقد والاحتياج للتمويل', 'Cash path and funding needs')}</h3>
      <dl className={styles.metrics}>
        {!development && metric('year-surplus', t('فائض / عجز التشغيل للسنة الأولى', 'First-year operating surplus / deficit'), result.surplus)}
        {metric('peak-funding', development ? t('أكبر تمويل مطلوب لتغطية الصرف قبل التحصيل', 'Peak funding needed before collections cover expenditure') : t('أكبر عجز نقدي تراكمي قبل الاحتياطي', 'Peak cumulative cash deficit before reserve'), result.peakDeficit)}
        {metric('minimum-cash', t('أدنى رصيد نقدي', 'Lowest cash balance'), result.minimumCash)}
        {metric('extra-funding', t('تمويل إضافي لتجنب رصيد سالب داخل النطاق', 'Extra funding to avoid negative cash within scope'), result.extraFunding)}
        {metric('closing-cash', t('الرصيد في نهاية الأفق', 'Cash at the end of the horizon'), result.closingCash)}
        {!development && metric('receivables', t('إيراد لم يُحصّل عند نهاية السنة', 'Revenue uncollected at year end'), result.receivables)}
      </dl>
      {result.extraFunding > 0 && <p className={styles.error} role="status">{t('التمويل المدخل لا يغطي أدنى رصيد في هذا المسار. الزيادة الموضحة تغطي النموذج فقط، قبل أي احتياجات مستبعدة أو هامش طوارئ إضافي.', 'Entered funding does not cover the lowest balance on this path. The indicated increase covers this model only, before excluded requirements or additional contingency.')}</p>}
      <PortfolioCashChart values={[result.openingCash, ...result.months.map(m => m.closingCash)]} locale={locale} slug={slug} />
      <DataTable caption={t('التدفق الشهري — القيم المالية بالريال، مقربة للعرض', 'Monthly cash flow — monetary amounts in SAR, rounded for display')} headers={[
        t('الشهر', 'Month'), config.unit[locale], t('الإيراد دون الضريبة', 'Revenue excluding VAT'), t('التكاليف', 'Costs'), t('التحصيل', 'Receipts'), t('صافي التدفق', 'Net cash flow'), t('رصيد الإقفال', 'Closing cash'),
      ]} rows={[
        ...result.months.map(m => [amount(m.month), amount(m.volume, development ? 0 : 1), amount(m.revenue), amount(m.costs), amount(m.receipts), amount(m.cashFlow), amount(m.closingCash)]),
        [t('الإجمالي / الرصيد الختامي', 'Total / closing cash'), subscription ? '—' : amount(result.months.reduce((sum, m) => sum + m.volume, 0), development ? 0 : 1), amount(result.yearRevenue), amount(result.totalCosts), amount(result.receipts), amount(result.receipts - result.totalCosts), amount(result.closingCash)],
      ]} />
      <p className={styles.small}>{t('جميع الحسابات بكامل الدقة؛ قد يظهر فرق تقريبي بين مجموع الخلايا المعروضة والإجمالي. الرصيد السالب يوضح فجوة تمويل ولا يفترض قرضًا تلقائيًا. لا توجد قيمة بيع نهائية أو استرداد وديعة مفترض بعد نهاية الأفق.', 'Calculations retain full precision; rounded cells can differ from displayed totals. Negative cash indicates a funding gap, not an automatic loan. No terminal sale value or deposit recovery is assumed after the horizon.')}</p>
      <details className={styles.formulas}><summary>{t('كيف تُحسب النتائج؟', 'How are results calculated?')}</summary><ul>
        {development ? <>
          <li>{t('الإيراد = الوحدات التي أتمت البيع × سعر الوحدة. البناء لكل الوحدات المخططة، وتجاوز التكلفة يُصرف كاملًا.', 'Revenue = units with completed sales × unit price. Construction covers all planned units; the overrun allowance is fully spent.')}</li>
          <li>{t('الصرف = الأرض + البناء مع التجاوز + التكاليف المهنية + إدارة جميع الأشهر + مخصص الضرائب + نسبة تكلفة البيع من الإيراد.', 'Expenditure = land + construction with overrun + professional costs + overhead for all months + tax allowance + selling-cost share of revenue.')}</li>
          <li>{t('سعر تعادل الوحدة = الصرف قبل تكلفة البيع ÷ الوحدات المباعة ÷ (واحد ناقص نسبة تكلفة البيع). لا يُحسب سعر تعادل عند انعدام المبيعات.', 'Unit break-even price = expenditure before selling costs ÷ sold units ÷ (one minus selling-cost share). There is no break-even price with zero sales.')}</li>
        </> : subscription ? <>
          <li>{t('المشتركون المفوترون = مشتركو الشهر السابق × (واحد ناقص التسرّب) + المشتركون الجدد. التسرّب يطبق على السابقين فقط قبل الفوترة.', 'Billed subscribers = previous subscribers × (one minus churn) + new subscribers. Churn applies only to previous subscribers before billing.')}</li>
          <li>{t('التكلفة = الثابت + عدد المفوترين × تكلفة الخدمة + الجدد × تكلفة الاكتساب. لا يفرض النموذج نموًا تلقائيًا في اكتساب الشهر التالي.', 'Cost = fixed + billed users × service cost + new users × acquisition cost. New subscriber acquisition does not automatically grow month to month.')}</li>
          <li>{t('تعادل المشتركين = (الثابت + تكلفة اكتساب الجدد للشهر) ÷ (رسم الاشتراك ناقص تكلفة خدمة المشترك)، مقربًا للأعلى.', 'Subscriber break-even = (fixed costs + that month’s new-user acquisition spend) ÷ (subscription fee minus per-user service cost), rounded up.')}</li>
        </> : <>
          <li>{t('الإيراد الشهري = الحجم المستقر × معامل التدرج × متوسط إيراد الوحدة. التكاليف = الثابت + الإيراد × النسبة المتغيرة.', 'Monthly revenue = steady-state volume × ramp factor × average unit revenue. Costs = fixed + revenue × variable-cost share.')}</li>
          <li>{t('التعادل الشهري = الثابت ÷ مساهمة الوحدة، مقربًا للأعلى. التحصيل هو إيراد الشهر السابق بحسب عدد أشهر التأخر، مع انعدام الذمم الافتتاحية.', 'Monthly break-even = fixed cost ÷ unit contribution, rounded up. Collections equal revenue shifted by the selected lag, with no opening receivables.')}</li>
        </>}
        <li>{t('رصيد الشهر = الرصيد السابق + التحصيل − الصرف. التمويل الإضافي = مقدار أدنى رصيد سالب، وإلا صفر.', 'Monthly cash = previous balance + receipts − expenditure. Extra funding equals the magnitude of the lowest negative balance, otherwise zero.')}</li>
        {!development && <li>{t('تمويل البداية = التأسيس + الوديعة والمخزون + الثابت × أشهر الاحتياطي. يبدأ تدفق التشغيل بعد دفع التأسيس والمخزون؛ يعرض الرسم الاحتياطي المتبقي.', 'Initial funding = setup + deposit and stock + fixed costs × reserve months. Operating cash starts after setup and stock are paid; the chart begins with the remaining reserve.')}</li>}
      </ul></details>
    </div>}
  </div>;
}

function PortfolioCashChart({ values, locale, slug }: { values: number[]; locale: Locale; slug: string }) {
  const low = Math.min(0, ...values), high = Math.max(1, ...values);
  const range = high - low;
  const y = (value: number) => 28 + (high + range * .08 - value) / (range * 1.16) * 230;
  const x = (index: number) => 140 + index / (values.length - 1) * 560;
  const format = (value: number) => new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 }).format(value);
  const title = locale === 'ar' ? 'مسار الرصيد النقدي بالريال' : 'Cash balance path in SAR';
  return <figure className={styles.chart}>
    <svg viewBox="0 0 750 310" role="img" aria-labelledby={`${slug}-cash-title`} aria-describedby={`${slug}-cash-desc`} direction="ltr">
      <title id={`${slug}-cash-title`}>{title}</title>
      <desc id={`${slug}-cash-desc`}>{locale === 'ar' ? 'المحور الأفقي أشهر، والصفر بداية النموذج. الرأسي رصيد بالريال. القيم الدقيقة في الجدول التالي.' : 'Horizontal axis: months, with zero at model start. Vertical axis: cash in SAR. Detailed values follow in the table.'}</desc>
      {[low, (low + high) / 2, high].map((value, i) => <g key={i}><line x1="140" x2="700" y1={y(value)} y2={y(value)} stroke="currentColor" opacity=".2" /><text x="128" y={y(value) + 5} textAnchor="end" fontSize="14" fill="currentColor">{format(value)}</text></g>)}
      <text x="128" y="16" textAnchor="end" fontSize="13" fill="currentColor">SAR</text>
      <line x1="140" x2="700" y1={y(0)} y2={y(0)} stroke="#8e2920" strokeDasharray="5 5" />
      <polyline points={values.map((value, i) => `${x(i)},${y(value)}`).join(' ')} fill="none" stroke="currentColor" strokeWidth="3" />
      {values.map((value, i) => <g key={i}><circle cx={x(i)} cy={y(value)} r="3" fill={value < 0 ? '#8e2920' : 'currentColor'} />{(i % (values.length > 14 ? 3 : 1) === 0 || i === values.length - 1) && <text x={x(i)} y="284" textAnchor="middle" fontSize="13" fill="currentColor">{i}</text>}</g>)}
    </svg>
    <figcaption>{title} · {locale === 'ar' ? 'الخط المتقطع يمثل الصفر. الجدول يتيح قراءة الأرقام دون الاعتماد على الرسم.' : 'The dashed line marks zero. The table provides values without relying on the chart.'}</figcaption>
  </figure>;
}
