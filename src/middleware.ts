import createMiddleware from 'next-intl/middleware';
import {routing} from '@/i18n/routing';

// Usa exactamente el mismo routing (locales, defaultLocale, localePrefix, pathnames)
export default createMiddleware(routing);

// No interceptes assets, archivos con extensión ni /api
export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)']
};