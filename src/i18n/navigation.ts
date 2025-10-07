
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);

// Derivamos el tipo Href a partir de getPathname (tu versión puede no exportarlo)
export type Href =
  Parameters<typeof getPathname>[0] extends {href: infer H} ? H : never;