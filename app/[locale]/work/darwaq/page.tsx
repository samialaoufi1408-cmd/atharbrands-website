import type { Locale } from '@/content/site';
import { BusinessCase } from '@/components/case-studies/BusinessCase';
import { caseMetadata } from '@/lib/case-metadata';

type Props = { params: { locale: Locale } };

export function generateMetadata({ params }: Props) {
  return caseMetadata(params.locale, 'darwaq');
}

export default function DarwaqCase({ params }: Props) {
  return <BusinessCase slug="darwaq" locale={params.locale}/>;
}
