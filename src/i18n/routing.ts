// src/i18n/routing.ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',           // 🇪🇸 por defecto en la raíz
  localePrefix: 'as-needed',     // sin prefijo para ES, con /en para inglés
  // Rutas CANÓNICAS (izquierda) + segmentación localizada por idioma
  pathnames: {
    '/': '/',
    '/about':     {en: '/about',     es: '/nosotros'},
    '/services':  {en: '/services',  es: '/servicios'},
    '/portfolio': {en: '/portfolio', es: '/portafolio'},
    '/contact':   {en: '/contact',   es: '/contacto'}
  }
});

// Menú principal basado en rutas canónicas
export const MAIN_MENU = ['/', '/about', '/services', '/portfolio', '/contact'] as const;

// (Opcional) tipo útil en componentes
export type MainMenuItem = (typeof MAIN_MENU)[number];