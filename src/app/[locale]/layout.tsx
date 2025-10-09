// src/app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import type {AbstractIntlMessages} from 'next-intl';
import type {Metadata} from 'next';
import Header from '@/components/Header';
import ThemeToggle from '@/components/ThemeToggle';
import Script from 'next/script';
import CommonScripts from '@/components/CommonScripts';
import '../globals.css';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://soulmarket.es';
const SUPPORTED_LOCALES = ['es', 'en'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

// --- Metadata por-locale ---
// 🔧 params es Promise y se debe await-ear antes de leer
export async function generateMetadata(
  {params}: {params: Promise<{locale: string}>}
): Promise<Metadata> {
  const {locale: raw} = await params;
  const locale: Locale = (SUPPORTED_LOCALES.includes(raw as Locale) ? raw : 'es') as Locale;

  const TITLE =
    locale === 'es'
      ? 'SoulMarket · Desarrollo & Marketing Digital'
      : 'SoulMarket · Development & Digital Marketing';

  const DESC =
    locale === 'es'
      ? 'Creamos webs, e-commerce y apps; infra, automatización y marketing para tu negocio.'
      : 'We build websites, e-commerce & apps; infra, automation and marketing for your business.';

  const canonical = locale === 'es' ? `${SITE}/` : `${SITE}/en`;

  return {
    metadataBase: new URL(SITE),
    title: TITLE,
    description: DESC,
    alternates: {
      canonical,
      languages: {
        es: `${SITE}/`,
        'es-ES': `${SITE}/`,
        en: `${SITE}/en`,
        'en-GB': `${SITE}/en`
      }
    },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: 'SoulMarket',
      title: TITLE,
      description: DESC,
      locale: locale === 'es' ? 'es_ES' : 'en_GB',
      alternateLocale: locale === 'es' ? ['en_GB'] : ['es_ES'],
      images: [{url: '/opengraph-image.png', width: 1200, height: 630, alt: 'SoulMarket'}]
    },
    twitter: {
      card: 'summary_large_image',
      title: TITLE,
      description: DESC,
      images: ['/twitter-image.png']
    }
  };
}

// --- Layout por-locale ---
// 👇 params también es Promise y lo await-eamos
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale: raw} = await params;
  const locale: Locale = (SUPPORTED_LOCALES.includes(raw as Locale) ? raw : 'es') as Locale;

  setRequestLocale(locale);

  // Carga segura de mensajes (Header/Common como ejemplo)
  const loadNs = async (ns: 'Header' | 'Common'): Promise<AbstractIntlMessages> => {
    try {
      return (await import(`@/locales/${locale}/${ns}.json`)).default as AbstractIntlMessages;
    } catch {
      return (await import(`@/locales/es/${ns}.json`)).default as AbstractIntlMessages;
    }
  };

  const [header, common] = await Promise.all([loadNs('Header'), loadNs('Common')]);
  const messages: AbstractIntlMessages = {Header: header, Common: common};

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200 transition-colors duration-500">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
          <ThemeToggle />
        </NextIntlClientProvider>

        {/* Vendors (si los usas) */}
        <Script src="/vendor/draw-svg.min.js" strategy="beforeInteractive" />
        <Script src="/vendor/motionpathplugin.min.js" strategy="beforeInteractive" />
        <Script src="/vendor/number-counter.js" strategy="beforeInteractive" />
        <Script src="/vendor/scroll-trigger.min.js" strategy="beforeInteractive" />
        <Script src="/vendor/split-text.min.js" strategy="beforeInteractive" />
        <Script src="/vendor/springer.min.js" strategy="beforeInteractive" />
        <Script src="/vendor/stack-card.min.js" strategy="beforeInteractive" />
        <Script src="/vendor/vanilla-infinite-marquee.min.js" strategy="beforeInteractive" />

        <CommonScripts />
      </body>
    </html>
  );
}