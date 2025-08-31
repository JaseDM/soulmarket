'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function OurServices() {
  return (

        <section
        data-ns-animate
        data-delay="0.3"
        className="bg-white dark:bg-background-6 pt-20 lg:pt-[88px] xl:pt-[100px] sm:pb-36 pb-14 xl:pb-[176px] overflow-hidden"
        >
        <div className="main-container">
            {/* TabBar small screen */}
            <div
            className="tab-mobile flex items-center justify-start flex-wrap lg:hidden gap-4 mb-14 lg:mb-[72px] sm:max-w-[500px] sm:mx-auto"
            >
            <button
                className="px-3.5 py-2 min-w-16 cursor-pointer text-tagline-2 font-medium text-secondary/60 dark:text-accent/60 border border-stroke-2 dark:border-stroke-7 rounded-full dark:bg-background-7"
            >
                Negocio y procesos
            </button>
            <button
                className="px-3.5 py-2 min-w-16 cursor-pointer text-tagline-2 font-medium text-secondary/60 dark:text-accent/60 border border-stroke-2 dark:border-stroke-7 rounded-full dark:bg-background-7"
            >
                Producto digital 
            </button>
            <button
                className="px-3.5 py-2 min-w-16 cursor-pointer text-tagline-2 font-medium text-secondary/60 dark:text-accent/60 border border-stroke-2 dark:border-stroke-7 rounded-full dark:bg-background-7"
            >
                Marca y visibilidad 
            </button>
            <button
                className="px-3.5 py-2 min-w-16 cursor-pointer text-tagline-2 font-medium text-secondary/60 dark:text-accent/60 border border-stroke-2 dark:border-stroke-7 rounded-full dark:bg-background-7 text-nowrap"
            >
                Infraestructura
            </button>
            </div>

            {/* TabBar large screen */}
            <div
            role="tablist"
            className="tab-bar hidden lg:flex justify-center items-center border-b border-stroke-2 dark:border-stroke-6 mb-14 lg:mb-[72px] relative"
            >
            {/* active-tab-bar  */}
            <div className="active-tab-bar"></div>

            <button
                className="py-3 cursor-pointer focus-visible:outline-0 px-10 -mb-px data-[state=selected]:text-secondary text-secondary/60 dark:data-[state=selected]:text-accent dark:text-accent/60"
            >
                <span className="text-tagline-1 font-medium">Negocio y procesos</span>
            </button>
            <button
                className="py-3 cursor-pointer focus-visible:outline-0 px-10 -mb-px data-[state=selected]:text-secondary text-secondary/60 dark:data-[state=selected]:text-accent dark:text-accent/60"
            >
                <span className="text-tagline-1 font-medium">Producto digital</span>
            </button>
            <button
                className="py-3 cursor-pointer focus-visible:outline-0 px-10 -mb-px data-[state=selected]:text-secondary text-secondary/60 dark:data-[state=selected]:text-accent dark:text-accent/60"
            >
                <span className="text-tagline-1 font-medium">Marca y visibilidad</span>
            </button>
            <button
                className="py-3 cursor-pointer focus-visible:outline-0 px-10 -mb-px data-[state=selected]:text-secondary text-secondary/60 dark:data-[state=selected]:text-accent dark:text-accent/60"
            >
                <span className="text-tagline-1 font-medium">Infraestructura</span>
            </button>
            </div>
            {/* Tab Content-1 */}
            <div className="tab-content" data-display="flex">
            <div className="flex flex-col justify-between lg:flex-row items-start gap-y-14 gap-x-24 w-full">
                <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                <span className="badge badge-green mb-3.5 xl:mb-5"> Lo hacemos </span>
                <h2 className="mb-3 lg:text-heading-2 text-heading-4">
                    Transformación <span className="text-primary-500">Digital</span> & Automatización
                    
                </h2>
                <p className="mb-6 xl:mb-8 lg:max-w-[478px]">
                    Llevamos tu negocio al siguiente nivel con IA, ERP y CRM, optimizando procesos y reduciendo costes.
                </p>
                <ul className="space-y-1.5 mb-7 xl:mb-14">
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-6 text-[36px] text-secondary dark:text-white"></span>

                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >ERP y CRM OpenSource o a medida</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                        Odoo, HusPots, Zoho...
                        </p>
                    </div>
                    </li>
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-46 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >Automatización de procesos y tareas</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                        N8N, Make, Zapier...
                        </p>
                    </div>
                    </li>
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-47 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >IA aplicada al negocio</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                            Chatbox, generación de imágenes, análisis de datos...
                        </p>
                    </div>
                    </li>
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-2 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >Integración entre herramientas y APIs</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                            Api Rest, Soap, microservicios...
                        </p>
                    </div>
                    </li>
                    
                </ul>
                <div>
                    <Link
                    href="/contact"
                    className="btn btn-white btn-lg md:btn-xl dark:btn-transparent hover:btn-primary w-full md:w-auto"
                    >
                    <span>Habla con nuestros expertos</span>
                    </Link>
                </div>
                </div>
                {/* About Image */}
                <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                    <div className="flex items-center justify-center">
                        <figure>
                            <Image
                                src="/images/newhome/sectionservicios/automatizacion.webp"   // solo guardas 1 versión en /public
                                alt="Hero illustration"                     // ocupa todo el div padre
                                width={600}
                                height={500}
                                priority
                                
                            />
                            </figure>
                    </div>
                </div>
            </div>
            </div>

            {/* Tab Content-2 */}
            <div className="tab-content hidden" data-display="flex">
            <div className="flex flex-col lg:flex-row items-start w-full gap-x-24 gap-y-16">
                <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                <span className="badge badge-green mb-5"> Esto también lo hacemos </span>
                <h2 className="mb-3">
                    Desarrollo Web<span className="text-primary-500 inline-block"> & </span>App
                    
                </h2>
                <p className="mb-8 lg:max-w-[478px]">
                    Creamos webs y aplicaciones que no solo se ven bien, sino que impulsan resultados: rápidas, seguras y listas para crecer con tu negocio.
                </p>
                <ul className="space-y-1.5 mb-7 md:mb-14">
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-12 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >Webs corporativas y profesionales</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                        Vue Js, React, Angular, Python...
                        </p>
                    </div>
                    </li>
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-17 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >E-commerce con pasarelas de pago</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                        Prestashop, Shopify, soluciones a medida...
                        </p>
                    </div>
                    </li>
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-21 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >Aplicaciones móviles (iOS/Android)</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                        Nativas, Flutter, React Native...
                        </p>
                    </div>
                    </li>
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-3 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >UX/UI y producto digital</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                        Siempre el usuario en el centro.
                        </p>
                    </div>
                    </li>
                </ul>
                <div>
                    <Link
                    href="/contact"
                    className="btn btn-white btn-lg md:btn-xl dark:btn-transparent hover:btn-primary w-full md:w-auto"
                    >
                    <span>Habla con un experto</span>
                    </Link>
                </div>
                </div>
                {/* About Image */}
                <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                <div className="flex items-center justify-center">
                    <figure className='tab-item-image'>
                        <Image
                            src="/images/newhome/sectionservicios/desarrollo.webp"   // solo guardas 1 versión en /public
                            alt="Hero illustration"                     // ocupa todo el div padre
                            width={600}
                            height={500}
                            priority
                            
                        />
                    </figure>
                </div>
                </div>
            </div>
            </div>
            {/* Tab Content-3 */}
            <div className="tab-content hidden" data-display="flex">
            <div className="flex flex-col lg:flex-row items-start w-full gap-x-24 gap-y-16">
                <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                <span className="badge badge-green mb-5"> Hablamos por ti </span>
                <h2 className="mb-3">
                    Marketing <span className="text-primary-500 inline-block">&</span> Comunicación
                </h2>
                <p className="mb-8 lg:max-w-[478px]">
                    Estrategias creativas y medibles para atraer clientes y consolidar tu marca.
                </p>
                <ul className="space-y-1.5 mb-7 md:mb-14">
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-23 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >Estrategia digital y campañas</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                        SEO, SEM, ADS
                        </p>
                    </div>
                    </li>
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-24 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >Gestión de redes sociales</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                        Contenidos, comunidad, influencers...
                        </p>
                    </div>
                    </li>
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-25 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >Diseño gráfico online/offline</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                        Branding, logos, identidad corporativa...
                        </p>
                    </div>
                    </li>
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-26 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >Producción y edición de vídeo/foto</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                        Reels, spots, vídeos corporativos...
                        </p>
                    </div>
                    </li>
                </ul>
                <div>
                    <Link
                    href="/contact"
                    className="btn btn-white btn-lg md:btn-xl dark:btn-transparent hover:btn-primary w-full md:w-auto"
                    >
                    <span>¿Hablamos?</span>
                    </Link>
                </div>
                </div>
                {/* About Image */}
                <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                <figure className='tab-item-image'>
                        <Image
                            src="/images/newhome/sectionservicios/comunicacion.webp"   // solo guardas 1 versión en /public
                            alt="Hero illustration"                     // ocupa todo el div padre
                            width={600}
                            height={500}
                            priority
                            
                        />
                    </figure>
                </div>
            </div>
            </div>
            {/* Tab Content-4 */}
            <div className="tab-content hidden" data-display="flex">
            <div className="flex flex-col lg:flex-row items-start w-full gap-y-16 gap-x-24">
                <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                <span className="badge badge-green mb-5"> ¿quieres estar tranquilo? </span>
                <h2 className="mb-3">
                    Infraestructura <span className='text-primary-500'>&</span> Soporte Técnico

                    
                </h2>
                <p className="mb-8 lg:max-w-[478px]">
                    Nos encargamos de la base tecnológica para que tu negocio funcione sin interrupciones.
                </p>
                <ul className="space-y-1.5 mb-7 md:mb-14">
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-28 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >Servidores y redes empresariales</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                        Mantenimiento y gestión de servidores, redes y sistemas.
                        </p>
                    </div>
                    </li>
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-29 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >Gestión de bases de datos</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                        creación, mantenimiento y optimización.
                        </p>
                    </div>
                    </li>
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-30 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >Integraciones técnicas avanzadas</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                        implementación de API, conectividad y automatización de procesos.
                        </p>
                    </div>
                    </li>
                    <li className="flex items-center gap-4 list-none py-2">
                    <span className="ns-shape-31 text-[36px] text-secondary dark:text-white"></span>
                    <div>
                        <strong className="text-tagline-1 font-medium text-secondary dark:text-accent"
                        >Soporte y mantenimiento especializado</strong
                        >
                        <p className="text-secondary/60 text-tagline-2 font-normal dark:text-accent/60">
                        soporte técnico, mantenimiento de sistemas y gestión de incidencias.
                        </p>
                    </div>
                    </li>
                </ul>
                <div>
                    <Link
                    href="/contact"
                    className="btn btn-white btn-lg md:btn-xl dark:btn-transparent hover:btn-primary w-full md:w-auto"
                    >
                    <span>Cuentanos tu idea</span>
                    </Link>
                </div>
                </div>
                {/* About Image */}
                <div className="flex-1 lg:max-w-full sm:max-w-[500px] sm:mx-auto">
                <figure className='tab-item-image'>
                        <Image
                            src="/images/newhome/sectionservicios/redes.webp"   // solo guardas 1 versión en /public
                            alt="Hero illustration"                     // ocupa todo el div padre
                            width={600}
                            height={500}
                            priority
                            
                        />
                    </figure>
                </div>
            </div>
            </div>
        </div>
        </section>

  )
}