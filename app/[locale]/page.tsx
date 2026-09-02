import { notFound } from 'next/navigation';
import { Locale, locales } from '@/content/site';
import { StudioHomeV4 } from '@/components/sections/StudioHomeV4';

export const revalidate = 300;

export default function Page({ params }: { params: { locale: string } }) {
  if (!locales.includes(params.locale as Locale)) notFound();
  return <StudioHomeV4 locale={params.locale as Locale} />;
}
