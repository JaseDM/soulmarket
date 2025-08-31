// src/config/footer.ts
import type { Route } from 'next'

export type InternalLink = {
  label: string
  href: Route       // SOLO rutas internas que existen (/terms, /privacy, ...)
  external?: false
}

export type ExternalLink = {
  label: string
  href: string      // http(s)://..., mailto:, o rutas que aún NO existen
  external: true
}

export type FooterLink = InternalLink | ExternalLink

export type FooterSection = {
  title: string
  links: FooterLink[]
}

// Helper (type guard)
export const isInternal = (l: FooterLink): l is InternalLink => !l.external

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Tutorial', href: '/learn' },
      { label: 'Support', href: '/support' },
      // Ejemplo externo:
      // { label: 'Status', href: 'https://status.tu-dominio.com', external: true }
    ],
  },
  {
    title: 'Legal Policies',
    links: [
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Refund Policy', href: '/refund' },
      { label: 'GDPR Compliance', href: '/gdpr' },
      { label: 'Affiliate Policy', href: '/affiliate-policy' },
    ],
  },
]