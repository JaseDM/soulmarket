export function getBaseUrl() {
  // Usa NEXT_PUBLIC_SITE_URL en producción; fallback a origin local
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '')
  }
  return 'http://localhost:3000'
}

export function alternateLocales(
  base: string,
  pathnameByLocale: Record<string, string>
) {
  // Construye alternates hreflang -> URL absoluta
  const languages: Record<string, string> = {}
  for (const [locale, path] of Object.entries(pathnameByLocale)) {
    languages[locale] = `${base}${path}`
  }
  return languages
}