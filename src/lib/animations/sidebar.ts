// src/lib/animations/sidebar.ts

type Cleanup = () => void;

interface SidebarElements {
  navHamburger: HTMLElement | null;
  navHamburgerClose: HTMLElement | null;
  sidebar: HTMLElement | null;
  overlay: HTMLElement | null;            // .sidebar-overlay opcional
  subMenu: NodeListOf<HTMLElement>;
}

export function initSidebarAnimation(): Cleanup {
  if (typeof window === 'undefined') return () => {};

  const els: SidebarElements = {
    navHamburger: document.querySelector<HTMLElement>('.nav-hamburger'),
    navHamburgerClose: document.querySelector<HTMLElement>('.nav-hamburger-close'),
    sidebar: document.querySelector<HTMLElement>('.sidebar'),
    overlay: document.querySelector<HTMLElement>('.sidebar-overlay'),
    subMenu: document.querySelectorAll<HTMLElement>('.sub-menu'),
  };

  const listeners: Array<() => void> = [];

  const openSidebar = () => {
    els.sidebar?.classList.add('show-sidebar');
    document.body.classList.add('overflow-hidden');
    els.overlay?.classList.remove('hidden');
  };

  const closeSidebar = () => {
    els.sidebar?.classList.remove('show-sidebar');
    document.body.classList.remove('overflow-hidden');
    els.overlay?.classList.add('hidden');
  };

  // Botón abrir
  if (els.navHamburger) {
    const handler = () => openSidebar();
    els.navHamburger.addEventListener('click', handler);
    listeners.push(() => els.navHamburger?.removeEventListener('click', handler));
  }

  // Botón cerrar
  if (els.navHamburgerClose) {
    const handler = () => closeSidebar();
    els.navHamburgerClose.addEventListener('click', handler);
    listeners.push(() => els.navHamburgerClose?.removeEventListener('click', handler));
  }

  // Cerrar al pulsar overlay
  if (els.overlay) {
    const handler = (e: Event) => {
      if (e.target === els.overlay) closeSidebar();
    };
    els.overlay.addEventListener('click', handler);
    listeners.push(() => els.overlay?.removeEventListener('click', handler));
  }

  // Submenús
  els.subMenu.forEach((menu) => {
    const handler = () => {
      // toggle del actual
      menu.classList.toggle('active-menu');

      const content = menu.nextElementSibling as HTMLElement | null;
      if (content) content.classList.toggle('hidden');

      // icono (asumimos 2º hijo es el caret)
      const caret = menu.children.item(1) as HTMLElement | null;
      caret?.classList.toggle('rotate-90');

      // cerrar otros
      els.subMenu.forEach((other) => {
        if (other !== menu) {
          other.classList.remove('active-menu');
          (other.nextElementSibling as HTMLElement | null)?.classList.add('hidden');
          const otherCaret = other.children.item(1) as HTMLElement | null;
          otherCaret?.classList.remove('rotate-90');
        }
      });
    };

    menu.addEventListener('click', handler);
    listeners.push(() => menu.removeEventListener('click', handler));
  });

  // Cleanup: quita listeners y restaura body/overlay si quedó abierto
  return () => {
    listeners.forEach((off) => {
      try {
        off();
      } catch {}
    });
    // Estado visual saneado
    els.sidebar?.classList.remove('show-sidebar');
    document.body.classList.remove('overflow-hidden');
    els.overlay?.classList.add('hidden');
  };
}