// src/i18n/routing.ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  // Si usas pathnames localizados, déjalos aquí
  pathnames: {
    '/': '/',
    '/about':     {en: '/about',     es: '/nosotros'},
    '/services':  {en: '/services',  es: '/servicios'},
    '/portfolio': {en: '/portfolio', es: '/portafolio'},
    '/contact':   {en: '/contact',   es: '/contacto'}
  }
});

/** 
 * Single source of truth: orden del menú
 * (usa las rutas "canónicas"; next-intl las convierte según el locale activo)
 */
export const MAIN_MENU = ['/', '/about', '/services', '/portfolio', '/contact'] as const;