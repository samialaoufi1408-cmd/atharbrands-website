// Illustrative planning models. Money stays at full precision until display.
export type Bilingual = { ar: string; en: string };
export const bilingual = (ar: string, en: string): Bilingual => ({ ar, en });
export type ModelKind = 'operating' | 'subscription' | 'development';
export type ModelInputs = Record<string, number>;
export type BudgetRow = { label: Bilingual; amount: number };
export type ModelConfig = {
  kind: ModelKind;
  base: ModelInputs;
  unit: Bilingual;
  capacity: number;
  ramp?: readonly number[];
  conservative: ModelInputs;
  optimistic: ModelInputs;
  setup: BudgetRow[];
  fixed: BudgetRow[];
  workingCapital: BudgetRow[];
};
export type Field = { key: string; label: Bilingual; min: number; max: number; integer?: boolean };
const field = (key: string, ar: string, en: string, min: number, max: number, integer = false): Field => ({ key, label: bilingual(ar, en), min, max, integer });

export function modelFields(config: ModelConfig): Field[] {
  if (config.kind === 'development') return [
    field('units', 'إجمالي الوحدات المخطط بناؤها', 'Total units to build', 1, 100, true),
    field('soldUnits', 'الوحدات المباعة ضمن الأفق', 'Units sold within the horizon', 0, 100, true),
    field('price', 'سعر بيع الوحدة قبل ضرائب التصرف — ر.س', 'Unit selling price before transaction taxes — SAR', 1, 10000000),
    field('land', 'تكلفة شراء الأرض قبل الضرائب — ر.س', 'Land acquisition cost before taxes — SAR', 0, 100000000),
    field('construction', 'إجمالي أعمال البناء لكل الوحدات — ر.س', 'Construction budget for all units — SAR', 0, 100000000),
    field('professional', 'التصميم والإشراف والتراخيص — ر.س', 'Design, supervision and permits — SAR', 0, 10000000),
    field('contingencyPct', 'تجاوز تكلفة البناء المفترض — %', 'Assumed construction cost overrun — %', 0, 50),
    field('fixed', 'إدارة المشروع شهريًا — ر.س', 'Monthly project overhead — SAR', 0, 1000000),
    field('salesPct', 'تكلفة البيع من الإيرادات — %', 'Selling costs as a share of revenue — %', 0, 50),
    field('taxAllowance', 'مخصص نقدي للضرائب غير المستردة — ر.س', 'Cash allowance for non-recoverable taxes — SAR', 0, 10000000),
    field('delay', 'تأخير إتمام المبيعات — أشهر', 'Sales completion delay — months', 0, 12, true),
    field('funding', 'التمويل المتاح عند البداية — ر.س', 'Funding available at the start — SAR', 0, 200000000),
  ];
  const common = [
    field('fixed', 'التكلفة الثابتة الشهرية — ر.س', 'Monthly fixed operating cost — SAR', 0, 1000000),
    field('setup', 'التأسيس وما قبل التشغيل — ر.س', 'Setup and pre-launch expenditure — SAR', 0, 10000000),
    field('workingCapital', 'الوديعة والمخزون الأولي — ر.س', 'Deposit and opening stock — SAR', 0, 10000000),
    field('reserveMonths', 'الاحتياطي النقدي — أشهر من التكلفة الثابتة', 'Cash reserve — months of fixed costs', 0, 24),
  ];
  if (config.kind === 'subscription') return [
    field('startingUsers', 'مشتركون مدفوعون قبل الشهر الأول', 'Paying subscribers before month one', 0, config.capacity, true),
    field('newUsers', 'مشتركون جدد مدفوعون كل شهر', 'New paying subscribers each month', 0, config.capacity, true),
    field('churnPct', 'تسرّب المشتركين السابقين شهريًا — %', 'Monthly churn of previous subscribers — %', 0, 100),
    field('price', 'الاشتراك الشهري دون القيمة المضافة — ر.س', 'Monthly subscription excluding VAT — SAR', 1, 10000),
    field('variablePerUser', 'تكلفة خدمة المشترك في الشهر — ر.س', 'Monthly service cost per subscriber — SAR', 0, 10000),
    field('acquisitionCost', 'تكلفة اكتساب المشترك الجديد — ر.س', 'Acquisition cost per new subscriber — SAR', 0, 10000),
    ...common,
  ];
  return [
    { ...field('volume', 'الحجم الشهري عند الاستقرار', 'Monthly volume at steady state', 0, config.capacity), label: bilingual(`الحجم الشهري عند الاستقرار — ${config.unit.ar}`, `Monthly steady-state volume — ${config.unit.en}`) },
    field('price', 'متوسط إيراد الوحدة دون القيمة المضافة — ر.س', 'Average unit revenue excluding VAT — SAR', 1, 100000),
    field('variablePct', 'التكلفة المتغيرة من الإيراد — %', 'Variable cost as a share of revenue — %', 0, 99),
    ...common,
    field('collectionLag', 'تأخر التحصيل بعد تنفيذ الخدمة — أشهر', 'Collection delay after delivery — months', 0, 3, true),
  ];
}

