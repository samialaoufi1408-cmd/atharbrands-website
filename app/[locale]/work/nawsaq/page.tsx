import type { Locale } from '@/content/site';
import { BusinessCase } from '@/components/case-studies/BusinessCase';
import { caseMetadata } from '@/lib/case-metadata';

type Props = { params: { locale: Locale } };

export function generateMetadata({ params }: Props) {
  return caseMetadata(params.locale, 'nawsaq');
}

export default function NawsaqCase({ params }: Props) {
  return <BusinessCase slug="nawsaq" locale={params.locale}/>;
}
