'use client'
import { useEffect } from 'react'

export default function InitTemplateScripts() {
  useEffect(() => {
    // Carga diferida en cliente para evitar SSR/hidratación prematura
    const run = async () => {
      try {
        await import('@/app/lib/nextsaas/main')
      } catch (err) {
        console.error('Error inicializando scripts del template:', err)
      }
    }
    // pequeña espera para asegurar que el DOM inicial esté montado
    const id = setTimeout(run, 0)
    return () => clearTimeout(id)
  }, [])

  return null
}