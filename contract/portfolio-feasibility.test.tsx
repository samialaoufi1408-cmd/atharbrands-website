import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { getPortfolioFeasibility, PORTFOLIO_FEASIBILITY } from '../content/feasibility/studies';
import { PortfolioCalculator } from '../components/feasibility/PortfolioCalculator';
import { PortfolioFeasibilityStudy } from '../components/feasibility/PortfolioFeasibilityStudy';
import FeasibilityServicePage from '../app/[locale]/services/feasibility/page';
import { feasibilityMetadata } from '../lib/feasibility-metadata';
import { CASE_SLUGS } from '../lib/case-metadata';

afterEach(cleanup);

describe('Portfolio feasibility visitor journeys', () => {
  it('lets a visitor test delayed collections, rejects empty input and restores a complete preset', () => {
    render(<PortfolioCalculator locale="en" slug="athrbrands" config={getPortfolioFeasibility('athrbrands').model} />);
    expect(screen.getByTestId('receivables')).toHaveTextContent('72,000');
    fireEvent.change(screen.getByLabelText('Collection delay after delivery — months'), { target: { value: '2' } });
    expect(screen.getByTestId('receivables')).toHaveTextContent('144,000');
    const price = screen.getByLabelText('Average unit revenue excluding VAT — SAR');
    fireEvent.change(price, { target: { value: '' } });
    expect(screen.queryByTestId('portfolio-results')).not.toBeInTheDocument();
    expect(price).toHaveAttribute('aria-invalid', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Base' }));
    expect(price).toHaveValue(12000);
    expect(screen.getByTestId('receivables')).toHaveTextContent('72,000');
  });

  it('shows subscription churn effects and warnings without invalid break-even numbers', () => {
    render(<PortfolioCalculator locale="en" slug="wizan" config={getPortfolioFeasibility('wizan').model} />);
    expect(screen.getByTestId('active-users')).toHaveTextContent('605.6');
    fireEvent.change(screen.getByLabelText('Monthly churn of previous subscribers — %'), { target: { value: '100' } });
    expect(screen.getByTestId('active-users')).toHaveTextContent('60');
    fireEvent.change(screen.getByLabelText('Monthly service cost per subscriber — SAR'), { target: { value: '69' } });
    expect(screen.getByTestId('break-even')).toHaveTextContent('—');
    expect(screen.getByText(/No break-even exists/)).toBeInTheDocument();
  });

  it('exposes the development funding gap, retains unsold units and prevents selling more than built in Arabic', () => {
    render(<PortfolioCalculator locale="ar" slug="rahb-aldar" config={getPortfolioFeasibility('rahb-aldar').model} />);
    expect(screen.getByTestId('extra-funding')).toHaveTextContent('1,084,000');
    const sold = screen.getByLabelText('الوحدات المباعة ضمن الأفق');
    fireEvent.change(sold, { target: { value: '8' } });
    expect(screen.getByTestId('unsold-units')).toHaveTextContent('2');
    expect(screen.getByTestId('project-surplus')).toHaveTextContent('596,000');
    fireEvent.change(sold, { target: { value: '11' } });
    expect(sold).toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByTestId('portfolio-results')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'أساسي' }));
    expect(screen.getByRole('img', { name: 'مسار الرصيد النقدي بالريال' })).toBeInTheDocument();
    expect(screen.getByTestId('project-surplus')).toHaveTextContent('1,053,000');
  });

  it('provides complete localized studies with working chapter links and the correct identity destination', () => {
    for (const study of PORTFOLIO_FEASIBILITY) for (const locale of ['ar', 'en'] as const) {
      const doc = new DOMParser().parseFromString(renderToStaticMarkup(<PortfolioFeasibilityStudy locale={locale} study={study} />), 'text/html');
      const chapters = doc.querySelectorAll('nav[aria-label$="study contents"] a, nav[aria-label="فهرس دراسة الجدوى"] a');
      expect(chapters).toHaveLength(10);
      chapters.forEach(link => expect(doc.querySelector(link.getAttribute('href')!)).not.toBeNull());
      expect(doc.querySelector(`footer a[href="/${locale}/work/${study.slug}"]`)).not.toBeNull();
      expect(doc.querySelector(`a[href="/${locale === 'ar' ? 'en' : 'ar'}/work/${study.slug}/feasibility"]`)).not.toBeNull();
      expect(doc.querySelectorAll('#sources a[target="_blank"]').length).toBeGreaterThanOrEqual(2);
      expect(doc.querySelector('[data-testid="portfolio-results"]')).not.toBeNull();
      const metadata = feasibilityMetadata(locale, study.slug as typeof CASE_SLUGS[number]);
      expect(metadata.alternates?.canonical).toBe(`/${locale}/work/${study.slug}/feasibility`);
      expect(String(metadata.title)).toContain(study.name[locale]);
    }
  });

  it('makes all eight studies discoverable from the service catalog in both languages', () => {
    for (const locale of ['ar', 'en'] as const) {
      const doc = new DOMParser().parseFromString(renderToStaticMarkup(<FeasibilityServicePage params={{ locale }} />), 'text/html');
      for (const slug of CASE_SLUGS) {
        expect(doc.querySelector(`#studies a[href="/${locale}/work/${slug}/feasibility"]`)).not.toBeNull();
        expect(doc.querySelector(`#studies a[href="/${locale}/work/${slug}"]`)).not.toBeNull();
      }
    }
  });
});
