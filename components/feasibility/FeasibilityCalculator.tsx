'use client';

import { useState } from 'react';
import type { Locale } from '@/content/site';
import { BASE_INPUTS, INPUT_RULES, SCENARIOS, calculateFeasibility, isValidInput, type FeasibilityInputs, type InputKey } from '@/lib/feasibility-model';
import styles from './Feasibility.module.css';

const FIELDS: { key: InputKey; ar: string; en: string }[] = [
  { key: 'dailyOrders', ar: 'متوسط الفواتير يوميًا عند الاستقرار', en: 'Average daily transactions at steady state' },
  { key: 'averageTicket', ar: 'متوسط الفاتورة شامل الضريبة — ر.س', en: 'Average transaction including VAT — SAR' },
  { key: 'daysPerMonth', ar: 'أيام التشغيل في الشهر', en: 'Operating days per month' },
  { key: 'variableCostPct', ar: 'التكلفة المتغيرة من الإيراد دون الضريبة — %', en: 'Variable cost as a share of revenue excluding VAT — %' },
  { key: 'fixedMonthlyCost', ar: 'التكلفة الثابتة الشهرية — ر.س', en: 'Monthly fixed operating cost — SAR' },
  { key: 'setupCost', ar: 'التجهيز ومصاريف ما قبل الافتتاح — ر.س', en: 'Setup and pre-opening expenditure — SAR' },
  { key: 'depositAndStock', ar: 'الوديعة والمخزون الافتتاحي — ر.س', en: 'Deposit and opening stock — SAR' },
  { key: 'reserveMonths', ar: 'الاحتياطي النقدي — أشهر من التكلفة الثابتة', en: 'Cash reserve — months of fixed costs' },
];
function toStrings(inputs: FeasibilityInputs): Record<InputKey, string> {
  return Object.fromEntries(FIELDS.map(({ key }) => [key, String(inputs[key])])) as Record<InputKey, string>;
}
const NUMBER_FORMATS = {
  ar: [0, 1].map(digits => new Intl.NumberFormat('ar-SA-u-nu-latn', { maximumFractionDigits: digits })),
  en: [0, 1].map(digits => new Intl.NumberFormat('en-GB', { maximumFractionDigits: digits })),
};

