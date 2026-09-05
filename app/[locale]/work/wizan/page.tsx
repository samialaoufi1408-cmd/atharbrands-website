import type { Locale } from '@/content/site';
import { caseMetadata } from '@/lib/case-metadata';
import { CompleteStudy, type Study } from '@/components/case-studies/CompleteStudy';
import study from '@/content/studies/wizan.json';

export function generateMetadata({ params }: { params: { locale: Locale } }) {
  return caseMetadata(params.locale, 'wizan');
}

export default function CasePage({ params }: { params: { locale: Locale } }) {
  return <CompleteStudy study={study as Study} locale={params.locale} />;
}
