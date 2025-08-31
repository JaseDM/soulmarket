'use client'

import Image from 'next/image'

export default function HowItWorks() {
  return (
    <section
      data-ns-animate
      className="pt-14 md:pt-16 lg:pt-[88px] xl:pt-[100px] pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px] bg-white dark:bg-background-6"
    >
      <div className="w-[95%] 2xl:max-w-[1440px] mx-auto p-5 sm:p-10 2xl:px-[100px] 2xl:py-[176px] bg-secondary dark:text-ns-yellow rounded-4xl relative overflow-hidden z-0 max-lg:rounded-2xl max-lg:w-[90%] max-lg:py-12 max-lg:px-5">
        {/* BG image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/newhome/sectionwhoit/work-bg.png"
            alt="How it works background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-y-4 mb-[112px] space-y-5 max-lg:space-y-3 max-lg:mb-12">
          <span data-ns-animate data-delay="0.1" className="badge badge-blur-light text-ns-yellow">
            SoulMarket
          </span>

          <div className="space-y-3">
            <h2
              data-ns-animate
              data-delay="0.2"
              className="max-w-[750px] mx-auto text-accent max-lg:text-heading-6"
            >
              ¿Por qué elegir SoulMarket para tu transformación digital?
            </h2>
            <p
              data-ns-animate
              data-delay="0.3"
              className="max-w-[850px] text-accent max-lg:text-tagline-2"
            >
              En SoulMarket no solo desarrollamos tecnología: la ponemos al servicio de tu negocio. Te ayudamos a ahorrar tiempo, vender más y trabajar con la tranquilidad de tener un socio digital experto a tu lado. Solo tendrás que preocuparte de lo más importante para tu negocio: PRODUCIR
            </p>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-4 md:gap-8">
          {/* Step 1 */}
          <div
            data-ns-animate
            data-delay="0.4"
            className="rounded-[20px] bg-white/14 backdrop-blur-[50px] flex flex-col items-center justify-center p-8 md:p-4 lg:p-8 text-center"
          >
            <h4 className="text-heading-6 px-10 dark:text-secondary py-1.5 bg-ns-yellow inline-block rounded-[48px] mb-6 max-lg:mb-3">
              1
            </h4>
            <h5 className="text-accent mb-2 max-lg:text-lg">Ahorra tiempo y dinero</h5>
            <p className="text-accent/60 max-lg:text-tagline-2">
              Simplificamos procesos con automatización, ERP y CRM. Tu equipo deja de perder horas en tareas repetitivas y se concentra en lo que realmente genera valor.
            </p>
          </div>

          {/* Step 2 */}
          <div
            data-ns-animate
            data-delay="0.5"
            className="rounded-[20px] bg-white/14 backdrop-blur-[50px] flex flex-col items-center justify-center p-8 md:p-4 lg:p-8 text-center"
          >
            <h4 className="text-heading-6 px-10 dark:text-secondary py-1.5 bg-ns-green inline-block rounded-[48px] mb-6 max-lg:mb-3">
              2
            </h4>
            <h5 className="text-accent mb-2 max-lg:text-lg">Impulsa tus ventas</h5>
            <p className="text-accent/60 max-lg:text-tagline-2">
              Creamos webs, apps y e-commerce que atraen clientes y los convierten en ventas, integrando pasarelas de pago seguras y estrategias digitales efectivas.
            </p>
          </div>

          {/* Step 3 */}
          <div
            data-ns-animate
            data-delay="0.6"
            className="rounded-[20px] bg-white/14 backdrop-blur-[50px] flex flex-col items-center justify-center p-8 md:p-4 lg:p-8 text-center"
          >
            <h4 className="text-heading-6 px-10 dark:text-secondary py-1.5 bg-ns-cyan inline-block rounded-[48px] mb-6 max-lg:mb-3">
              3
            </h4>
            <h5 className="text-accent mb-2 max-lg:text-lg">Trabaja sin preocupaciones</h5>
            <p className="text-accent/60 max-lg:text-tagline-2">
              Nos encargamos de todo tu ecosistema digital: desde servidores y seguridad hasta marketing y diseño. Con presupuestos claros y soporte experto.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}