export function inputErrors(config: ModelConfig, values: ModelInputs): string[] {
  const errors = modelFields(config).filter(f => !Number.isFinite(values[f.key]) || values[f.key] < f.min || values[f.key] > f.max || (f.integer && !Number.isInteger(values[f.key]))).map(f => f.key);
  if (config.kind === 'development' && values.soldUnits > values.units) errors.push('soldUnits');
  return [...new Set(errors)];
}
export type CashMonth = {
  month: number; volume: number; revenue: number; costs: number; surplus: number;
  receipts: number; cashFlow: number; closingCash: number;
};
export type ModelResult = {
  kind: ModelKind; months: CashMonth[]; openingCash: number; funding: number;
  yearRevenue: number; totalCosts: number; surplus: number; receipts: number;
  closingCash: number; minimumCash: number; peakDeficit: number; extraFunding: number;
  receivables: number; breakEven: number | null; breakEvenPrice: number | null;
  steadyRevenue: number; steadySurplus: number; unsoldUnits: number;
};

export function calculatePortfolioModel(config: ModelConfig, v: ModelInputs): ModelResult | null {
  if (inputErrors(config, v).length) return null;
  const development = config.kind === 'development';
  const openingCash = development ? v.funding : v.fixed * v.reserveMonths;
  const funding = development ? v.funding : v.setup + v.workingCapital + openingCash;
  const months: CashMonth[] = [];
  let cash = openingCash, cumulative = 0, peakDeficit = 0, minimumCash = openingCash;
  let active = v.startingUsers ?? 0;
  const horizon = development ? 24 + v.delay : 12;
  for (let index = 0; index < horizon; index++) {
    const month = index + 1;
    let volume = 0, revenue = 0, costs = 0, receipts = 0;
    if (development) {
      const salesIndex = month - (19 + v.delay);
      if (salesIndex >= 0 && salesIndex < 6) volume = Math.floor(v.soldUnits * (salesIndex + 1) / 6) - Math.floor(v.soldUnits * salesIndex / 6);
      revenue = volume * v.price;
      costs = v.fixed + revenue * v.salesPct / 100;
      if (month === 1) costs += v.land + v.taxAllowance;
      if (month <= 6) costs += v.professional / 6;
      if (month >= 3 && month <= 18) costs += v.construction * (1 + v.contingencyPct / 100) / 16;
      receipts = revenue;
    } else if (config.kind === 'subscription') {
      active = active * (1 - v.churnPct / 100) + v.newUsers;
      volume = active;
      revenue = active * v.price;
      costs = v.fixed + active * v.variablePerUser + v.newUsers * v.acquisitionCost;
      receipts = revenue;
    } else {
      volume = v.volume * (config.ramp?.[index] ?? 1);
      revenue = volume * v.price;
      costs = v.fixed + revenue * v.variablePct / 100;
      receipts = v.collectionLag === 0 ? revenue : (months[index - v.collectionLag]?.revenue ?? 0);
    }
    const cashFlow = receipts - costs;
    cumulative += cashFlow;
    cash += cashFlow;
    peakDeficit = Math.max(peakDeficit, -cumulative);
    minimumCash = Math.min(minimumCash, cash);
    months.push({ month, volume, revenue, costs, surplus: revenue - costs, receipts, cashFlow, closingCash: cash });
  }
  const yearRevenue = months.reduce((sum, m) => sum + m.revenue, 0);
  const totalCosts = months.reduce((sum, m) => sum + m.costs, 0);
  const receipts = months.reduce((sum, m) => sum + m.receipts, 0);
  let breakEven: number | null, breakEvenPrice: number | null = null;
  let steadyRevenue = months.at(-1)!.revenue, steadySurplus = months.at(-1)!.surplus;
  if (development) {
    const nonSellingCosts = v.land + v.construction * (1 + v.contingencyPct / 100) + v.professional + v.fixed * horizon + v.taxAllowance;
    breakEven = Math.ceil(nonSellingCosts / (v.price * (1 - v.salesPct / 100)));
    breakEvenPrice = v.soldUnits > 0 ? nonSellingCosts / (v.soldUnits * (1 - v.salesPct / 100)) : null;
  } else if (config.kind === 'subscription') {
    const contribution = v.price - v.variablePerUser;
    breakEven = contribution > 0 ? Math.ceil((v.fixed + v.newUsers * v.acquisitionCost) / contribution) : null;
  } else {
    breakEven = Math.ceil(v.fixed / (v.price * (1 - v.variablePct / 100)));
    steadyRevenue = v.volume * v.price;
    steadySurplus = steadyRevenue * (1 - v.variablePct / 100) - v.fixed;
  }
  return {
    kind: config.kind, months, openingCash, funding, yearRevenue, totalCosts,
    surplus: yearRevenue - totalCosts, receipts, closingCash: cash, minimumCash,
    peakDeficit, extraFunding: Math.max(0, -minimumCash), receivables: yearRevenue - receipts,
    breakEven, breakEvenPrice, steadyRevenue, steadySurplus,
    unsoldUnits: development ? v.units - v.soldUnits : 0,
  };
}
