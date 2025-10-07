import Image from 'next/image'
import Link from 'next/link'
import {setRequestLocale} from 'next-intl/server'
import {createTranslator} from 'next-intl'

type Project = {
  id: string
  title: string
  category: 'web' | 'ecommerce' | 'automation' | 'brand' | 'video'
  image: string
}

export default async function PortfolioPage({
  params
}: {params: Promise<{locale: string}>}) {
  const {locale} = await params
  setRequestLocale(locale)

  // Carga de locales por página
  const messages = (await import(`@/locales/${locale}/Portfolio.json`)).default as {
    title: string
    intro: string
    filters: Record<string, string>
    grid: {empty: string}
    projects: Project[]
  }

  const t = await createTranslator({
    locale,
    messages: {Portfolio: messages},
    namespace: 'Portfolio' as const
  })

  const projects = messages.projects

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Hero */}
      <section className="relative overflow-hidden pt-10">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-3 max-w-3xl text-neutral-600 dark:text-neutral-300">
            {t('intro')}
          </p>
        </div>
      </section>

      {/* Grid de proyectos */}
      <section className="relative border-t border-neutral-200 py-12 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4">
          {projects.length === 0 ? (
            <p className="text-neutral-600 dark:text-neutral-400">{t('grid.empty')}</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <article
                  key={p.id}
                  className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <div className="mb-1 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                      {t(`filters.${p.category}` as const)}
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                      {p.title}
                    </h3>
                    <div className="mt-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700"
                      >
                        Contactar
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}