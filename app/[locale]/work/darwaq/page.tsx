import { permanentRedirect } from 'next/navigation';
import type { Locale } from '@/content/site';

export default function LegacyCase({ params }: { params: { locale: Locale } }) {
  permanentRedirect(`/${params.locale}/work/tatabu`);
}
