'use client'

import Image from 'next/image'
import {useEffect, useState} from 'react'
import {useTranslations, useLocale} from 'next-intl'
import {Link, usePathname, getPathname} from '@/i18n/navigation'
import type {Href} from '@/i18n/navigation'
import {MAIN_MENU} from '@/i18n/routing'
import LocaleSwitch from './LocaleSwitch'
import {initHeaderAnimations} from '@/lib/animations/headerScroll'


type Props = {
  className?: string
  navItemClass?: string
  btnClass?: string
}

type HeaderKey =
  | 'home'
  | 'about'
  | 'services'
  | 'portfolio'
  | 'contact'
  | 'cta'
  | 'openMenu'
  | 'closeMenu'

export default function HeaderOne({
  className = '',
  navItemClass = '',
  btnClass = '',
}: Props) {
  const t = useTranslations('Header')
  const pathname = usePathname()
  const locale = useLocale()
  const [open, setOpen] = useState(false)

  // Cierra el sidebar en cada navegación
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Bloquea scroll de body cuando el sidebar está abierto (móvil)
  useEffect(() => {
    if (open) document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
    return () => document.body.classList.remove('overflow-hidden')
  }, [open])

  function keyFromHref(href: Href): HeaderKey {
    const canonical = typeof href === 'string' ? href : href.pathname
    return canonical === '/' ? 'home' : (canonical.slice(1) as HeaderKey)
  }

  const getLabel = (href: Href) => t(keyFromHref(href))
  const isActive = (href: Href) => {
    const target = getPathname({href, locale})
    return pathname === target || pathname.startsWith(target + '/')
  }

 

    useEffect(() => {
      const cleanup = initHeaderAnimations()
      return cleanup
    }, [])


  return (
    <header className='header-one'>
      {/* Barra superior estilo glass */}
      <div
        className={[
            'header.one',
            'fixed inset-x-0 top-0 z-[9999]',
            'mx-auto w-full',
            'backdrop-blur-xl backdrop-saturate-150',
            'bg-white/30 dark:bg-gray-900/30',
            'border border-white/20 dark:border-white/10',
            'rounded-full',
            'max-w-[1290px] xl:max-w-[1140px] lg:max-w-[960px] md:max-w-[720px] sm:max-w-[540px] min-[500px]:max-w-[450px] min-[425px]:max-w-[375px] max-w-[320px]',
            'px-3 py-2 xl:py-0',
            'left-1/2 -translate-x-1/2 top-5',
            'js-header-bar',          // ✅ identifica el bloque visible
            'header-bar', 
          className
        ].join(' ')}
      >
        <div className="mx-auto h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" aria-label={t('home')}>
              <span className="sr-only">{t('home')}</span>
              <div className="flex items-center">
                <span className="hidden lg:inline-block">
                  <Image
                    width={198}
                    height={40}
                    src="/main-logo.svg"
                    alt="SoulMarket"
                    className="dark:hidden h-auto w-auto"
                    />
                    <Image
                    width={198}
                    height={40}
                    src="/dark-logo.svg"
                    alt="SoulMarket"
                    className="hidden dark:block h-auto w-auto"
                    />
                </span>
                <span className="lg:hidden inline-block">
                  <Image src="/logo.svg" alt="Logo" width={44} height={44} />
                </span>
              </div>
            </Link>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden xl:flex items-center">
            <ul className="flex items-center gap-2">
              {MAIN_MENU.map((href: Href) => (
                <li key={typeof href === 'string' ? href : href.pathname} className="py-2.5">
                  <Link
                    href={href}
                    className={[
                      'px-3 py-2 text-sm rounded-full transition-colors',
                      isActive(href)
                        ? 'bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white',
                      navItemClass || ''
                    ].join(' ')}
                    aria-current={isActive(href) ? 'page' : undefined}
                  >
                    {getLabel(href)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA (desktop) */}
          <div className="hidden xl:flex items-center">
            <LocaleSwitch />
           
            <Link
              href="/contact"
              className={['btn','btn-md', btnClass || 'btn-primary'].join(' ')}
            >
              <span>{t('cta')}</span>
            </Link>
          </div>

          {/* Hamburguesa (mobile) */}
          <div className="xl:hidden block">
            <button
              type="button"
              aria-label={t('openMenu')}
              aria-expanded={open}
              aria-controls="mobile-sidebar"
              onClick={() => setOpen(true)}
              className="flex flex-col gap-1.5 size-10 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center"
            >
              <span className="sr-only">{t('openMenu')}</span>
              <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200"></span>
              <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200"></span>
              <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar móvil controlado por estado */}
      <aside
        id="mobile-sidebar"
        className={[
          'fixed top-0 right-0 h-dvh w-full sm:w-[420px]',
          'bg-white dark:bg-gray-900',
          'transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
          'z-[99999] xl:hidden'
        ].join(' ')}
        aria-hidden={!open}
      >
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/" aria-label={t('home')} onClick={() => setOpen(false)}>
              <span className="sr-only">{t('home')}</span>
              <Image src="/logo.svg" alt="Logo" width={44} height={44} />
            </Link>
            <button
              type="button"
              aria-label={t('closeMenu')}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center size-10 rounded-full bg-gray-100 dark:bg-gray-800"
            >
              <span className="sr-only">{t('closeMenu')}</span>
              <span className="relative block w-4 h-4">
                <span className="absolute inset-0 rotate-45 origin-center block w-4 h-0.5 bg-gray-800 dark:bg-gray-200 top-1/2 -translate-y-1/2"></span>
                <span className="absolute inset-0 -rotate-45 origin-center block w-4 h-0.5 bg-gray-800 dark:bg-gray-200 top-1/2 -translate-y-1/2"></span>
              </span>
            </button>
          </div>

          <nav>
            <ul className="flex flex-col gap-2">
              {MAIN_MENU.map((href: Href) => (
                <li key={typeof href === 'string' ? href : href.pathname}>
                  <Link
                    href={href}
                    className={[
                      'block px-4 py-3 rounded-lg',
                      isActive(href)
                        ? 'bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10'
                    ].join(' ')}
                    onClick={() => setOpen(false)}
                  >
                    {getLabel(href)}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="/contact"
                  className="btn btn-md btn-primary w-full text-center"
                  onClick={() => setOpen(false)}
                >
                  {t('cta')}
                </Link>
              </li>
              <li className="pt-2">
                <LocaleSwitch />
                
            </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Overlay (click para cerrar) */}
      <button
        type="button"
        aria-hidden={!open}
        tabIndex={-1}
        className={[
          'fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
          'z-[99990] xl:hidden'
        ].join(' ')}
        onClick={() => setOpen(false)}
      />
    </header>
    )
  }