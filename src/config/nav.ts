import type { Route } from 'next'

export type NavItem = {
  href: Route            // typedRoutes: valida rutas existentes
  label: string
  external?: boolean     // por si algún día apuntas fuera
  cta?: boolean          // para marcar el botón principal
}

export const MAIN_NAV: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact Us' },
]

// CTA opcional (si quieres separarlo)
export const CTA: NavItem = { href: '/signup', label: 'Get started', cta: true }