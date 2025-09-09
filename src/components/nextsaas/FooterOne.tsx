'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MAIN_NAV } from '@/config/nav'
import { FOOTER_SECTIONS, isInternal } from '@/config/footer'

type Props = {
  /** Muestra el gradiente decorativo del footer (opcional) */
  bgGradient?: {
    src: string
    className?: string
  } | null
  className?: string
}

export default function FooterThree({ className = '' }: Props) {
  return (
    <footer className={['footer footer-three bg-white dark:bg-background-8 relative overflow-hidden', className].join(' ')}>
      <div className="main-container">
        

        <div className="grid grid-cols-12 lg:gap-x-8 xl:gap-x-0 gap-x-0 gap-y-16 xl:pt-[100px] pt-16 pb-16 justify-between">
          {/* Columna marca + social */}
          <div className="lg:col-span-4 col-span-12">
            <div data-ns-animate data-delay="0.3" className="xl:max-w-[306px]">
              <figure>
                {/* light / dark */}
                <Image
                  src="/images/shared/light-logo.svg"
                  alt="SoulMarket"
                  width={160}
                  height={32}
                  className="dark:hidden"
                  priority
                />
                <Image
                  src="/images/shared/dark-logo.svg"
                  alt="SoulMarket"
                  width={160}
                  height={32}
                  className="hidden dark:block"
                  priority
                />
              </figure>

              <p className="mt-4 mb-7 text-secondary dark:text-accent">
                Digitaliza tu negocio con SoulMarket, tu socio tecnológico.
              </p>

              <div className="flex items-center gap-3">
                {/* Social icons (plantilla) */}
                <a href="#" className="footer-social-link" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="7" height="16" viewBox="0 0 7 16" fill="none">
                    <path
                      d="M2.25 15C2.25 15.4142 2.58579 15.75 3 15.75C3.41421 15.75 3.75 15.4142 3.75 15H2.25ZM3.75 7C3.75 6.58579 3.41421 6.25 3 6.25C2.58579 6.25 2.25 6.58579 2.25 7H3.75ZM6 1.75C6.41421 1.75 6.75 1.41421 6.75 1C6.75 0.585786 6.41421 0.25 6 0.25V1.75ZM3 4H2.25H3ZM2.25 7C2.25 7.41421 2.58579 7.75 3 7.75C3.41421 7.75 3.75 7.41421 3.75 7H2.25ZM3 6.25C2.58579 6.25 2.25 6.58579 2.25 7C2.25 7.41421 2.58579 7.75 3 7.75V6.25ZM5 7.75C5.41421 7.75 5.75 7.41421 5.75 7C5.75 6.58579 5.41421 6.25 5 6.25V7.75ZM3 7.75C3.41421 7.75 3.75 7.41421 3.75 7C3.75 6.58579 3.41421 6.25 3 6.25V7.75ZM1 6.25C0.585786 6.25 0.25 6.58579 0.25 7C0.25 7.41421 0.585786 7.75 1 7.75V6.25ZM3 15H3.75V7H3H2.25V15H3ZM6 1V0.25C3.92893 0.25 2.25 1.92893 2.25 4H3H3.75C3.75 2.75736 4.75736 1.75 6 1.75V1ZM3 4H2.25V7H3H3.75V4H3ZM3 7V7.75H5V7V6.25H3V7ZM3 7V6.25H1V7V7.75H3V7Z"
                      className="fill-secondary dark:fill-accent"
                    />
                  </svg>
                </a>
                <div className="h-5 w-px bg-stroke-1 dark:bg-stroke-8" />
                <a href="#" className="footer-social-link" aria-label="Instagram">
                  {/* … (iconos restantes igual que en la plantilla) */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11 1H5C2.79086 1 1 2.79086 1 5V11C1 13.2091 2.79086 15 5 15H11C13.2091 15 15 13.2091 15 11V5C15 2.79086 13.2091 1 11 1Z"
                      className="stroke-secondary dark:stroke-accent"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8C11 8.79565 10.6839 9.55871 10.1213 10.1213C9.55871 10.6839 8.79565 11 8 11Z"
                      className="stroke-secondary dark:stroke-accent"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect x="11" y="5" width="2" height="2" rx="1" transform="rotate(-90 11 5)" className="fill-secondary dark:fill-accent" />
                    <rect x="11.5" y="4.5" width="1" height="1" rx="0.5" transform="rotate(-90 11.5 4.5)" className="stroke-secondary dark:stroke-accent" strokeLinecap="round" />
                  </svg>
                </a>
                {/* Añade Youtube/LinkedIn/Dribbble/Behance igual que el template si quieres */}
              </div>
            </div>
          </div>

          {/* ...dentro del render... */}
        <div className="lg:col-span-8 col-span-12 grid grid-cols-12 gap-x-0 gap-y-8">
        {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="col-span-12 md:col-span-4">
            <div data-ns-animate data-delay="0.5" className="space-y-8">
                <p className="sm:text-heading-6 text-tagline-1 font-normal text-secondary dark:text-accent">
                {section.title}
                </p>
                <ul className="space-y-5">
                {section.links.map((link) => (
                    <li key={link.label}>
                    {isInternal(link) ? (
                        <Link href={link.href} className="footer-link-v2">
                        {link.label}
                        </Link>
                    ) : (
                        <a href={link.href} className="footer-link-v2" target="_blank" rel="noreferrer">
                        {link.label}
                        </a>
                    )}
                    </li>
                ))}
                </ul>
            </div>
            </div>
        ))}
        </div>
        </div>

        {/* Divider + copyright */}
        <div className="pt-6 pb-[60px] text-center relative overflow-hidden">
          <div className="footer-divider absolute top-0 left-0 right-0 w-0 origin-center mx-auto h-px bg-stroke-2 dark:bg-accent/5" />
          <p
            data-ns-animate
            data-delay="0.7"
            data-offset="10"
            data-start="top 105%"
            className="text-secondary dark:text-accent/60"
          >
            © {new Date().getFullYear()} SoulMarket – smart application for modern business
          </p>
        </div>
      </div>
    </footer>
  )
}