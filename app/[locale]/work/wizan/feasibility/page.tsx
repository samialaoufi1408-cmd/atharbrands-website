import type { Locale } from '@/content/site';
import { getPortfolioFeasibility } from '@/content/feasibility/studies';
import { PortfolioFeasibilityStudy } from '@/components/feasibility/PortfolioFeasibilityStudy';
import { feasibilityMetadata } from '@/lib/feasibility-metadata';

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  return feasibilityMetadata(params.locale, 'wizan');
}

export default function FeasibilityPage({ params }: { params: { locale: Locale } }) {
  return <PortfolioFeasibilityStudy locale={params.locale} study={getPortfolioFeasibility('wizan')} />;
}
