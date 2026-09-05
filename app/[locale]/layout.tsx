import type { Metadata } from 'next';
import { locales, Locale } from '@/content/site';
import { LightboxProvider } from '@/components/fx/Lightbox';
import { LightboxRoot } from '@/components/fx/Lightbox';
import { FloatingContact } from '@/components/sections/ProjectContact';
import { SITE_URL } from '@/lib/case-metadata';
import { notFound } from 'next/navigation';
import '../globals.css';
import '../v4-arrow.css';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function htmlAttrs(locale: Locale) {
  return locale === 'ar'
    ? { lang: 'ar', dir: 'rtl' as const, className: 'font-ar' }
    : { lang: 'en', dir: 'ltr' as const, className: 'font-sans' };
}

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const ar = params.locale === 'ar';
  return {
    metadataBase: new URL(SITE_URL),
    title: ar
      ? 'أثر | استراتيجية وتصميم الهويات البصرية'
      : 'ATHRBRANDS | Brand Strategy & Visual Identity',
    description: ar
      ? 'استوديو سعودي متخصص في استراتيجية العلامة وتصميم الهوية البصرية للعلامات الطموحة.'
      : 'A Saudi studio specializing in brand strategy and visual identity systems for ambitious brands.',
    alternates: {
      canonical: `/${params.locale}`,
      languages: { en: '/en', ar: '/ar' },
    },
    openGraph: {
      type: 'website',
      locale: ar ? 'ar_SA' : 'en_US',
      siteName: 'ATHRBRANDS',
      title: ar
        ? 'أثر | استراتيجية وتصميم الهويات البصرية'
        : 'ATHRBRANDS | Brand Strategy & Visual Identity',
      description: ar
        ? 'نحوّل الفكرة إلى نظام بصري واضح ومتماسك، من التموضع إلى كل نقطة تواصل.'
        : 'We turn ideas into clear, coherent visual systems—from positioning to every meaningful touchpoint.',
      images: ['/assets/aura-featured.png'],
    },
    icons: {
      icon: '/favicon.svg',
      apple: '/apple-touch-icon.png',
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  if (!locales.includes(params.locale)) notFound();
  const attrs = htmlAttrs(params.locale);
  return (
    <html lang={attrs.lang} dir={attrs.dir} className={attrs.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=IBM+Plex+Sans+Arabic:wght@300;400;500&family=Manrope:wght@300;400;500&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'ATHRBRANDS',
              alternateName: 'أثر لصناعة الهويات البصرية',
              url: SITE_URL,
              description:
                params.locale === 'ar'
                  ? 'استوديو سعودي لاستراتيجية العلامة وتصميم الهوية البصرية'
                  : 'Saudi brand strategy and visual identity studio',
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'Riyadh',
                addressCountry: 'SA',
              },
              areaServed: ['Saudi Arabia', 'GCC'],
              email: 'admin@athrbrands.com',
              sameAs: ['https://www.linkedin.com/in/sami-alaoufi'],
            }),
          }}
        />
      </head>
      <body>
        <LightboxProvider>
          {children}
          <FloatingContact locale={params.locale} />
          <LightboxRoot />
        </LightboxProvider>
      </body>
    </html>
  );
}
