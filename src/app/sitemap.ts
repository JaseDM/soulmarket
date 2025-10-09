import type { MetadataRoute } from 'next'

const BASE_URL = 'https://tusitio.com'
const locales = ['es', 'en'] as const

// 1) Indica qué sitemaps quieres (uno por locale)
export async function generateSitemaps() {
  return locales.map((l) => ({ id: l }))
}

// 2) Genera el contenido de cada sitemap según el id (locale)
export default async function sitemap({
  id, // 'es' | 'en'
}: {
  id: (typeof locales)[number]
}): Promise<MetadataRoute.Sitemap> {
  // Aquí obtendrías tus slugs reales desde BD/CMS
  const pages = ['', 'blog'] // '/', '/blog'

  return pages.map((segment) => {
    const path = segment ? `/${segment}` : ''
    const url = `${BASE_URL}/${id}${path}`

    // Si quieres incluir hreflang en cada sitemap por locale:
    const alternates = {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
      ),
    }

    return {
      url,
      lastModified: new Date(),
      alternates,
    }
  })
}