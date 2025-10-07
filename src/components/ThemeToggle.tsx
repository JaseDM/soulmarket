'use client'

import {useEffect, useRef, useState , useCallback} from 'react'
import gsap from 'gsap'
import {useTranslations} from 'next-intl'

const LS_KEY = 'color-theme'
const DARK_CLASS = 'dark'

function getInitialIsDark(): boolean {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem(LS_KEY)
  if (stored === 'dark') return true
  if (stored === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function ThemeToggle() {
  const t = useTranslations('Header')
  const [isDark, setIsDark] = useState<boolean | null>(null)
  const sunRef = useRef<HTMLSpanElement>(null)
  const moonRef = useRef<HTMLSpanElement>(null)

  

  useEffect(() => {
    const initial = getInitialIsDark()
    document.documentElement.classList.toggle(DARK_CLASS, initial)
    localStorage.setItem(LS_KEY, initial ? 'dark' : 'light')
    setIsDark(initial)
  }, [])
  const applyTheme = useCallback((nextDark: boolean) => {
      document.documentElement.classList.toggle(DARK_CLASS, nextDark)
      localStorage.setItem(LS_KEY, nextDark ? 'dark' : 'light')
      setIsDark(nextDark)

      const showEl = nextDark ? sunRef.current : moonRef.current
      const hideEl = nextDark ? moonRef.current : sunRef.current
      hideEl?.classList.add('hidden')
      showEl?.classList.remove('hidden')
      animateIn(showEl)
    }, []) 

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(LS_KEY)
      if (!stored) applyTheme(e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [applyTheme])

  function animateIn(el: HTMLElement | null) {
    if (!el) return
    gsap.fromTo(el, {x: 100, opacity: 0}, {x: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out'})
  }

  

  function toggle() {
    const next = !(isDark ?? false)
    applyTheme(next)
  }

  if (isDark === null) return null

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={t('toggleTheme', {default: 'Cambiar tema'})}
      className="w-12 h-12 z-[9999] fixed right-0 bottom-5 rounded-l-2xl cursor-pointer flex items-center justify-center
                 bg-gray-800 dark:bg-gray-100"  // 👈 antes: dark:bg-white (fondo blanco)
    >
      {/* 🌙 LUNA → visible en LIGHT (fondo negro, icono blanco) */}
        <span id="dark-theme-icon" ref={moonRef} className={isDark ? 'hidden' : ''} aria-hidden={isDark}>
            
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/>
            </svg>
           
        </span>

        {/* ☀️ SOL → visible en DARK (fondo blanco, icono negro) */}
        <span id="light-theme-icon" ref={sunRef} className={isDark ? '' : 'hidden'} aria-hidden={!isDark}>
          
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/>
            </svg>
            
        </span>
    </button>
  )
}