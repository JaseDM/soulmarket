// src/config/nav.ts
import type {Href} from '@/i18n/navigation'

export type HeaderKey =
  | 'home'
  | 'about'
  | 'services'
  | 'portfolio'
  | 'contact'
  | 'cta'
  | 'openMenu'
  | 'closeMenu'

export type NavItem = {
  href: Href
  /** Clave en messages.json → "Header.<key>" */
  i18nKey?: `Header.${HeaderKey}`
  /** Fallback opcional (si no hay i18nKey) */
  label?: string
}

export const MAIN_NAV: NavItem[] = [
  {href: '/',          i18nKey: 'Header.home'},
  {href: '/about',     i18nKey: 'Header.about'},
  {href: '/services',  i18nKey: 'Header.services'},
  {href: '/portfolio', i18nKey: 'Header.portfolio'},
  {href: '/contact',   i18nKey: 'Header.contact'}
]

export const CTA: NavItem = {href: '/contact', i18nKey: 'Header.cta'}