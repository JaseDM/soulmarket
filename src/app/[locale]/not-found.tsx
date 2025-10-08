// src/app/[locale]/not-found.tsx
import {setRequestLocale, getLocale} from 'next-intl/server'
import Link from 'next/link'

export default async function NotFound() {
  // En not-found no siempre hay params; toma el locale si está disponible o usa 'es' por defecto
  let locale = 'es'
  try {
    const l = await getLocale()
    if (typeof l === 'string') locale = l
  } catch {
    // noop: fallback 'es'
  }

  setRequestLocale(locale)

  return (
    <main className="min-h-screen flex items-center justify-center bg-background-3 dark:bg-background-5">
      <div className="text-center px-6 py-16">
        <span className="badge badge-green mb-4 inline-block">404</span>
        <h1 className="mb-2">Página no encontrada</h1>
        <p className="opacity-70 mb-6">
          La página que buscas no existe o fue movida.
        </p>
        <Link href={`/${locale}`} className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}