import {NextIntlClientProvider} from 'next-intl'
import type {AbstractIntlMessages} from 'next-intl'
import {setRequestLocale} from 'next-intl/server'
import Header from '@/components/Header'
import '../globals.css'
import ThemeToggle from '@/components/ThemeToggle'
import Script from 'next/script'
import CommonScripts from '@/components/CommonScripts'

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)

  // Cargar mensajes compartidos (Header + Common)
  const header = (await import(`@/locales/${locale}/Header.json`)).default as AbstractIntlMessages
  const common = (await import(`@/locales/${locale}/Common.json`)).default as AbstractIntlMessages

  const shared: AbstractIntlMessages = {
    Header: header,
    Common: common
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-200 transition-colors duration-500">
        <NextIntlClientProvider locale={locale} messages={shared}>
          <Header />
          {children}
          <ThemeToggle />
        </NextIntlClientProvider>
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
  )
}