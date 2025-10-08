export const dynamic = 'error'; // obliga SSG en este segmento

export function generateStaticParams() {
  // añade aquí todos los locales que quieres pre-generar
  return [{ locale: 'es' }, { locale: 'en' }];
}