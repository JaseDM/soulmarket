// src/app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import type {AbstractIntlMessages} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';
import Header from '@/components/Header';
import '../globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import Script from 'next/script';
import CommonScripts from '@/components/CommonScripts';

const SUPPORTED_LOCALES = ['es', 'en'] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string}; // ✅ síncrono; sin Promise<>
}) {
  // ✅ Normaliza/valida el locale
  const raw = params.locale ?? 'es';
  const locale: Locale = (SUPPORTED_LOCALES.includes(raw as Locale) ? raw : 'es') as Locale;

  setRequestLocale(locale);

  // ✅ Carga robusta de mensajes con fallback
  const loadNs = async (ns: 'Header' | 'Common'): Promise<AbstractIntlMessages> => {
    try {
      const mod = await import(`@/locales/${locale}/${ns}.json`);
      return mod.default as AbstractIntlMessages;
    } catch {
      // Fallback a ES si faltara el archivo del locale actual
      const mod = await import(`@/locales/es/${ns}.json`);
      return mod.default as AbstractIntlMessages;
    }
  };

  const [header, common] = await Promise.all([loadNs('Header'), loadNs('Common')]);

  const messages: AbstractIntlMessages = {
    Header: header,
    Common: common
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200 transition-colors duration-500">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
          <ThemeToggle />
        </NextIntlClientProvider>

        {/* Scripts de vendors (ubicados en /public/vendor) */}
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