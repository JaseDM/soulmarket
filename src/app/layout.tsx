import type { Metadata } from 'next'
import InitTemplateScripts from '@/components/nextsaas/InitTemplateScripts'
import './globals.css'
import HeaderOne from '@/components/nextsaas/HeaderOne'

export const metadata: Metadata = {
  metadataBase: new URL('https://tu-dominio.com'), // <-- cámbialo cuando tengas dominio

  title: {
    default: 'SoulMarket',
    template: '%s | SoulMarket',
  },

  description:
    'NextSaaS - Modern HTML template collection with 35+ home page variations for SaaS businesses, startups, and web applications. Features responsive design, authentication pages, pricing, blog, and more with Tailwind CSS and Vite.',

  keywords: ['HTML', 'Tailwind CSS', 'JavaScript'],

  authors: [{ name: 'NextSaaS' }],

  icons: {
    icon: [
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', rel: 'shortcut icon' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },

  manifest: '/site.webmanifest',

  // Next ya añade <meta name="viewport"> y charset por defecto
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh bg-[var(--background)] text-[var(--foreground)] antialiased">
        <HeaderOne />
        <InitTemplateScripts />
        <main className="pt-24">{children}</main>
        
      </body>
    </html>
  )
}