import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { FeasibilityCalculator } from '../components/feasibility/FeasibilityCalculator';

afterEach(cleanup);

describe('feasibility visitor flow', () => {
  it('updates operating losses and cash needs when a visitor tests zero demand', () => {
    render(<FeasibilityCalculator locale="en" />);
    expect(screen.getByTestId('operating-surplus')).toHaveTextContent('4,730');
    fireEvent.change(screen.getByLabelText('Average daily transactions at steady state'), { target: { value: '0' } });
    expect(screen.getByTestId('operating-surplus')).toHaveTextContent('-38,000');
    expect(screen.getByTestId('year-surplus')).toHaveTextContent('-456,000');
    expect(screen.getByTestId('reserve-shortfall')).toHaveTextContent('342,000');
    expect(screen.getByText(/Cash turns negative/)).toBeInTheDocument();
  });

  it('withholds results for empty or out-of-capacity inputs, then recovers through a preset', () => {
    render(<FeasibilityCalculator locale="en" />);
    const daily = screen.getByLabelText('Average daily transactions at steady state');
    fireEvent.change(daily, { target: { value: '' } });
    expect(daily).toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByTestId('feasibility-results')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Correct the highlighted inputs');
    fireEvent.change(daily, { target: { value: '151' } });
    expect(screen.queryByTestId('feasibility-results')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Optimistic' }));
    expect(daily).toHaveValue(120);
    expect(screen.getByLabelText('Average transaction including VAT — SAR')).toHaveValue(30);
    expect(screen.getByLabelText('Monthly fixed operating cost — SAR')).toHaveValue(40000);
    expect(screen.getByTestId('feasibility-results')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Optimistic' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('offers the same accessible calculator and cash table in Arabic', () => {
    render(<FeasibilityCalculator locale="ar" />);
    expect(screen.getByRole('img', { name: 'رصيد النقد من الافتتاح حتى الشهر الثاني عشر' })).toBeInTheDocument();
    expect(screen.getByRole('table', { name: /12 شهرًا من التشغيل/ })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('الاحتياطي النقدي — أشهر من التكلفة الثابتة'), { target: { value: '0' } });
    expect(screen.getByTestId('initial-funding')).toHaveTextContent('260,000');
    expect(screen.getByTestId('reserve-shortfall')).toHaveTextContent('32,355');
    expect(screen.getByTestId('operating-surplus')).toHaveTextContent('4,730');
    fireEvent.click(screen.getByRole('button', { name: 'أساسي' }));
    expect(screen.getByTestId('initial-funding')).toHaveTextContent('374,000');
  });
});
