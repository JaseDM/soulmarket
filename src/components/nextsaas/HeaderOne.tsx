'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Route } from 'next'
import { useEffect } from 'react'
import Image from 'next/image'
import { MAIN_NAV, CTA } from '@/config/nav'

type Props = {
  /** Estilos adicionales para el contenedor del header */
  className?: string
  /** Clases extra para cada item del nav */
  navItemClass?: string
  /** Clases extra para el botón CTA */
  btnClass?: string
}

export default function HeaderOne({
  className = '',
  navItemClass = '',
  btnClass = '',
}: Props) {
  const pathname = usePathname()

  const closeSidebar = () => {
    const sidebar = document.querySelector('.sidebar') as HTMLElement | null
    const overlay = document.querySelector('.sidebar-overlay') as HTMLElement | null
    sidebar?.classList.remove('show-sidebar')
    document.body.classList.remove('overflow-hidden')
    if (overlay) overlay.classList.add('hidden')
  }

  // Cierra el sidebar cuando cambia la ruta (navegación)
  useEffect(() => {
    closeSidebar()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const isActive = (href: Route) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header>
      <div
        data-ns-animate
        data-direction="up"
        data-offset="20"
        className={[
          'header-one rounded-full',
          'lp:!max-w-[1290px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] min-[500px]:max-w-[450px] min-[425px]:max-w-[375px] max-w-[320px]',
          'mx-auto w-full fixed left-1/2 -translate-x-1/2 z-50 top-5',
          // 👇 más transparencia + más blur + saturación
          'bg-white/30 dark:bg-background-6/30',
          'backdrop-blur-[25px] backdrop-saturate-150',
          'border border-stroke-4 dark:border-background-5',
          // 👇 ojo: aquí faltaba el espacio antes de "flex"
          'flex items-center justify-between px-2.5 xl:py-0 py-2.5',
          className,
        ].join(' ')}
      >
        {/* Logo */}
        <div>
          <Link href="/" aria-label="Home">
            <span className="sr-only">Home</span>

            {/* Logo ancho (desktop) */}
            <figure className="lg:max-w-[198px] lg:block hidden">
              <Image
                width={198}          // 👈 obligatorio
                height={40}   
                src="/images/shared/main-logo.svg"
                alt="SoulMarket"
                className="dark:invert  h-auto w-auto"
              />
            </figure>

            {/* Logo compacto (mobile) */}
            <figure className="max-w-[44px] lg:hidden block">
              <Image
                width={44}
                height={44}
                src="/images/shared/logo.svg"
                alt="SoulMarket"
                className="w-full dark:hidden block  h-auto w-auto"
              />
              <Image
                width={44}
                height={44}
                src="/images/shared/logo-dark.svg"
                alt="SoulMarket"
                className="w-full dark:block hidden  h-auto w-auto"
              />
            </figure>
          </Link>
        </div>

        {/* Navegación desktop (primer nivel, sin mega menú) */}
        <nav className="hidden xl:flex items-center">
          <ul className="flex items-center gap-1">
            {MAIN_NAV.map((item) => (
              <li key={item.href} className="py-2.5">
                <Link
                  href={item.href}
                  className={[
                    'nav-item-link',                 // clase del template
                    isActive(item.href) ? 'is-active' : '',
                    navItemClass || '',
                  ].filter(Boolean).join(' ')}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* CTA (desktop) */}
        <div className="xl:flex hidden items-center justify-center">
          <Link href={CTA.href} className={['btn','btn-md', btnClass || 'btn-primary'].join(' ')}>
            <span>{CTA.label}</span>
          </Link>
        </div>

        {/* Hamburguesa (mobile) */}
        <div className="xl:hidden block">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={false}
            className="nav-hamburger flex flex-col gap-1.5 size-12 bg-background-4 dark:bg-background-6 rounded-full items-center justify-center cursor-pointer relative"
          >
            <span className="sr-only">Open Menu</span>
            <span className="block w-6 h-0.5 bg-stroke-9 dark:bg-stroke-1"></span>
            <span className="block w-6 h-0.5 bg-stroke-9 dark:bg-stroke-1"></span>
            <span className="block w-6 h-0.5 bg-stroke-9 dark:bg-stroke-1"></span>
          </button>
        </div>
      </div>

      {/* === Mobile Sidebar controlled by theme scripts === */}
      <aside
        className="sidebar fixed top-0 right-0 w-full sm:w-1/2 translate-x-full transition-all duration-300 h-screen bg-white dark:bg-background-7 xl:hidden z-[999] scroll-bar"
        aria-hidden="true"
      >
        <div className="lg:p-9 sm:p-8 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="Home">
              <span className="sr-only">Home</span>
              <figure className="max-w-[44px]">
                <Image
                  src="/images/shared/logo.svg"
                  alt="SoulMarket"
                  width={44}
                  height={44}
                  className="w-full dark:hidden block h-auto w-auto"
                />
                <Image
                  src="/images/shared/logo-dark.svg"
                  alt="SoulMarket"
                  width={44}
                  height={44}
                  className="w-full dark:block hidden h-auto w-auto"
                />
              </figure>
            </Link>
            <button
              type="button"
              aria-label="Close Menu"
              onClick={closeSidebar}
              className="nav-hamburger-close flex flex-col gap-1.5 size-10 bg-background-4 dark:bg-background-9 rounded-full items-center justify-center cursor-pointer relative"
            >
              <span className="sr-only">Close Menu</span>
              <span className="block w-4 h-0.5 bg-stroke-9/60 dark:bg-stroke-1 rotate-45 absolute"></span>
              <span className="block w-4 h-0.5 bg-stroke-9/60 dark:bg-stroke-1 -rotate-45 absolute"></span>
            </button>
          </div>

          <div className="h-[85vh] w-full overflow-y-auto overflow-x-hidden pb-10 scroll-bar">
            <nav>
              <ul className="flex flex-col gap-2">
                {MAIN_NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-item-link" onClick={closeSidebar}>
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-4">
                  <Link href={CTA.href} className="btn btn-md btn-primary w-full text-center" onClick={closeSidebar}>
                    {CTA.label}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </aside>
      {/* Overlay para cerrar el sidebar (compatibilidad con el theme) */}
      <div className="sidebar-overlay fixed inset-0 z-[998] hidden xl:hidden"></div>
    </header>
  )
}