import { describe, it, expect } from 'vitest';
import { BASE_INPUTS, calculateFeasibility } from '../lib/feasibility-model';

describe('SUMRA feasibility arithmetic', () => {
  it('separates sales VAT, operating surplus and cash funding', () => {
    const result = calculateFeasibility(BASE_INPUTS);
    expect(result.grossSales).toBe(75600);
    expect(result.revenue).toBeCloseTo(65739.1304347826, 7);
    expect(result.outputVat).toBeCloseTo(9860.8695652174, 7);
    expect(result.variableCost).toBeCloseTo(23008.6956521739, 7);
    expect(result.operatingSurplus).toBeCloseTo(4730.4347826087, 7);
    expect(result.reserve).toBe(114000);
    expect(result.funding).toBe(374000);
    expect(result.breakEvenWholeDaily).toBe(81);
  });
  it('charges all fixed costs during ramp-up and reconciles the full first year', () => {
    const result = calculateFeasibility(BASE_INPUTS);
    expect(result.months).toHaveLength(12);
    expect(result.months[0].operatingSurplus).toBeCloseTo(-14498.2608695652, 7);
    expect(result.yearRevenue).toBeCloseTo(700121.7391304348, 7);
    expect(result.yearOperatingSurplus).toBeCloseTo(-920.8695652174, 7);
    expect(result.yearClosingCash).toBeCloseTo(113079.1304347826, 7);
    // First four ramp factors total 2.8; full fixed costs total SAR 152,000.
    expect(result.peakDeficit).toBeCloseTo(32354.7826086957, 7);
    expect(result.months[3].closingCash).toBeLessThan(result.months[2].closingCash);
    expect(result.months[3].closingCash).toBeLessThan(result.months[4].closingCash);
    expect(result.reserveShortfall).toBe(0);
  });
  it('finds break-even at zero surplus, and rounds a daily target up', () => {
    const base = calculateFeasibility(BASE_INPUTS);
    expect(calculateFeasibility({ ...BASE_INPUTS, dailyOrders: base.breakEvenDaily }).operatingSurplus).toBeCloseTo(0, 7);
    expect(calculateFeasibility({ ...BASE_INPUTS, dailyOrders: 80 }).operatingSurplus).toBeLessThan(0);
    expect(calculateFeasibility({ ...BASE_INPUTS, dailyOrders: 81 }).operatingSurplus).toBeGreaterThan(0);
  });
  it('handles zero sales, zero fixed costs and insufficient reserves without nonfinite results', () => {
    const zeroSales = calculateFeasibility({ ...BASE_INPUTS, dailyOrders: 0 });
    expect(zeroSales.operatingMargin).toBeNull();
    expect(zeroSales.yearOperatingSurplus).toBe(-456000);
    expect(zeroSales.reserveShortfall).toBe(342000);
    const zeroFixed = calculateFeasibility({ ...BASE_INPUTS, dailyOrders: 0, fixedMonthlyCost: 0 });
    expect(zeroFixed.breakEvenWholeDaily).toBe(0);
    expect(zeroFixed.yearClosingCash).toBe(0);
  });
  it('changes financing needs and cash, but not operating results, when reserves change', () => {
    const base = calculateFeasibility(BASE_INPUTS);
    const withoutReserve = calculateFeasibility({ ...BASE_INPUTS, reserveMonths: 0 });
    expect(withoutReserve.yearOperatingSurplus).toBe(base.yearOperatingSurplus);
    expect(base.funding - withoutReserve.funding).toBe(114000);
    expect(withoutReserve.reserveShortfall).toBeCloseTo(base.peakDeficit, 7);
  });
  it.each([
    { dailyOrders: -1 }, { dailyOrders: 151 }, { averageTicket: 0 },
    { daysPerMonth: 2.5 }, { variableCostPct: 100 }, { fixedMonthlyCost: NaN },
    { setupCost: Infinity }, { reserveMonths: -1 },
  ])('rejects invalid commercial inputs: %j', change => {
    expect(() => calculateFeasibility({ ...BASE_INPUTS, ...change })).toThrow(RangeError);
  });
});
