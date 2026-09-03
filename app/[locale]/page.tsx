import { notFound } from 'next/navigation';
import { Locale, locales } from '@/content/site';
import { StudioHomeV4 } from '@/components/sections/StudioHomeV4';
import { SumraWorkInjector } from '@/components/sections/SumraWorkInjector';
import { WorkGridDeduper } from '@/components/sections/WorkGridDeduper';
import layout from './home-v4-overrides.module.css';

export const revalidate = 300;

export default function Page({ params }: { params: { locale: string } }) {
  if (!locales.includes(params.locale as Locale)) notFound();
  const locale=params.locale as Locale;
  return (
    <div className={layout.scope}>
      <StudioHomeV4 locale={locale} />
      <SumraWorkInjector locale={locale} />
      <WorkGridDeduper locale={locale} />
    </div>
  );
}
