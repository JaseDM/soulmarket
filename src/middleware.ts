import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en'], // tus idiomas disponibles
  defaultLocale: 'es',   // el idioma por defecto
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'] // aplica a todas las rutas excepto assets
};