import type { MetadataRoute } from 'next'

const BASE_URL = 'https://soulmarket.es' // cámbialo

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/private/', '/drafts/'],
      },
    ],
    sitemap: [
        `${BASE_URL}/sitemap/es.xml`,
        `${BASE_URL}/sitemap/en.xml`,
    ],
    host: BASE_URL,
  }
}