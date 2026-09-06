import { describe, expect, it } from 'vitest';
import { getPortfolioFeasibility, PORTFOLIO_FEASIBILITY } from '../content/feasibility/studies';
import { calculatePortfolioModel, type ModelInputs } from '../lib/portfolio-feasibility-model';

const run = (slug: string, changes: ModelInputs = {}) => {
  const config = getPortfolioFeasibility(slug).model;
  return calculatePortfolioModel(config, { ...config.base, ...changes })!;
};

describe('Sector-specific feasibility and cash accounting', () => {
  // Reference totals independently calculated with Python Decimal, not rounded monthly cells.
  it.each([
    ['athrbrands', 225000, 723600, 2700, 65700, 18900, 72000],
    ['awwal-nafha', 368000, 912000, -2400, 165600, 103200, 0],
    ['tatabu', 410000, 1080000, -78000, 69500, 28875, 112500],
    ['dahsha', 556000, 1287000, -59460, 140540, 112940, 0],
    ['nabra', 1445000, 1375400, -192172, 467828, 404547, 0],
  ] as const)('reconciles %s revenue, operating surplus, cash and receivables', (slug, funding, revenue, surplus, cash, low, receivables) => {
    const r = run(slug);
    expect(r.funding).toBe(funding);
    expect(r.yearRevenue).toBeCloseTo(revenue, 6);
    expect(r.surplus).toBeCloseTo(surplus, 6);
    expect(r.closingCash).toBeCloseTo(cash, 6);
    expect(r.minimumCash).toBeCloseTo(low, 6);
    expect(r.receivables).toBeCloseTo(receivables, 6);
  });

  it('distinguishes performed services from delayed cash, including the year-end debtor', () => {
    const immediate = run('athrbrands', { collectionLag: 0 });
    const delayed = run('athrbrands', { collectionLag: 2 });
    expect(delayed.surplus).toBeCloseTo(immediate.surplus, 7);
    expect(delayed.months[0].receipts).toBe(0);
    expect(delayed.months[1].receipts).toBe(0);
    expect(delayed.months[2].receipts).toBeCloseTo(28800, 7);
    expect(delayed.receivables).toBe(144000);
    expect(immediate.closingCash - delayed.closingCash).toBeCloseTo(144000, 7);
    expect(delayed.extraFunding).toBeGreaterThan(0);
  });

  it('models subscriber cohorts, acquisition spending and the first-year loss', () => {
    const r = run('wizan');
    expect(r.months[0].volume).toBe(155);
    expect(r.months[0].revenue).toBe(10695);
    expect(r.months[0].costs).toBe(29550);
    expect(r.months[11].volume).toBeCloseTo(605.6039035710993, 9);
    expect(r.steadySurplus).toBeCloseTo(7730.630310694861, 6);
    expect(r.yearRevenue).toBeCloseTo(330753.28241828876, 6);
    expect(r.surplus).toBeCloseTo(-53181.97590320236, 6);
    expect(r.minimumCash).toBeCloseTo(103363.73382254297, 6);
    expect(r.breakEven).toBe(475);
    expect(r.funding).toBe(356000);
  });

  it('applies churn only to previous users and identifies impossible subscriber economics', () => {
    const completeChurn = run('wizan', { startingUsers: 100, newUsers: 10, churnPct: 100 });
    expect(completeChurn.months.every(m => m.volume === 10)).toBe(true);
    const noNew = run('wizan', { startingUsers: 100, newUsers: 0, churnPct: 0 });
    expect(noNew.months.every(m => m.volume === 100)).toBe(true);
    expect(noNew.months[0].costs).toBe(23000);
    expect(run('wizan', { variablePerUser: 69 }).breakEven).toBeNull();
    expect(run('wizan', { variablePerUser: 100 }).breakEven).toBeNull();
  });

  it('budgets every development cost and exposes a pre-sales funding shortfall', () => {
    const r = run('rahb-aldar');
    expect(r.months).toHaveLength(24);
    expect(r.months.slice(0, 18).every(m => m.receipts === 0)).toBe(true);
    expect(r.months.map(m => m.volume).reduce((a, b) => a + b, 0)).toBe(10);
    expect(r.months.every(m => Number.isInteger(m.volume))).toBe(true);
    expect(r.yearRevenue).toBe(8500000);
    expect(r.totalCosts).toBe(7447000);
    expect(r.surplus).toBe(1053000);
    expect(r.peakDeficit).toBe(7084000);
    expect(r.minimumCash).toBe(-1084000);
    expect(r.extraFunding).toBe(1084000);
    expect(r.closingCash).toBe(7053000);
    expect(r.breakEven).toBe(9);
    expect(r.breakEvenPrice).toBeCloseTo(741443.2989690722, 6);
  });

  it('keeps unsold construction costs and assigns no invented residual receipts', () => {
    const r = run('rahb-aldar', { soldUnits: 8 });
    expect(r.unsoldUnits).toBe(2);
    expect(r.yearRevenue).toBe(6800000);
    expect(r.totalCosts).toBe(7396000);
    expect(r.surplus).toBe(-596000);
    const none = run('rahb-aldar', { soldUnits: 0 });
    expect(none.yearRevenue).toBe(0);
    expect(none.totalCosts).toBe(7192000);
    expect(none.breakEvenPrice).toBeNull();
    expect(none.unsoldUnits).toBe(10);
  });

  it('shifts sales and adds overhead when closing is delayed, without changing construction', () => {
    const base = run('rahb-aldar');
    const delayed = run('rahb-aldar', { delay: 3 });
    expect(delayed.months).toHaveLength(27);
    expect(delayed.months.find(m => m.receipts > 0)?.month).toBe(22);
    expect(delayed.yearRevenue).toBe(base.yearRevenue);
    expect(delayed.totalCosts - base.totalCosts).toBe(54000);
    expect(delayed.peakDeficit - base.peakDeficit).toBe(54000);
  });

  it('changes cash but never creates revenue when funding or reserve is increased', () => {
    const a = run('rahb-aldar'), b = run('rahb-aldar', { funding: 8000000 });
    expect(b.yearRevenue).toBe(a.yearRevenue);
    expect(b.surplus).toBe(a.surplus);
    expect(b.closingCash - a.closingCash).toBe(2000000);
    expect(b.extraFunding).toBe(0);
    expect(run('nabra', { reserveMonths: 0 }).surplus).toBe(run('nabra').surplus);
    expect(run('nabra', { reserveMonths: 0 }).extraFunding).toBeCloseTo(255453, 6);
  });

  it.each([
    ['nabra', { volume: 1001 }], ['dahsha', { price: 0 }], ['athrbrands', { fixed: NaN }],
    ['awwal-nafha', { setup: Infinity }], ['tatabu', { collectionLag: 1.5 }],
    ['wizan', { churnPct: 101 }], ['wizan', { newUsers: -1 }],
    ['rahb-aldar', { soldUnits: 11 }], ['rahb-aldar', { delay: 1.5 }],
  ] as [string, ModelInputs][])('rejects invalid inputs for %s: %j', (slug, changes) => {
    expect(run(slug, changes)).toBeNull();
  });

  it('has valid, distinct scenarios for all seven new studies', () => {
    expect(new Set(PORTFOLIO_FEASIBILITY.map(s => s.slug)).size).toBe(7);
    for (const { model } of PORTFOLIO_FEASIBILITY) for (const scenario of ['conservative', 'base', 'optimistic'] as const) {
      const result = calculatePortfolioModel(model, model[scenario]);
      expect(result).not.toBeNull();
      expect(Number.isFinite(result!.closingCash)).toBe(true);
      expect(result!.months.length).toBeGreaterThanOrEqual(12);
    }
  });
});
