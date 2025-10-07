import {setRequestLocale} from 'next-intl/server'
import type {Metadata} from 'next'
import {Link} from '@/i18n/navigation'
import PortfolioGrid from './_components/PortfolioGrid'

type PortfolioMessages = {
  metaTitle: string
  hero: {badge: string; title: string; subtitle: string; ctaPrimary?: string; ctaSecondary?: string}
  filter: {all: string; web: string; design: string; media: string}
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params
  const messages = (await import(`@/locales/${locale}/Portfolio.json`)).default as PortfolioMessages
  return {title: messages.metaTitle}
}

export default async function PortfolioPage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)

  // Cargamos locales y traductor (mismo patrón que About)
  const messages = (await import(`@/locales/${locale}/Portfolio.json`))
    .default as PortfolioMessages


  const {hero, filter} = messages

  return (
    <main className="relative min-h-screen bg-background-3 dark:bg-background-5 text-stroke-9 dark:text-stroke-1">
      {/* === HERO =================================================== */}
      <section
        data-ns-animate
        data-offset="0"
        className="relative overflow-hidden pt-[160px] pb-16 lg:pb-[100px]"
      >
        {/* BG líneas del hero (igual que About) */}
        <div
          className="absolute -z-0 left-[50%] -translate-x-1/2 top-5 h-full main-container flex justify-between gap-[239px] pointer-events-none"
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
          <span className="badge badge-green mb-5 opacity-0" data-ns-animate data-delay="0.05">
            {hero.badge}
          </span>

          <h1 className="font-medium mb-4 opacity-0" data-ns-animate data-delay="0.1">
            {hero.title}
          </h1>

          <p className="text-lg opacity-0" data-ns-animate data-delay="0.2">
            {hero.subtitle}
          </p>

          {(hero.ctaPrimary || hero.ctaSecondary) && (
            <div
              className="mt-8 flex items-center justify-center gap-3 opacity-0"
              data-ns-animate
              data-delay="0.3"
              data-direction="left"
              data-offset="40"
            >
              {hero.ctaPrimary && (
                <Link href="/contact" className="btn btn-primary btn-lg">
                  <span>{hero.ctaPrimary}</span>
                </Link>
              )}
              {hero.ctaSecondary && (
                <Link href="/services" className="btn btn-outline btn-lg">
                  <span>{hero.ctaSecondary}</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* === GRID + FILTROS (misma estética de tarjetas/containers) == */}
      <section className="main-container py-14">
        {/* El componente ya dibuja barra de filtros y grid;
            Lo envolvemos con el mismo patrón de animación/espaciados */}
        <div
          className="rounded-3xl border border-stroke-4 dark:border-background-5 bg-white/70 dark:bg-background-7/60 p-4 md:p-6 lg:p-8 backdrop-blur"
          data-ns-animate
          data-direction="up"
          data-offset="40"
        >
          <PortfolioGrid
            labels={{
              all: filter.all,
              web: filter.web,
              design: filter.design,
              media: filter.media
            }}
            initialCategory="all"
          />
        </div>
      </section>
      
    </main>
  )
}