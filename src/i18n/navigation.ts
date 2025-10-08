import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

export const {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname
} = createNavigation(routing);

// Tipo de href canónico (coincide con tus pathnames en routing)
export type Href = Parameters<typeof getPathname>[0]['href'];

// 🔹 Helper opcional: normaliza y compara rutas (evita falsos negativos con / final)
export const isActivePath = (currentPathname: string, opts: {href: Href; locale: string}) => {
  const normalize = (p: string) => (p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p);
  const target = normalize(getPathname({href: opts.href, locale: opts.locale}));
  const current = normalize(currentPathname);
  return current === target || current.startsWith(`${target}/`);
};

// (opcional) reexporta routing si quieres centralizar imports
export {routing};