import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Excluye /api, /_next, etc. y ficheros con punto
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};