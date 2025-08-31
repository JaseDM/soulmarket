import type { Route } from 'next'

export type NavItem = {
  href: Route            // typedRoutes: valida rutas existentes
  label: string
  external?: boolean     // por si algún día apuntas fuera
  cta?: boolean          // para marcar el botón principal
}

export const MAIN_NAV: NavItem[] = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Sobre Nosotros' },
  { href: '/services', label: 'Servicios' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contáctanos' },
]

// CTA opcional (si quieres separarlo)
export const CTA: NavItem = { href: '/signup', label: 'Habla con nosotros', cta: true }