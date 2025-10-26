// src/app/[locale]/page.tsx
import {setRequestLocale} from 'next-intl/server'
import {createTranslator} from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import Tabs from '@/components/Tabs'

import type enHomeMessages from '@/locales/en/HomePage.json';
import HeroLinesClient from '@/components/HeroLinesClient'
import AnimationsBoot from '@/components/AnimationsBoot'
type HomePageMessages = typeof enHomeMessages;



export default async function HomePage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  // Next.js 15: params es async
  const {locale} = await params
  setRequestLocale(locale)

  // Carga por página del namespace HomePage
  const pageMessages = (
  await import(`@/locales/${locale}/HomePage.json`)
).default as HomePageMessages;

const t = await createTranslator({
  locale,
  messages: { HomePage: pageMessages },
  namespace: 'HomePage' as const
});

  

  return (
      <main key={locale}>
      <AnimationsBoot />
      <section
        data-ns-animate
        data-offset="0"
        className="relative opacity-0 overflow-hidden pt-[200px] 2xl:pt-[250px] pb-16 lg:pb-[100px] bg-background-3 dark:bg-background-5"
      >
        

        {/* BG Dot (centrado y no full-width) */}
        <div
          className="absolute z-0 pointer-events-none left-1/2 -translate-x-1/2 top-[10%] lg:top-[12%] 
                    w-[min(900px,92vw)] aspect-[698/235]"
        >
          <Image
            src="/images/gradient/hero-dot-bg.png"
            alt={t('hero.bgAlt')}
            fill
            priority
            sizes="(min-width: 1024px) 900px, 92vw"
            className="object-contain animate-pulse"  // usa 'cover' si quieres que recorte dentro del frame
          />
        </div>

        {/* column background (animated) */}
        
        <HeroLinesClient />

        {/* Content */}
        <div className="main-container flex flex-col items-center text-center relative z-20">
          <span className="capitalize badge badge-green mb-5 " data-ns-animate data-delay="0.05">
            {t('hero.badge')}
          </span>

          {/* Título con rich() para <highlight> */}
          <h1 className="font-medium mb-4 " data-ns-animate data-delay="0.1">
            {t.rich('hero.title.line1', {
              highlight: (chunks) => <span className="text-primary-500">{chunks}</span>
            })}
            <br className="hidden md:block" />
            {t.rich('hero.title.line2', {
              highlight: (chunks) => <span className="text-primary-500">{chunks}</span>
            })}
          </h1>

          <p className="max-w-[700px] mb-7 md:mb-10 lg:mb-14" data-ns-animate data-delay="0.2">
            {t('hero.description')}
          </p>

          <ul className="flex flex-col md:flex-row gap-4 mb-9 md:mb-11 lg:mb-14 max-md:w-full md:w-auto mx-auto md:mx-0">
            <li data-ns-animate data-delay="0.3" data-direction="left" data-offset="50">
              <Link
                href="/contact"
                className="btn btn-primary hover:btn-white-dark dark:hover:btn-white btn-lg md:btn-xl w-full md:w-auto mx-auto md:mx-0"
              >
                <span>{t('hero.ctaPrimary')}</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Sección START */}
      <section 
        data-ns-animate
        data-offset="0"
        data-delay="0.5"
        className="relative py-14 max-[426px]:py-10 md:py-16 lg:py-[88px] xl:py-[100px] bg-white dark:bg-background-6 overflow-hidden">
        <div className="main-container">
          <div className="flex items-center flex-wrap lg:flex-nowrap gap-8 lg:gap-4 xl:gap-8">
            {/* Texto lado izquierdo */}
            <div className="w-full lg:w-2/5">
              <div className="mb-8 max-[426px]:mb-5 space-y-5 text-center sm:text-left max-[426px]:text-left">
                <span className="badge badge-yellow">
                  {t('start.badge')}
                </span>
                <h2>
                  {t('start.titleLine1')} <br className="hidden lg:block opacity-0" />
                  {t('start.titleLine2')}
                </h2>
              </div>

              <ul className="list-none space-y-4 mb-14 max-[426px]:mb-10">
                <li className="flex items-center gap-2 opacity-0">
                  {/* SVG check decorativo */}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <rect width="18" height="18" rx="9" className="fill-secondary dark:fill-white" />
                    <path
                      d="M8.31661 12.7561L13.7491 7.42144C14.0836 7.0959 14.0836 6.5697 13.7491 6.24416C13.4145 5.91861 12.8736 5.91861 12.539 6.24416L7.7116 10.9901L5.46096 8.78807C5.12636 8.46253 4.58554 8.46253 4.25095 8.78807C3.91635 9.11362 3.91635 9.63982 4.25095 9.96536L7.1066 12.7561C7.27347 12.9184 7.49253 13 7.7116 13C7.93067 13 8.14974 12.9184 8.31661 12.7561Z"
                      className="fill-white dark:fill-secondary"
                    />
                  </svg>
                  <span className="text-secondary dark:text-accent">{t('start.bullet1')}</span>
                </li>
              </ul>

              <div>
                <Link
                  href="/contact"
                  className="btn btn-white btn-lg sm:btn-xl dark:btn-transparent hover:btn-secondary dark:hover:btn-accent w-full sm:w-auto"
                >
                  <span>{t('start.cta')}</span>
                </Link>
              </div>
            </div>

            {/* Card lado derecho */}
            <div className="w-full lg:w-3/5 rounded-[20px] bg-background-2 dark:bg-background-5 p-5 md:p-8 xl:p-[50px] max-[426px]:rounded-2xl">
              <div className="flex gap-4 sm:gap-2.5 flex-wrap sm:flex-nowrap">
                <div className="bg-white dark:bg-background-6 p-6 max-[426px]:p-5 rounded-2xl w-full sm:w-3/5">
                  <h5 className="mb-4 max-[426px]:text-heading-6" style={{whiteSpace: 'pre-line'}}>
                    {t('start.requirements.title')}
                  </h5>
                  <div className="flex items-center gap-4 mb-7">
                    <div>
                      <p className="max-[426px]:text-tagline-2">{t('start.requirements.desc')}</p>
                    </div>
                  </div>
                  <div className="w-full h-[1px] bg-secondary/10 dark:bg-accent/10 mb-7" />
                  <div className="items-center justify-between sm:mb-5 text-landing-6">
                    <h5 className="mb-4 max-[426px]:text-heading-6">{t('start.devIntegration.title')}</h5>
                    <p className="text-tagline-2 font-medium">{t('start.devIntegration.desc')}</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-background-6 p-6 rounded-2xl w-full sm:w-2/5">
                  <h5 className="mb-4 max-[426px]:text-heading-6">{t('start.designPrototype.title')}</h5>
                  <p className="max-[426px]:text-tagline-2">{t('start.designPrototype.desc')}</p>
                </div>
              </div>

              {/* Footer con avatars */}
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-start gap-6 p-6 rounded-2xl bg-secondary dark:bg-background-9 max-w-[420px] mt-4 sm:-mt-8 z-10 relative"
              >
                
                <div>
                  <h5 className="text-accent mb-1">{t('start.handoff.badge')}</h5>
                  <p className="text-accent/60">{t('start.handoff.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs de servicios */}
      <section
        data-ns-animate
        data-offset="0"
        data-delay="0.5"
        className="bg-white dark:bg-background-6 pt-20 lg:pt-[88px] xl:pt-[100px] sm:pb-36 pb-14 xl:pb-[176px] overflow-hidden"
      >
        <div className="main-container">
          <Tabs
            tabs={[
              {
                label: t('services.tabs.business'),
                content: (
                  <div className="flex flex-col justify-between lg:flex-row items-start gap-y-14 gap-x-24 w-full">
                    {/* Lado texto */}
                    <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                      <span className="badge badge-green mb-3.5 xl:mb-5">{t('services.tab1.badge')}</span>
                      <h2 className="mb-3 lg:text-heading-2 text-heading-4">
                        {t.rich('services.tab1.title', {
                          highlight: (chunks) => <span className="text-primary-500">{chunks}</span>
                        })}
                      </h2>
                      <p className="mb-6 xl:mb-8 lg:max-w-[478px]">{t('services.tab1.lead')}</p>
                      <ul className="space-y-1.5 mb-7 xl:mb-14">
                        {[0, 1, 2, 3].map((i) => (
                          <li key={i} className="flex items-center gap-4 list-none py-2">
                            <span className={`ns-shape-${[6, 46, 47, 2][i]} text-[36px] text-secondary dark:text-white`}></span>
                            <div>
                              <strong className="text-tagline-1 font-medium text-secondary dark:text-accent">
                                {t(`services.tab1.items.${i}.title` as const)}
                              </strong>
                              <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                                {t(`services.tab1.items.${i}.desc` as const)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div>
                        <Link
                          href="/contact"
                          className="btn btn-white btn-lg md:btn-xl dark:btn-transparent hover:btn-primary w-full md:w-auto"
                        >
                          <span>{t('services.tab1.cta')}</span>
                        </Link>
                      </div>
                    </div>
                    {/* Lado imagen */}
                    <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                      <div className="flex items-center justify-center">
                        <figure>
                          <Image
                            src="/images/home/services/automatizacion.webp"
                            alt={t('services.tab1.imageAlt')}
                            width={600}
                            height={500}
                            priority
                          />
                        </figure>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                label: t('services.tabs.product'),
                content: (
                  <div className="flex flex-col lg:flex-row items-start w-full gap-x-24 gap-y-16">
                    <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                      <span className="badge badge-green mb-5">{t('services.tab2.badge')}</span>
                      <h2 className="mb-3">
                        {t.rich('services.tab2.title', {
                          amp: (chunks) => <span className="text-primary-500 inline-block">{chunks}</span>
                        })}
                      </h2>
                      <p className="mb-8 lg:max-w-[478px]">{t('services.tab2.lead')}</p>
                      <ul className="space-y-1.5 mb-7 md:mb-14">
                        {[0, 1, 2, 3].map((i) => (
                          <li key={i} className="flex items-center gap-4 list-none py-2">
                            <span className={`ns-shape-${[12, 17, 21, 3][i]} text-[36px] text-secondary dark:text-white`}></span>
                            <div>
                              <strong className="text-tagline-1 font-medium text-secondary dark:text-accent">
                                {t(`services.tab2.items.${i}.title` as const)}
                              </strong>
                              <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                                {t(`services.tab2.items.${i}.desc` as const)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div>
                        <Link
                          href="/contact"
                          className="btn btn-white btn-lg md:btn-xl dark:btn-transparent hover:btn-primary w-full md:w-auto"
                        >
                          <span>{t('services.tab2.cta')}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                      <div className="flex items-center justify-center">
                        <figure className="tab-item-image">
                          <Image
                            src="/images/home/services/desarrollo.webp"
                            alt={t('services.tab2.imageAlt')}
                            width={600}
                            height={500}
                            priority
                          />
                        </figure>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                label: t('services.tabs.branding'),
                content: (
                  <div className="flex flex-col lg:flex-row items-start w-full gap-x-24 gap-y-16">
                    <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                      <span className="badge badge-green mb-5">{t('services.tab3.badge')}</span>
                      <h2 className="mb-3">
                        {t.rich('services.tab3.title', {
                          amp: (chunks) => <span className="text-primary-500 inline-block">{chunks}</span>
                        })}
                      </h2>
                      <p className="mb-8 lg:max-w-[478px]">{t('services.tab3.lead')}</p>
                      <ul className="space-y-1.5 mb-7 md:mb-14">
                        {[0, 1, 2, 3].map((i) => (
                          <li key={i} className="flex items-center gap-4 list-none py-2">
                            <span className={`ns-shape-${[23, 24, 25, 26][i]} text-[36px] text-secondary dark:text-white`}></span>
                            <div>
                              <strong className="text-tagline-1 font-medium text-secondary dark:text-accent">
                                {t(`services.tab3.items.${i}.title` as const)}
                              </strong>
                              <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                                {t(`services.tab3.items.${i}.desc` as const)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div>
                        <Link
                          href="/contact"
                          className="btn btn-white btn-lg md:btn-xl dark:btn-transparent hover:btn-primary w-full md:w-auto"
                        >
                          <span>{t('services.tab3.cta')}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                      <figure className="tab-item-image">
                        <Image
                          src="/images/home/services/comunicacion.webp"
                          alt={t('services.tab3.imageAlt')}
                          width={600}
                          height={500}
                          priority
                        />
                      </figure>
                    </div>
                  </div>
                )
              },
              {
                label: t('services.tabs.infrastructure'),
                content: (
                  <div className="flex flex-col lg:flex-row items-start w-full gap-y-16 gap-x-24">
                    <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                      <span className="badge badge-green mb-5">{t('services.tab4.badge')}</span>
                      <h2 className="mb-3">
                        {t.rich('services.tab4.title', {
                          amp: (chunks) => <span className="text-primary-500">{chunks}</span>
                        })}
                      </h2>
                      <p className="mb-8 lg:max-w-[478px]">{t('services.tab4.lead')}</p>
                      <ul className="space-y-1.5 mb-7 md:mb-14">
                        {[0, 1, 2, 3].map((i) => (
                          <li key={i} className="flex items-center gap-4 list-none py-2">
                            <span className={`ns-shape-${[28, 29, 30, 31][i]} text-[36px] text-secondary dark:text-white`}></span>
                            <div>
                              <strong className="text-tagline-1 font-medium text-secondary dark:text-accent">
                                {t(`services.tab4.items.${i}.title` as const)}
                              </strong>
                              <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                                {t(`services.tab4.items.${i}.desc` as const)}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div>
                        <Link
                          href="/contact"
                          className="btn btn-white btn-lg md:btn-xl dark:btn-transparent hover:btn-primary w-full md:w-auto"
                        >
                          <span>{t('services.tab4.cta')}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                      <figure className="tab-item-image">
                        <Image
                          src="/images/home/services/redes.webp"
                          alt={t('services.tab4.imageAlt')}
                          width={600}
                          height={500}
                          priority
                        />
                      </figure>
                    </div>
                  </div>
                )
              }
            ]}
          />
        </div>
      </section>

      {/* Bloque “Why us” */}
      <section
        data-ns-animate
        data-offset="0"
        data-delay="0.5"
        className="pt-14 md:pt-16 lg:pt-[88px] xl:pt-[100px] pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px] bg-white dark:bg-background-6"
      >
        <div className="w-[95%] 2xl:max-w-[1440px] mx-auto p-5 sm:p-10 2xl:px-[100px] 2xl:py-[176px] bg-secondary dark:text-ns-yellow rounded-4xl relative overflow-hidden z-0 max-lg:rounded-2xl max-lg:w-[90%] max-lg:py-12 max-lg:px-5">
          {/* BG image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/home/work-bg.png"
              alt="How it works background"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Header */}
          <div className="flex flex-col items-center text-center gap-y-4 mb-[112px] space-y-5 max-lg:space-y-3 max-lg:mb-12">
            <span className="badge badge-blur-light text-ns-yellow">
              SoulMarket
            </span>

            <div className="space-y-3">
              <h2 className="max-w-[750px] mx-auto text-accent max-lg:text-heading-6">
                ¿Por qué elegir SoulMarket para tu transformación digital?
              </h2>
              <p className="max-w-[850px] text-accent max-lg:text-tagline-2">
                En SoulMarket no solo desarrollamos tecnología, la ponemos al servicio de tu negocio. Te ayudamos a
                ahorrar tiempo, vender más y trabajar con la tranquilidad de tener un socio digital experto a tu lado.
                Solo tendrás que preocuparte de lo más importante para tu negocio: PRODUCIR
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-4 md:gap-8">
            {/* Step 1 */}
            <div
              className="rounded-[20px] bg-white/14 backdrop-blur-[50px] flex flex-col items-center justify-center p-8 md:p-4 lg:p-8 text-center"
            >
              <h4 className="text-heading-6 px-10 dark:text-secondary py-1.5 bg-ns-yellow inline-block rounded-[48px] mb-6 max-lg:mb-3">
                1
              </h4>
              <h5 className="text-accent mb-2 max-lg:text-lg">Ahorra tiempo y dinero</h5>
              <p className="text-accent/60 max-lg:text-tagline-2">
                Simplificamos procesos con automatización, ERP y CRM. Tu equipo deja de perder horas en tareas
                repetitivas y se concentra en lo que realmente genera valor.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className="rounded-[20px] bg-white/14 backdrop-blur-[50px] flex flex-col items-center justify-center p-8 md:p-4 lg:p-8 text-center"
            >
              <h4 className="text-heading-6 px-10 dark:text-secondary py-1.5 bg-ns-green inline-block rounded-[48px] mb-6 max-lg:mb-3">
                2
              </h4>
              <h5 className="text-accent mb-2 max-lg:text-lg">Impulsa tus ventas</h5>
              <p className="text-accent/60 max-lg:text-tagline-2">
                Creamos webs, e-commerce y apps que atraen clientes y los convierten en ventas, integrando pasarelas de
                pago seguras y estrategias digitales efectivas.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className="rounded-[20px] bg-white/14 backdrop-blur-[50px] flex flex-col items-center justify-center p-8 md:p-4 lg:p-8 text-center"
            >
              <h4 className="text-heading-6 px-10 dark:text-secondary py-1.5 bg-ns-cyan inline-block rounded-[48px] mb-6 max-lg:mb-3">
                3
              </h4>
              <h5 className="text-accent mb-2 max-lg:text-lg">Trabaja sin preocupaciones</h5>
              <p className="text-accent/60 max-lg:text-tagline-2">
                Nos encargamos de todo tu ecosistema digital, desde servidores y seguridad hasta marketing y diseño. Con
                presupuestos claros y soporte experto.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-6">
  <div className="tab-content" data-display="flex">
    Contenido de Features
  </div>

  <div
    className="tab-content"
    style={{display: 'none'}}
    data-display="flex"
  >
    Contenido de Pricing
  </div>

  <div
    className="tab-content"
    style={{display: 'none'}}
    data-display="flex"
  >
    Contenido de FAQ
  </div>
</section>
    </main>
  )
}