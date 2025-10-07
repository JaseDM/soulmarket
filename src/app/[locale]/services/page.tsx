import {setRequestLocale} from 'next-intl/server'
import {createTranslator} from 'next-intl'
import type {Metadata} from 'next'
import {Link} from '@/i18n/navigation'
import {notFound} from 'next/navigation'

// ===== Tipos de datos que refleja tu Services.json =====
type ServiceItem = {
  tag?: string
  title: string
  desc: string
  bullets?: string[]
}

type OfferItem = {title: string; desc: string}
type StepItem = {title: string; desc: string}
type PricingCard = {
  name: string
  price: string
  period: string
  features: string[]
  highlight?: boolean
}
type QAItem = {q: string; a: string}

type Sections = {
  services: {
    title: string
    subtitle: string
    items: ServiceItem[]
  }
  offerings: {
    title: string
    items: OfferItem[]
  }
  process: {
    title: string
    steps: StepItem[]
  }
  pricing: {
    title: string
    note: string
    cards: PricingCard[]
    disclaimer: string
  }
  faqs: {
    title: string
    items: QAItem[]
  }
}

type CTA = {
  title: string
  desc: string
  primary: string
  secondary: string
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params
  const messages = (await import(`@/locales/${locale}/Services.json`)).default
  return {title: messages?.metaTitle ?? 'Services'}
}

export default async function ServicesPage({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  setRequestLocale(locale)

  const messages = (await import(`@/locales/${locale}/Services.json`)).default
  if (!messages) return notFound()

  const t = await createTranslator({
    locale,
    messages: {Services: messages},
    namespace: 'Services' as const
  })

  // Strings sueltos
  const heroBadge = t('heroBadge')
  const heroTitle = t('heroTitle')
  const heroSub = t('heroSub')
  const ctaPrimary = t('ctaPrimary')

  // Estructuras complejas (objetos/arrays) — usar t.raw()
  const sections = t.raw('sections') as Sections
  const cta = t.raw('cta') as CTA

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Hero */}
      <section className="relative overflow-hidden pt-10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="mb-4 flex gap-2">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium border-neutral-300 bg-white/60 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-200">
              {heroBadge}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">{heroTitle}</h1>
          <p className="mt-4 max-w-3xl text-lg text-neutral-600 dark:text-neutral-300">{heroSub}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 dark:focus:ring-fuchsia-700"
            >
              {ctaPrimary}
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="relative border-t border-neutral-200 py-12 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold sm:text-3xl">{sections.services.title}</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">{sections.services.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {sections.services.items.map((it: ServiceItem, i: number) => (
              <div
                key={i}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
              >
                {it.tag ? (
                  <div className="mb-2 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                    {it.tag}
                  </div>
                ) : null}
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">{it.title}</h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">{it.desc}</p>
                {it.bullets?.length ? (
                  <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-200 list-disc pl-5">
                    {it.bullets.map((b: string, j: number) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="relative border-t border-neutral-200 py-12 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold sm:text-3xl">{sections.offerings.title}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {sections.offerings.items.map((it: OfferItem, i: number) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{it.title}</div>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative border-t border-neutral-200 py-12 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold sm:text-3xl">{sections.process.title}</h2>
          <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sections.process.steps.map((s: StepItem, i: number) => (
              <li
                key={i}
                className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">{s.title}</div>
                <div className="text-neutral-600 dark:text-neutral-300">{s.desc}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section className="relative border-t border-neutral-200 py-12 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold sm:text-3xl">{sections.pricing.title}</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300">{sections.pricing.note}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {sections.pricing.cards.map((c: PricingCard, i: number) => (
              <div
                key={i}
                className={
                  'rounded-2xl border p-6 shadow-sm bg-white dark:bg-neutral-900 ' +
                  (c.highlight
                    ? 'border-fuchsia-300 ring-2 ring-fuchsia-300/50 dark:border-fuchsia-600 dark:ring-fuchsia-600/40'
                    : 'border-neutral-200 dark:border-neutral-800')
                }
              >
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{c.name}</h3>
                <div className="mt-4 text-3xl font-bold text-neutral-900 dark:text-neutral-50">{c.price}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400">{c.period}</div>
                <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-200 list-disc pl-5">
                  {c.features.map((f: string, j: number) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700"
                  >
                    Contactar
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">{sections.pricing.disclaimer}</p>
        </div>
      </section>

      {/* FAQs */}
      <section className="relative border-t border-neutral-200 py-12 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold sm:text-3xl">{sections.faqs.title}</h2>
          <div className="mt-6 space-y-3">
            {sections.faqs.items.map((f: QAItem, i: number) => (
              <details
                key={i}
                className="rounded-2xl border border-neutral-200 bg-white p-5 open:shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <summary className="cursor-pointer list-none font-medium text-neutral-900 dark:text-neutral-50">
                  {f.q}
                </summary>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative border-t border-neutral-200 py-16 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{cta.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-neutral-600 dark:text-neutral-300">{cta.desc}</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 dark:focus:ring-fuchsia-700"
            >
              {cta.primary}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
            >
              {cta.secondary}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}