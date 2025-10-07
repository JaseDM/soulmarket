import type {Metadata} from 'next'
import {setRequestLocale} from 'next-intl/server'
import {Link} from '@/i18n/navigation'

type Tier = {
  id: 'web' | 'web_marketing' | 'web_marketing_content'
  name: string
  price: string
  period: string
  features: string[]
  highlight?: boolean
}

type ServicesMessages = {
  metaTitle: string
  hero: {
    badge: string
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
  }
  pricing: {
    title: string
    note: string
    disclaimer: string
    cta: string
    tiers: Tier[]
  }
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params
  const messages = (await import(`@/locales/${locale}/Services.json`))
    .default as ServicesMessages
  return {title: messages.metaTitle}
}

export default async function ServicesPage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)

  const messages = (await import(`@/locales/${locale}/Services.json`))
    .default as ServicesMessages

 

  const {hero, pricing} = messages

  return (
    <main className="min-h-screen bg-background-3 dark:bg-background-5 text-stroke-9 dark:text-stroke-1">
      {/* === HERO =================================================== */}
      <section
        data-ns-animate
        data-offset="0"
        className="relative overflow-hidden pt-[160px] pb-12"
      >
        {/* Líneas de fondo como en About */}
        <div
          className="absolute -z-0 left-1/2 -translate-x-1/2 top-5 h-full main-container flex justify-between gap-[239px] pointer-events-none"
          aria-hidden="true"
        >
          {Array.from({length: 6}).map((_, i) => (
            <div
              key={i}
              data-hero-line
              className="w-px bg-gradient-to-b from-stroke-1 to-stroke-1/30 dark:from-stroke-5 dark:to-stroke-5/30 h-0"
            />
          ))}
        </div>

        <div className="main-container relative z-10 text-center max-w-3xl mx-auto">
          <span
            className="badge badge-green mb-5 opacity-0"
            data-ns-animate
            data-delay="0.05"
          >
            {hero.badge}
          </span>

          <h1
            className="font-medium mb-4 opacity-0"
            data-ns-animate
            data-delay="0.1"
          >
            {hero.title}
          </h1>

          <p
            className="text-lg opacity-0"
            data-ns-animate
            data-delay="0.2"
          >
            {hero.subtitle}
          </p>

          <div
            className="mt-8 flex items-center justify-center gap-3 opacity-0"
            data-ns-animate
            data-delay="0.3"
            data-direction="left"
            data-offset="40"
          >
            <Link href="/contact" className="btn btn-primary btn-lg">
              <span>{hero.ctaPrimary}</span>
            </Link>
            <Link href="/portfolio" className="btn btn-outline btn-lg">
              <span>{hero.ctaSecondary}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* === PRICING =============================================== */}
      <section className="relative border-t border-stroke-4 dark:border-background-5 py-12">
        <div className="main-container">
          <header className="mb-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold" data-ns-animate>
              {pricing.title}
            </h2>
            <p
              className="mt-2 opacity-80"
              data-ns-animate
              data-delay="0.05"
            >
              {pricing.note}
            </p>
          </header>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pricing.tiers.map((tier, i) => (
              <article
                key={tier.id}
                className={[
                  'rounded-2xl border p-6 shadow-sm bg-white/70 dark:bg-background-7/60 backdrop-blur',
                  tier.highlight
                    ? 'border-fuchsia-300 ring-2 ring-fuchsia-300/50 dark:border-fuchsia-600 dark:ring-fuchsia-600/40'
                    : 'border-stroke-4 dark:border-background-5'
                ].join(' ')}
                data-ns-animate
                data-delay={0.05 + i * 0.05}
                data-direction={i === 1 ? 'up' : i === 0 ? 'left' : 'right'}
                data-offset="40"
              >
                <h3 className="text-lg font-semibold">{tier.name}</h3>

                <div className="mt-4">
                  <div className="text-3xl font-bold">{tier.price}</div>
                  <div className="text-sm opacity-70">{tier.period}</div>
                </div>

                <ul className="mt-5 space-y-2 text-sm list-disc ps-5">
                  {tier.features.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-lg border border-stroke-4 dark:border-background-5 bg-white px-4 py-2 text-sm font-medium text-stroke-9 dark:bg-background-8 dark:text-stroke-1 hover:bg-background-2 dark:hover:bg-background-6 transition"
                    aria-label={pricing.cta}
                  >
                    {pricing.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p
            className="mt-6 text-center text-sm opacity-60"
            data-ns-animate
            data-delay="0.1"
          >
            {pricing.disclaimer}
          </p>
        </div>
      </section>
    </main>
  )
}