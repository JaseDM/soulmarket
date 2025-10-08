// src/middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  // 👇 fuerza el prefijo SIEMPRE, incluso para el idioma por defecto
  localePrefix: 'always',
  // opcional: si no quieres negociar por Accept-Language
  // localeDetection: false
});

// Evita que el middleware toque assets y archivos estáticos
export const config = {
  matcher: [
    '/((?!_next|.*\\..*|api).*)' // excluye /_next, ficheros con extensión y /api
  ]
};