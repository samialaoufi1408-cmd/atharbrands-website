/** Illustrative SUMRA retail-branch model. Commercial inputs are assumptions,
 * not quotations or observed results. Calculations retain full precision. */
export const VAT_RATE = 0.15;
export const RAMP = [0.55, 0.65, 0.75, 0.85, 0.9, 0.95, 1, 1, 1, 1, 1, 1] as const;

export const INPUT_RULES = {
  dailyOrders: { min: 0, max: 150, step: 1 },
  averageTicket: { min: 1, max: 100, step: 0.5 },
  daysPerMonth: { min: 1, max: 31, step: 1 },
  variableCostPct: { min: 0, max: 95, step: 0.5 },
  fixedMonthlyCost: { min: 0, max: 200000, step: 100 },
  setupCost: { min: 0, max: 2000000, step: 1000 },
  depositAndStock: { min: 0, max: 1000000, step: 1000 },
  reserveMonths: { min: 0, max: 12, step: 0.5 },
} as const;
export type InputKey = keyof typeof INPUT_RULES;
export type FeasibilityInputs = Record<InputKey, number>;

export const FIXED_COSTS = [
  { ar: 'الأجور وتكاليف فريق العمل', en: 'Payroll and employment costs', amount: 24000 },
  { ar: 'الإيجار', en: 'Rent', amount: 7000 },
  { ar: 'الكهرباء والمياه والاتصالات', en: 'Utilities and connectivity', amount: 2200 },
  { ar: 'التسويق', en: 'Marketing', amount: 2000 },
  { ar: 'الإدارة والبرامج والتأمين', en: 'Administration, software and insurance', amount: 1800 },
  { ar: 'الصيانة', en: 'Maintenance', amount: 1000 },
] as const;
export const SETUP_COSTS = [
  { ar: 'تجهيز الموقع والأعمال الداخلية', en: 'Fit-out and interior works', amount: 95000 },
  { ar: 'معدات إعداد القهوة والتبريد', en: 'Coffee and refrigeration equipment', amount: 70000 },
  { ar: 'الأثاث واللوحات', en: 'Furniture and signage', amount: 25000 },
  { ar: 'الهوية والموقع', en: 'Brand identity and website', amount: 12000 },
  { ar: 'التهيئة والتدريب والتراخيص', en: 'Pre-opening, training and licences', amount: 8000 },
  { ar: 'احتياطي تجاوز تكلفة التجهيز (10%)', en: 'Setup contingency (10%)', amount: 21000 },
] as const;
export const BASE_INPUTS: FeasibilityInputs = {
  dailyOrders: 90, averageTicket: 28, daysPerMonth: 30, variableCostPct: 35,
  fixedMonthlyCost: FIXED_COSTS.reduce((sum, row) => sum + row.amount, 0),
  setupCost: SETUP_COSTS.reduce((sum, row) => sum + row.amount, 0),
  depositAndStock: 29000, reserveMonths: 3,
};
export const SCENARIOS = [
  { id: 'conservative', ar: 'متحفّظ', en: 'Conservative', inputs: { ...BASE_INPUTS, dailyOrders: 65, averageTicket: 26, variableCostPct: 38, fixedMonthlyCost: 40000 } },
  { id: 'base', ar: 'أساسي', en: 'Base', inputs: { ...BASE_INPUTS } },
  { id: 'optimistic', ar: 'متفائل', en: 'Optimistic', inputs: { ...BASE_INPUTS, dailyOrders: 120, averageTicket: 30, variableCostPct: 32, fixedMonthlyCost: 40000 } },
] as const;

export function isValidInput(key: InputKey, value: number): boolean {
  const rule = INPUT_RULES[key];
  return Number.isFinite(value) && value >= rule.min && value <= rule.max
    && (key !== 'daysPerMonth' || Number.isInteger(value));
}

export function calculateFeasibility(inputs: FeasibilityInputs) {
  for (const key of Object.keys(INPUT_RULES) as InputKey[]) {
    if (!isValidInput(key, inputs[key])) throw new RangeError(`Invalid input: ${key}`);
  }
  const transactions = inputs.dailyOrders * inputs.daysPerMonth;
  const grossSales = transactions * inputs.averageTicket;
  const revenue = grossSales / (1 + VAT_RATE);
  const outputVat = grossSales - revenue;
  const variableCost = revenue * inputs.variableCostPct / 100;
  const contribution = revenue - variableCost;
  const operatingSurplus = contribution - inputs.fixedMonthlyCost;
  const contributionPerOrder = inputs.averageTicket / (1 + VAT_RATE) * (1 - inputs.variableCostPct / 100);
  const breakEvenDaily = inputs.fixedMonthlyCost / contributionPerOrder / inputs.daysPerMonth;
  const reserve = inputs.fixedMonthlyCost * inputs.reserveMonths;
  const funding = inputs.setupCost + inputs.depositAndStock + reserve;
  let cumulativeOperatingSurplus = 0;
  const months = RAMP.map((ramp, index) => {
    const monthlyRevenue = revenue * ramp;
    const monthlyVariableCost = variableCost * ramp;
    const monthlySurplus = monthlyRevenue - monthlyVariableCost - inputs.fixedMonthlyCost;
    cumulativeOperatingSurplus += monthlySurplus;
    return { month: index + 1, ramp, dailyOrders: inputs.dailyOrders * ramp,
      revenue: monthlyRevenue, variableCost: monthlyVariableCost,
      operatingSurplus: monthlySurplus, cumulativeOperatingSurplus,
      closingCash: reserve + cumulativeOperatingSurplus };
  });
  const peakDeficit = Math.max(0, -Math.min(0, ...months.map(month => month.cumulativeOperatingSurplus)));
  return {
    transactions, grossSales, revenue, outputVat, variableCost, contribution,
    operatingSurplus, contributionPerOrder, breakEvenDaily,
    // Remove machine-precision noise only at an exact integer boundary.
    breakEvenWholeDaily: Math.max(0, Math.ceil(breakEvenDaily - 1e-10)),
    operatingMargin: revenue === 0 ? null : operatingSurplus / revenue,
    reserve, funding, months, peakDeficit,
    reserveShortfall: Math.max(0, peakDeficit - reserve),
    minimumCash: reserve - peakDeficit,
    yearRevenue: months.reduce((sum, month) => sum + month.revenue, 0),
    yearOperatingSurplus: cumulativeOperatingSurplus,
    yearClosingCash: reserve + cumulativeOperatingSurplus,
  };
}
