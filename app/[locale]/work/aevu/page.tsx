import type { Locale } from '@/content/site';
import { caseMetadata } from '@/lib/case-metadata';
import { CompleteStudy, type Study } from '@/components/case-studies/CompleteStudy';
import study from '@/content/studies/aevu.json';

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  return caseMetadata(params.locale, 'aevu');
}

export default function CasePage({ params }: { params: { locale: Locale } }) {
  return <CompleteStudy study={study as Study} locale={params.locale} />;
}
