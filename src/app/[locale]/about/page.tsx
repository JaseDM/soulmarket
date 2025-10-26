import {setRequestLocale } from 'next-intl/server'
import type {Metadata} from 'next'
import Image from 'next/image'
import {Link} from '@/i18n/navigation'

type AboutMessages = {
  metaTitle: string
  hero: {badge: string; title: string; subtitle: string; ctaPrimary: string; ctaSecondary: string}
  mission: {title: string; body: string}
  values: {title: string; items: {title: string; body: string}[]}
  stats: {title: string; items: {label: string; value: string}[]}
  team: {title: string; members: {name: string; role: string; avatar: string}[]}
  timeline: {title: string; steps: {year: string; title: string; body: string}[]}
  clients: {title: string; logos: {alt: string; src: string}[]}
  cta: {title: string; desc: string; primary: string; secondary: string}
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>
}): Promise<Metadata> {
  const {locale} = await params
  const messages = (await import(`@/locales/${locale}/About.json`)).default as AboutMessages
  return {title: messages.metaTitle}
}

export default async function AboutPage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const {locale} = await params
  setRequestLocale(locale)

  const messages = (await import(`@/locales/${locale}/About.json`))
    .default as AboutMessages

  

  const {hero, mission, values, stats, team, clients, cta} = messages

  return (
    <main className="relative min-h-screen bg-background-3 dark:bg-background-5 text-stroke-9 dark:text-stroke-1">
      {/* === HERO =================================================== */}
      <section
        data-ns-animate
        data-offset="0"
        className="relative overflow-hidden pt-[160px] pb-16 lg:pb-[100px]"
      >
        {/* BG líneas del hero */}
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

      {/* === MISIÓN ================================================= */}
      <section className="main-container py-14">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1">
            <h2 data-ns-animate data-direction="up" className="opacity-0">
              {mission.title}
            </h2>
          </div>
          <div className="lg:col-span-2">
            <p data-ns-animate data-delay="0.1" className="text-lg leading-relaxed opacity-0">
              {mission.body}
            </p>
          </div>
        </div>
      </section>

      {/* === VALORES ================================================ */}
      <section className="main-container py-14">
        <div className="flex items-end justify-between mb-8">
          <h3 data-ns-animate className="opacity-0">
            {values.title}
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {values.items.map((v, idx) => (
            <article
              key={idx}
              className="rounded-2xl border border-stroke-4 dark:border-background-5 bg-white/70 dark:bg-background-7/60 p-6 backdrop-blur"
              data-ns-animate
              data-delay={0.05 + idx * 0.05}
              data-direction="up"
            >
              <h4 className="mb-2">{v.title}</h4>
              <p className="text-base opacity-80">{v.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* === STATS ================================================== */}
      <section className="main-container py-14">
        <h3 className="mb-8" data-ns-animate>{stats.title}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.items.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-stroke-4 dark:border-background-5 bg-white/70 dark:bg-background-7/60 p-6 text-center"
              data-ns-animate
              data-delay={0.05 + i * 0.05}
            >
              <div className="text-3xl font-semibold">{s.value}</div>
              <div className="mt-1 opacity-70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* === EQUIPO ================================================= */}
      <section className="main-container py-14">
        <h3 className="mb-8" data-ns-animate>{team.title}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.members.map((m, i) => (
            <figure
              key={i}
              className="rounded-2xl overflow-hidden border border-stroke-4 dark:border-background-5 bg-white/70 dark:bg-background-7/60"
              data-ns-animate
              data-delay={0.05 + i * 0.05}
              data-direction="up"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={m.avatar}
                  alt={m.name}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 25vw, 50vw"
                />
              </div>
              <figcaption className="p-4">
                <div className="font-medium">{m.name}</div>
                <div className="opacity-70">{m.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* === TIMELINE =============================================== */}
      {/* <section className="main-container py-14">
        <h3 className="mb-8" data-ns-animate>{timeline.title}</h3>
        <ol className="relative border-s border-stroke-4 dark:border-background-5 ps-6">
          {timeline.steps.map((st, i) => (
            <li key={i} className="mb-8" data-ns-animate data-delay={0.05 + i * 0.05}>
              <div className="absolute -start-1 top-1.5 size-2 rounded-full bg-primary-500" />
              <div className="text-sm opacity-70">{st.year}</div>
              <div className="font-medium">{st.title}</div>
              <p className="opacity-80">{st.body}</p>
            </li>
          ))}
        </ol>
      </section> */}

      {/* === CLIENTES =============================================== */}
      <section className="main-container py-14">
        <h3 className="mb-8" data-ns-animate>{clients.title}</h3>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center"
          data-marquee-wrap
        >
          {clients.logos.map((c, i) => (
            <div key={i} className="relative h-12 opacity-80 hover:opacity-100 transition">
              <Image
                src={c.src}
                alt={c.alt}
                fill
                className="object-contain"
                sizes="160px"
              />
            </div>
          ))}
        </div>
      </section>

      {/* === CTA FINAL ============================================== */}
      <section className="main-container py-20">
        <div
          className="rounded-3xl border border-stroke-4 dark:border-background-5 bg-white/70 dark:bg-background-7/60 p-8 lg:p-12 text-center"
          data-ns-animate
          data-direction="up"
        >
          <h3 className="mb-2">{cta.title}</h3>
          <p className="opacity-80 mb-6">{cta.desc}</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/contact" className="btn btn-primary btn-lg">
              <span>{cta.primary}</span>
            </Link>
            <Link href="/services" className="btn btn-outline btn-lg">
              <span>{cta.secondary}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}