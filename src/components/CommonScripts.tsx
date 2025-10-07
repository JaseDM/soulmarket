'use client'

import {useEffect} from 'react'
import {usePathname} from 'next/navigation'
import {initCommon} from '@/lib'

export default function CommonScripts() {
  const pathname = usePathname()

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    // Ejecuta solo en browser
    if (typeof window !== 'undefined') {
      (async () => {
        cleanup = await initCommon()
      })()
    }

    // Limpieza al desmontar o cambiar de ruta
    return () => {
      if (cleanup) cleanup()
    }
  }, [pathname])

  return null
}