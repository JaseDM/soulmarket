'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function HeroHome() {
    return (

        <section
            data-ns-animate
            data-offset="0"
            className="relative overflow-hidden pt-[200px] 2xl:pt-[250px] pb-16 lg:pb-[100px] bg-background-3 dark:bg-background-5"
        >
            {/* BG Dot */}
            <div
            // Hacemos el render “instantáneo” para que no quede opaco por data-ns-animate
            data-ns-animate
            data-instant="true"
            className="absolute z-0 pointer-events-none top-[10%] lg:top-[12%] left-1/2 -translate-x-1/2 w-[698px] h-[235px]"
            >
            <Image
                src="/images/gradient/hero-dot-bg.png" // 👈 ruta desde /public
                alt="Hero background"
                fill                                // 👈 usamos fill para encajar en el wrapper
                priority
                className="object-cover animate-pulse" // 👈 el pulse aplicado al <img>
            />
            </div>

            {/* column background */}
            <div
                className="absolute -z-0 left-[50%] -translate-x-1/2 top-5 h-full main-container flex justify-between gap-[239px]"
            >
                <div
                    data-hero-line
                    className="w-px bg-gradient-to-b from-stroke-1 to-stroke-1/30 dark:from-stroke-5 dark:to-stroke-5/30 h-0"
                ></div>
                <div
                    data-hero-line
                    className="w-px bg-gradient-to-b from-stroke-1 to-stroke-1/30 dark:from-stroke-5 dark:to-stroke-5/30 h-0"
                ></div>
                <div
                    data-hero-line
                    className="w-px bg-gradient-to-b from-stroke-1 to-stroke-1/30 dark:from-stroke-5 dark:to-stroke-5/30 h-0"
                ></div>
                <div
                    data-hero-line
                    className="w-px bg-gradient-to-b from-stroke-1 to-stroke-1/30 dark:from-stroke-5 dark:to-stroke-5/30 h-0"
                ></div>
                <div
                    data-hero-line
                    className="w-px bg-gradient-to-b from-stroke-1 to-stroke-1/30 dark:from-stroke-5 dark:to-stroke-5/30 h-0"
                ></div>
                <div
                    data-hero-line
                    className="w-px bg-gradient-to-b from-stroke-1 to-stroke-1/30 dark:from-stroke-5 dark:to-stroke-5/30 h-0"
                ></div>
            </div>

            {/* Content */}
            <div className="main-container flex flex-col items-center text-center relative z-20">
               

                <span className="badge badge-green mb-5 opacity-0" data-ns-animate data-delay="0.05">
                    Tecnología • Marketing • Diseño • Infraestructura
                </span>
                <h1 className="font-medium mb-4 opacity-0" data-ns-animate data-delay="0.1">
                    Transformación<span className="text-primary-500"> Digital</span> 360
                    <br className="hidden md:block" />
                    <span className="text-primary-500">IA</span> aplicada al negocio
                </h1>
                <p className="max-w-[700px] mb-7 md:mb-10 lg:mb-14" data-ns-animate data-delay="0.2">
                    Lleva tu negocio al siguiente nivel con IA y automatización<br />
                    En SoulMarket diseñamos soluciones digitales 360º para ahorrar tiempo, vender más y simplificar tus procesos.
                </p>
                <ul
                    className="flex flex-col md:flex-row gap-4 mb-9 md:mb-11 lg:mb-14 max-md:w-full md:w-auto mx-auto md:mx-0"
                >
                    <li data-ns-animate data-delay="0.3" data-direction="left" data-offset="50">
                        <a
                            href="/contact"
                            className="btn btn-primary hover:btn-white-dark dark:hover:btn-white btn-lg md:btn-xl w-full md:w-auto mx-auto md:mx-0"
                        >
                            <span>Habla con un experto</span>
                        </a>
                    </li>
                    
                </ul>

              
            
            </div>
        </section>

    )
}