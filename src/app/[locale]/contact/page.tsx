import {setRequestLocale} from 'next-intl/server'
import {createTranslator} from 'next-intl'
import type {AbstractIntlMessages} from 'next-intl'
import ContactForm, {type ContactFormI18n} from './ContactForm'
import Tetris from '@/components/interactive/Tetris'
import Image from 'next/image'

export default async function ContactPage({
  params
}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  setRequestLocale(locale)

  // Carga SOLO los mensajes de esta página (no cambiamos claves)
  const messages = (await import(`@/locales/${locale}/Contact.json`))
    .default as AbstractIntlMessages

  const t = (await createTranslator({
    locale,
    messages: {Contact: messages},
    namespace: 'Contact'
  })) as (key: string, values?: Record<string, unknown>) => string

  const brand = 'SoulMarket'

  return (
    <main className="relative min-h-screen bg-background-3 dark:bg-background-5 text-stroke-9 dark:text-stroke-1">
      {/* === HERO (mismo patrón que About) =============================== */}
      <section
        /* sin data-ns-animate aquí */
        data-offset="0"
        className="relative overflow-hidden pt-[160px] pb-16 lg:pb-[100px]"
      >
        {/* Líneas verticales del hero (sin animar) */}
        <div
          className="absolute -z-0 left-1/2 -translate-x-1/2 top-5 h-full main-container flex justify-between gap-[239px] pointer-events-none"
          aria-hidden="true"
        >
          {Array.from({length: 6}).map((_, i) => (
            <div
              key={i}
              data-hero-line
              data-instant="true"
              className="w-px bg-gradient-to-b from-stroke-1 to-stroke-1/30 dark:from-stroke-5 dark:to-stroke-5/30 h-0"
            />
          ))}
        </div>

  {/* BG dots sutil (SIN data-ns-animate) */}
  <div
    className="absolute z-0 pointer-events-none top-[10%] left-1/2 -translate-x-1/2 w-[698px] h-[235px] opacity-80"
    aria-hidden
  >
    <Image
      src="/images/gradient/hero-dot-bg.png"
      alt=""
      fill
      priority
      className="object-cover"
    />
  </div>

  {/* Contenido hero (solo estos hijos animan) */}
  <div className="main-container relative z-10 text-center max-w-3xl mx-auto">
    <span
      className="badge badge-green mb-5 opacity-0 blur-[3px]"
      data-ns-animate
      data-delay="0.05"
    >
      {t('hero.badge')}
    </span>

    <h1
      className="font-medium mb-4 opacity-0 blur-[3px]"
      data-ns-animate
      data-delay="0.10"
    >
      {t('hero.title', {brand})}
    </h1>

    <p
      className="text-lg opacity-0 blur-[3px]"
      data-ns-animate
      data-delay="0.15"
    >
      {t('hero.description')}
    </p>
  </div>
</section>

      <section className="main-container py-10">
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
    {[
      {
        title: t('cards.email.title'),
        value: 'info@soulmarket.es',
        href: 'mailto:info@soulmarket.es',
        icon: <MailIcon className="h-6 w-6" />,
        gradient: 'from-cyan-500 via-fuchsia-500 to-indigo-500'
      },
      {
        title: t('cards.phone.title'),
        value: '+34 625 030 452',
        href: 'tel:+34625030452',
        icon: <PhoneIcon className="h-6 w-6" />,
        gradient: 'from-emerald-500 via-cyan-500 to-blue-500'
      },
      {
        title: t('cards.whatsapp.title'),
        value: '+34 625 030 452',
        href: 'https://wa.me/34625030452',
        icon: <WhatsappIcon className="h-6 w-6" />,
        gradient: 'from-lime-500 via-emerald-500 to-cyan-500'
      },
      {
        title: t('cards.hours.title'),
        value: t('cards.hours.value'),
        href: '#form',
        icon: <ClockIcon className="h-6 w-6" />,
        gradient: 'from-violet-500 via-fuchsia-500 to-rose-500'
      }
    ].map((cfg, i) => (
      <ContactCard key={cfg.title} {...cfg} delay={0.05 + i * 0.05} />
    ))}
  </div>
</section>

      {/* === FORM + LATERAL (paneles a juego con About) ================== */}
      <section className="main-container py-16">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* FORM */}
          <div id="form" className="relative">
            {/* halo */}
            <div
              className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-primary-500/20 via-primary-400/15 to-fuchsia-500/15 blur-xl dark:from-primary-500/30 dark:via-primary-400/25 dark:to-fuchsia-500/20"
              aria-hidden
            />
            <div
              className="relative rounded-3xl border border-stroke-4 dark:border-background-5 bg-white/70 dark:bg-background-7/60 p-6 lg:p-8 shadow-xl backdrop-blur"
              data-ns-animate
              data-direction="up"
              data-offset="60"
            >
              <h2 className="text-2xl font-bold opacity-0 blur-[3px]" data-ns-animate data-delay="0.05">
                {t('form.title')}
              </h2>
              <p className="mt-1 mb-6 text-sm opacity-70 opacity-0 blur-[3px]" data-ns-animate data-delay="0.1">
                {t('form.subtitle')}
              </p>

              {/* Pasamos solo el subárbol del formulario como i18n (sin tocar claves) */}
              <ContactForm i18n={messages.form as ContactFormI18n} />
            </div>
          </div>

          {/* LATERAL: demo/Mapa/widget */}
          <div
            className="rounded-3xl border border-stroke-4 dark:border-background-5 bg-white/70 dark:bg-background-7/60 p-6 lg:p-8 backdrop-blur"
            data-ns-animate
            data-direction="up"
            data-delay="0.1"
            data-offset="60"
          >
            <div className="rounded-2xl overflow-hidden opacity-0 blur-[3px]" data-ns-animate data-delay="0.15">
              <Tetris />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

/* ============ Tarjeta de contacto (UI helper alineado a About) ======= */
function ContactCard({
  title,
  value,
  href,
  icon,
  gradient,
  delay = 0
}: {
  title: string
  value: string
  href?: string
  icon: React.ReactNode
  gradient: string
  delay?: number
}) {
  type CSSVars = React.CSSProperties & {['--gbg']?: string}
  const style: CSSVars = {['--gbg']: gradient}

  const inner = (
    <div
      className="gradient-border h-full opacity-0 blur-[3px]"
      style={style}
      data-ns-animate
      data-direction="up"
      data-offset="30"
      data-delay={delay}
    >
      <div className="relative z-[1] flex h-full flex-col justify-between overflow-hidden rounded-[calc(1rem-1px)] border border-stroke-4 dark:border-background-5 bg-white/70 dark:bg-background-7/60 p-6 shadow-sm backdrop-blur transition hover:border-primary-500/30">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-2xl opacity-60"
        />
        <div className="relative">
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-background-2 text-primary-600 ring-1 ring-inset ring-stroke-3 dark:bg-background-8 dark:text-primary-300 dark:ring-background-5">
            {icon}
          </div>
          <div className="text-sm opacity-70">{title}</div>
        </div>
        <div className="mt-4 text-lg font-semibold">{value}</div>
      </div>
    </div>
  )

  return href ? (
    <a href={href} className="group block h-full">{inner}</a>
  ) : (
    <div className="group block h-full">{inner}</div>
  )
}

/* ============ Iconos ============ */
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M20 4H4a2 2 0 00-2 2v.4l10 6 10-6V6a2 2 0 00-2-2z" />
      <path d="M22 8.2l-10 6-10-6V18a2 2 0 002 2h16a2 2 0 002-2V8.2z" />
    </svg>
  )
}
function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M6.6 10.8a15.9 15.9 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.24c1.2.48 2.5.74 3.8.74a1 1 0 011 1V20a2 2 0 01-2 2C10.3 22 2 13.7 2 3a2 2 0 012-2h3.3a1 1 0 011 1c0 1.3.26 2.6.74 3.8a1 1 0 01-.24 1.1L6.6 10.8z" />
    </svg>
  )
}
function WhatsappIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M128.2 25C71.5 25 25.5 70.9 25.5 127.5c0 22.6 6.2 44.5 18 63.4L24 231.9l42.1-13.8c18.3 10 39 15.3 60.1 15.3 56.6 0 102.5-45.9 102.5-102.5S184.8 25 128.2 25zm0 186.4c-18.9 0-37.4-5-53.5-14.6l-3.8-2.3-25 8.2 8.2-24.4-2.5-4c-10.5-16.6-16-35.8-16-55.3 0-56 45.6-101.6 101.6-101.6s101.6 45.6 101.6 101.6-45.6 101.6-101.6 101.6zm58.7-72.7c-3.2-1.6-18.9-9.3-21.8-10.4-2.9-1.1-5-1.6-7.1 1.6-2.1 3.2-8.1 10.4-9.9 12.5-1.8 2.1-3.7 2.4-6.9.8-3.2-1.6-13.3-4.9-25.3-15.6-9.3-8.3-15.6-18.5-17.4-21.7-1.8-3.2-.2-5 1.3-6.6 1.3-1.3 3.2-3.7 4.8-5.6 1.6-1.9 2.1-3.2 3.2-5.3 1.1-2.1.5-4-0.3-5.6-.8-1.6-7.1-17-9.8-23.3-2.6-6.2-5.2-5.4-7.1-5.5-1.8-.1-4-.1-6.1-.1s-5.6.8-8.5 4c-2.9 3.2-11 10.7-11 26.1s11.3 30.2 12.9 32.3c1.6 2.1 22.2 33.9 54.2 47.5 7.6 3.3 13.5 5.2 18.1 6.7 7.6 2.4 14.5 2.1 20 1.3 6.1-0.9 18.9-7.7 21.6-15.2 2.7-7.5 2.7-14 1.9-15.2-.8-1.3-2.9-2.1-6.1-3.7z" />
    </svg>
  )
}
function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="9" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
