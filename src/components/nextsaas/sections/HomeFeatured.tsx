'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function FeatureSection() {
  return (
    <section className="relative py-14 max-[426px]:py-10 md:py-16 lg:py-[88px] xl:py-[100px] bg-white dark:bg-background-6 overflow-hidden">
      <div className="main-container">
        <div className="flex items-center flex-wrap lg:flex-nowrap gap-8 lg:gap-4 xl:gap-8">
          {/* Texto lado izquierdo */}
          <div className="w-full lg:w-2/5">
            <div className="mb-8 max-[426px]:mb-5 space-y-5 text-center sm:text-left max-[426px]:text-left">
              <span data-ns-animate data-delay="0.1" className="badge badge-yellow"> ¿Comenzamos? </span>
              <h2 data-ns-animate data-delay="0.2">
                Cuéntanos tu idea, <br className="hidden lg:block" />
                Nosotros la hacemos realidad.
              </h2>
            </div>

            <ul className="list-none space-y-4 mb-14 max-[426px]:mb-10">
              <li data-ns-animate data-delay="0.3" className="flex items-center gap-2">
                {/* ✅ SVG adaptado */}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect width="18" height="18" rx="9" className="fill-secondary dark:fill-white" />
                  <path
                    d="M8.31661 12.7561L13.7491 7.42144C14.0836 7.0959 14.0836 6.5697 13.7491 6.24416C13.4145 5.91861 12.8736 5.91861 12.539 6.24416L7.7116 10.9901L5.46096 8.78807C5.12636 8.46253 4.58554 8.46253 4.25095 8.78807C3.91635 9.11362 3.91635 9.63982 4.25095 9.96536L7.1066 12.7561C7.27347 12.9184 7.49253 13 7.7116 13C7.93067 13 8.14974 12.9184 8.31661 12.7561Z"
                    className="fill-white dark:fill-secondary"
                  />
                </svg>
                <span className="text-secondary dark:text-accent">Nuestro equipo de expertos analizará tus necesidades y pondrá en marcha la solución digital perfecta para tu negocio. Olvídate de complicaciones, trabajamos con metodología "llave en mano" para que recibas resultados listos para usar.</span>
              </li>
             
            </ul>

            <div data-ns-animate data-delay="0.6">
              <Link
                href="/contact"
                className="btn btn-white btn-lg sm:btn-xl dark:btn-transparent hover:btn-secondary dark:hover:btn-accent w-full sm:w-auto"
              >
                <span>Háblanos de tu proyecto</span>
              </Link>
            </div>
          </div>

          {/* Card lado derecho */}
          <div className="w-full lg:w-3/5 rounded-[20px] bg-background-2 dark:bg-background-5 p-5 md:p-8 xl:p-[50px] max-[426px]:rounded-2xl">
            <div className="flex gap-4 sm:gap-2.5 flex-wrap sm:flex-nowrap">
              <div data-ns-animate data-delay="0.3" data-direction="up" className="bg-white dark:bg-background-6 p-6 max-[426px]:p-5 rounded-2xl w-full sm:w-3/5">
                <h5 className="mb-4 max-[426px]:text-heading-6">
                  Toma de <br className="hidden lg:block" />
                  requerimientos
                </h5>
                <div className="flex items-center gap-4 mb-7">
                  
                  <div>
                    
                    <p className="max-[426px]:text-tagline-2">Escuchamos tu idea, entendemos tus necesidades y definimos juntos los objetivos.</p>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-secondary/10 dark:bg-accent/10 mb-7" />
                <div className="items-center justify-between sm:mb-5 text-landing-6">
                    <h5 className="mb-4 max-[426px]:text-heading-6">Desarrollo e Integración</h5>
                  <p className="text-tagline-2 font-medium">
                    Construimos tu proyecto con las tecnologías adecuadas, integrando todo lo que necesites (ERP, CRM, pasarelas de pago, entre otros).
                  </p>
                  {/* SVG icon adaptado aquí igual que antes */}
                </div>
              </div>

              <div data-ns-animate data-delay="0.3" className="bg-white dark:bg-background-6 p-6 rounded-2xl w-full sm:w-2/5">
                <h5 className="mb-4 max-[426px]:text-heading-6">Diseño y Prototipo</h5>
                <p className="max-[426px]:text-tagline-2">Te mostramos cómo se verá y funcionará tu solución antes de desarrollarla.</p>
              
              </div>
            </div>

            {/* Footer con avatars */}
            <div
              data-ns-animate
              data-delay="0.5"
              data-direction="right"
              className="flex flex-col sm:flex-row sm:items-center justify-start gap-6 p-6 rounded-2xl bg-secondary dark:bg-background-9 max-w-[420px] mt-4 sm:-mt-8 z-10 relative"
            >
              <div className="flex -space-x-3.5">
                <Image src="/images/avatar/avatar-1.png" alt="Avatar 1" width={56} height={56} className="inline-block size-14 rounded-full ring-4 ring-ns-yellow bg-white" />
              </div>
              <div>
                <h5 className="text-accent mb-1">Entrega llave en mano</h5>
                <p className="text-accent/60">Te entregamos un proyecto listo para usar, con soporte y seguimiento.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}