export function FeasibilityCalculator({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [values, setValues] = useState(() => toStrings(BASE_INPUTS));
  const [scenario, setScenario] = useState('base');
  const [announcement, setAnnouncement] = useState('');
  const number = (value: number, digits = 0) => NUMBER_FORMATS[locale][digits].format(value);
  const unit = ar ? 'ر.س' : 'SAR';
  const inputs = Object.fromEntries(FIELDS.map(({ key }) => [key, Number(values[key])])) as FeasibilityInputs;
  const invalid = FIELDS.filter(({ key }) => values[key].trim() === '' || !isValidInput(key, inputs[key]));
  const result = invalid.length ? null : calculateFeasibility(inputs);
  const metric = (label: string, value: number, suffix: string, key: string) => <div className={styles.metric} key={key}>
    <dt>{label}</dt><dd className={value < 0 ? styles.negative : undefined} data-testid={key}><bdi>{number(value)}</bdi><small>{suffix}</small></dd>
  </div>;
  const tableHead = ar
    ? ['الشهر', 'التدرّج', 'فواتير / يوم', 'الإيراد دون الضريبة', 'الفائض التشغيلي', 'رصيد نهاية الشهر']
    : ['Month', 'Ramp', 'Transactions / day', 'Revenue excluding VAT', 'Operating surplus', 'Closing cash'];

  return <div className={styles.calculator}>
    <h3>{ar ? 'جرّب الافتراضات وشاهد أثرها' : 'Change the assumptions and see the effect'}</h3>
    <p>{ar ? 'كل سيناريو يعيد ضبط جميع المدخلات. تعديل الأرقام يحدّث النتائج داخل هذه الحاسبة فقط؛ جداول الميزانية خارجها توثّق السيناريو الأساسي.' : 'Each preset resets every input. Your edits update this calculator only; the budget tables elsewhere document the base scenario.'}</p>
    <div className={styles.scenarioButtons} aria-label={ar ? 'السيناريوهات الافتراضية' : 'Illustrative scenarios'}>
      {SCENARIOS.map(item => <button type="button" key={item.id} aria-pressed={scenario === item.id} onClick={() => {
        setValues(toStrings(item.inputs)); setScenario(item.id);
        setAnnouncement(ar ? `تم تحميل السيناريو ${item.ar}.` : `${item.en} scenario loaded.`);
      }}>{item[locale]}</button>)}
    </div>
    <p className={styles.small}>{ar ? 'الحالة الحالية: ' : 'Current inputs: '}{SCENARIOS.find(item => item.id === scenario)?.[locale] ?? (ar ? 'مخصّصة' : 'Custom')}</p>
    <div className={styles.inputGrid}>
      {FIELDS.map(field => {
        const rule = INPUT_RULES[field.key];
        const error = invalid.some(item => item.key === field.key);
        const id = `feasibility-${field.key}`;
        return <div key={field.key}>
          <label htmlFor={id}>{field[locale]}</label>
          <input id={id} name={field.key} type="number" inputMode="decimal" dir="ltr" min={rule.min} max={rule.max} step={field.key === 'daysPerMonth' ? 1 : 'any'} value={values[field.key]} aria-invalid={error} aria-describedby={`${id}-help`} onChange={event => {
            setValues(previous => ({ ...previous, [field.key]: event.target.value })); setScenario('custom'); setAnnouncement('');
          }} />
          <span id={`${id}-help`} className={error ? styles.error : styles.fieldHelp}>
            {ar ? (error ? 'أدخل رقمًا بين ' : 'النطاق: ') : (error ? 'Enter a number from ' : 'Range: ')}<bdi>{number(rule.min)}</bdi> — <bdi>{number(rule.max)}</bdi>{field.key === 'daysPerMonth' ? (ar ? '، عدد صحيح.' : ', whole days.') : ''}
          </span>
        </div>;
      })}
    </div>
    <p className={styles.small}>{ar ? 'سقف 150 فاتورة يوميًا افتراض لطاقة الفرع بهذا التشغيل. تجاوزه يحتاج نموذج فريق ومعدات جديدًا. النموذج يفترض التسجيل في ضريبة القيمة المضافة من الافتتاح، ومعدل 15% للمبيعات الخاضعة.' : 'The 150-transaction daily limit is an assumed capacity for this operating setup. Higher volumes require a revised staffing and equipment model. The model assumes VAT registration from launch and a 15% rate on taxable sales.'}</p>
    <p className={styles.srOnly} role="status">{announcement}</p>
    {!result ? <p role="alert" className={styles.error}>{ar ? 'صحّح المدخلات الموضّحة لعرض نتائج قابلة للحساب.' : 'Correct the highlighted inputs to calculate results.'}</p> : <div data-testid="feasibility-results">
      <h3>{ar ? 'الشهر المستقر' : 'Steady-state month'}</h3>
      <dl className={styles.metrics}>
        {metric(ar ? 'المبيعات المحصّلة شامل الضريبة' : 'Sales collected including VAT', result.grossSales, unit, 'gross-sales')}
        {metric(ar ? 'الإيراد دون ضريبة القيمة المضافة' : 'Revenue excluding VAT', result.revenue, unit, 'net-revenue')}
        {metric(ar ? 'الفائض التشغيلي' : 'Operating surplus', result.operatingSurplus, unit, 'operating-surplus')}
        {metric(ar ? 'الحد اليومي للتعادل التشغيلي' : 'Daily operating break-even target', result.breakEvenWholeDaily, ar ? 'فاتورة / يوم — مقرب للأعلى' : 'transactions / day — rounded up', 'break-even')}
        {metric(ar ? 'احتياطي نقدي عند الافتتاح' : 'Opening cash reserve', result.reserve, unit, 'opening-reserve')}
        {metric(ar ? 'التمويل الأولي داخل نطاق النموذج' : 'Initial funding within model scope', result.funding, unit, 'initial-funding')}
      </dl>
      <p className={styles.note}>{ar ? 'الفائض التشغيلي = الإيراد دون الضريبة − التكاليف المتغيرة − التكاليف الثابتة. يشمل افتراض الأجور أجر المالك العامل. لا يخصم الإهلاك أو التمويل أو الزكاة أو ضريبة الدخل، لذلك لا يمثّل صافي الربح.' : 'Operating surplus = revenue excluding VAT − variable costs − fixed costs. Payroll includes a working-owner allowance. Depreciation, financing, Zakat and income tax are excluded; this is not net profit.'}</p>
      {result.breakEvenDaily > 150 && <p className={styles.error} role="status">{ar ? 'نقطة التعادل تتجاوز الطاقة المفترضة للفرع. راجع السعر أو التكاليف أو نموذج التشغيل.' : 'Break-even exceeds the assumed branch capacity. Review pricing, costs or the operating setup.'}</p>}
      <div className={styles.tableScroll} role="region" aria-label={ar ? 'تفصيل الشهر المستقر' : 'Steady-state reconciliation'} tabIndex={0}>
        <table><caption>{ar ? 'تفصيل الشهر المستقر — ر.س' : 'Steady-state reconciliation — SAR'}</caption><thead><tr><th scope="col">{ar ? 'البند' : 'Item'}</th><th scope="col">{ar ? 'القيمة' : 'Amount'}</th></tr></thead>
          <tbody>{[
            [ar ? 'ضريبة المبيعات ضمن التحصيل؛ قبل خصم ضريبة المدخلات' : 'Output VAT included in collections; before input VAT offsets', result.outputVat],
            [ar ? 'التكاليف المتغيرة' : 'Variable costs', result.variableCost],
            [ar ? 'هامش المساهمة قبل التكلفة الثابتة' : 'Contribution before fixed costs', result.contribution],
            [ar ? 'التكاليف الثابتة' : 'Fixed costs', inputs.fixedMonthlyCost],
          ].map(([label, amount]) => <tr key={label}><th scope="row">{label}</th><td><bdi>{number(Number(amount))}</bdi></td></tr>)}</tbody>
        </table>
      </div>
      <h3>{ar ? 'السنة الأولى والسيولة' : 'First year and cash'}</h3>
      <p>{ar ? 'نبدأ عند 55% من حجم الفواتير المستقر، ثم 65% و75% و85% و90% و95%، ونصل إلى 100% من الشهر السابع. التكاليف الثابتة كاملة من الشهر الأول؛ كل شهر يستخدم عدد أيام التشغيل الذي أدخلته.' : 'Volume starts at 55% of steady state, then 65%, 75%, 85%, 90% and 95%, reaching 100% from month seven. Full fixed costs apply from month one. Every model month uses your selected operating-day count.'}</p>
      <dl className={styles.metrics}>
        {metric(ar ? 'فائض / عجز التشغيل في السنة الأولى' : 'First-year operating surplus / deficit', result.yearOperatingSurplus, unit, 'year-surplus')}
        {metric(ar ? 'أكبر عجز تشغيلي تراكمي' : 'Peak cumulative operating deficit', result.peakDeficit, unit, 'peak-deficit')}
        {metric(ar ? 'احتياطي إضافي مطلوب لتجنب رصيد سالب' : 'Additional reserve to avoid negative cash', result.reserveShortfall, unit, 'reserve-shortfall')}
      </dl>
      <CashChart values={[result.reserve, ...result.months.map(month => month.closingCash)]} locale={locale} />
      {result.minimumCash < 0 && <p className={styles.error} role="status">{ar ? 'الرصيد يصبح سالبًا خلال السنة؛ التمويل المدخل لا يغطي مسار التشغيل المفترض.' : 'Cash turns negative during the year; the entered funding does not cover this operating path.'}</p>}
      <div className={styles.tableScroll} role="region" aria-label={ar ? 'تفاصيل التدفق النقدي الشهري' : 'Monthly operating cash details'} tabIndex={0}>
        <table><caption>{ar ? '12 شهرًا من التشغيل — القيم المالية بالريال، مقربة للعرض' : '12 operating months — financial amounts in SAR, rounded for display'}</caption>
          <thead><tr>{tableHead.map(heading => <th scope="col" key={heading}>{heading}</th>)}</tr></thead>
          <tbody>{result.months.map(month => <tr key={month.month}>
            <th scope="row"><bdi>{month.month}</bdi></th><td><bdi>{number(month.ramp * 100)}%</bdi></td><td><bdi>{number(month.dailyOrders, 1)}</bdi></td>
            <td><bdi>{number(month.revenue)}</bdi></td><td className={month.operatingSurplus < 0 ? styles.negative : undefined}><bdi>{number(month.operatingSurplus)}</bdi></td><td><bdi>{number(month.closingCash)}</bdi></td>
          </tr>)}</tbody>
          <tfoot><tr><th scope="row">{ar ? 'السنة / الرصيد الختامي' : 'Year / closing balance'}</th><td>—</td><td>—</td><td><bdi>{number(result.yearRevenue)}</bdi></td><td><bdi>{number(result.yearOperatingSurplus)}</bdi></td><td><bdi>{number(result.yearClosingCash)}</bdi></td></tr></tfoot>
        </table>
      </div>
      <p className={styles.small}>{ar ? 'هذا تدفق تشغيلي مبسّط: التحصيل وسداد التشغيل في الشهر نفسه، مع ثبات المخزون بعد الافتتاح. يبدأ الرصيد بالاحتياطي بعد دفع التجهيز والوديعة والمخزون. لا يشمل توقيت سداد واسترداد الضريبة، أو استثمارات لاحقة، أو أقساط تمويل، أو توزيعات مالك. مبالغ التكاليف مفترضة بعد استبعاد ضريبة المدخلات القابلة للاسترداد؛ تمويل الضريبة المؤقت يحتاج جدولًا مستقلًا.' : 'This is a simplified operating cash model: sales are collected and operating costs paid in the same month, with inventory unchanged after opening. Cash starts at the reserve after setup, deposit and opening stock are paid. VAT settlement and refund timing, later investments, debt repayments and owner distributions are excluded. Cost assumptions exclude recoverable input VAT; a separate schedule is needed to fund VAT timing.'}</p>
      <details className={styles.formulas}><summary>{ar ? 'كيف تُحسب النتائج؟' : 'How are results calculated?'}</summary><ul>
        <li>{ar ? 'الإيراد الشهري = الفواتير اليومية × أيام التشغيل × متوسط الفاتورة ÷ 1.15.' : 'Monthly revenue = daily transactions × operating days × average transaction ÷ 1.15.'}</li>
        <li>{ar ? 'مساهمة الفاتورة = متوسط الفاتورة ÷ 1.15 × (1 − نسبة التكلفة المتغيرة).' : 'Contribution per transaction = average transaction ÷ 1.15 × (1 − variable cost share).'}</li>
        <li>{ar ? 'التعادل اليومي = التكلفة الثابتة ÷ مساهمة الفاتورة ÷ أيام التشغيل، ثم التقريب للأعلى.' : 'Daily break-even = fixed cost ÷ contribution per transaction ÷ operating days, rounded up.'}</li>
        <li>{ar ? 'التمويل الأولي = التجهيز + الوديعة والمخزون + (التكلفة الثابتة × أشهر الاحتياطي).' : 'Initial funding = setup + deposit and opening stock + (fixed cost × reserve months).'}</li>
        <li>{ar ? 'رصيد نهاية الشهر = احتياطي الافتتاح + مجموع الفائض أو العجز التشغيلي حتى ذلك الشهر.' : 'Closing cash = opening reserve + cumulative operating surplus or deficit to that month.'}</li>
      </ul></details>
    </div>}
  </div>;
}

function CashChart({ values, locale }: { values: number[]; locale: Locale }) {
  const ar = locale === 'ar';
  const low = Math.min(0, ...values);
  const high = Math.max(1, ...values);
  const padding = (high - low) * 0.1;
  const min = low - padding, max = high + padding;
  const x = (index: number) => 94 + index * 50;
  const y = (value: number) => 28 + (max - value) / (max - min) * 208;
  const format = (value: number) => NUMBER_FORMATS.en[0].format(value);
  return <figure className={styles.chart}>
    <svg viewBox="0 0 740 286" role="img" aria-labelledby="sumra-cash-title" aria-describedby="sumra-cash-desc" direction="ltr">
      <title id="sumra-cash-title">{ar ? 'رصيد النقد من الافتتاح حتى الشهر الثاني عشر' : 'Cash balance from opening through month twelve'}</title>
      <desc id="sumra-cash-desc">{ar ? 'المحور الأفقي: الشهر، والصفر هو الافتتاح. المحور الرأسي: الرصيد بالريال. القيم الشهرية في الجدول التالي.' : 'Horizontal axis: month; zero is opening. Vertical axis: cash in SAR. Monthly values are in the following table.'}</desc>
      {[low, (low + high) / 2, high].map((value, index) => <g key={index}><line x1="94" x2="694" y1={y(value)} y2={y(value)} stroke="#39251d25" /><text x="84" y={y(value) + 5} textAnchor="end" fontSize="14" fill="#39251d">{format(value)}</text></g>)}
      <text x="84" y="16" textAnchor="end" fontSize="13" fill="#39251d">SAR</text>
      <line x1="94" x2="694" y1={y(0)} y2={y(0)} stroke="#8e2920" strokeDasharray="5 5" />
      <polyline points={values.map((value, index) => `${x(index)},${y(value)}`).join(' ')} fill="none" stroke="#73452d" strokeWidth="3" />
      {values.map((value, index) => <g key={index}><circle cx={x(index)} cy={y(value)} r="4" fill={value < 0 ? '#8e2920' : '#39251d'} /><text x={x(index)} y="260" textAnchor="middle" fontSize="14" fill="#39251d">{index}</text></g>)}
    </svg>
    <figcaption>{ar ? 'رصيد النقد بالريال · 0 = الافتتاح · 1–12 = أشهر التشغيل. الخط المتقطع يوضح الرصيد صفرًا.' : 'Cash in SAR · 0 = opening · 1–12 = operating months. The dashed line marks zero cash.'}</figcaption>
  </figure>;
}
