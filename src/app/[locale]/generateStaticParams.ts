export const dynamic = 'error';

export function generateStaticParams() {
  return [
    { locale: 'es' }, // 🇪🇸 Español → raíz /
    { locale: 'en' }  // 🇬🇧 Inglés → /en
  ];
}

// (Opcional) Desactiva parámetros dinámicos
export const dynamicParams = false;