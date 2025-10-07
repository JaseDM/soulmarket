type Direction = 'left' | 'right' | 'top' | 'bottom';

interface MarqueeHooks {
  beforeInit?: () => void;
  afterInit?: () => void;
}

interface InfiniteMarqueeOptions {
  element: string;
  speed?: number;
  smoothEdges?: boolean;
  direction?: Direction;
  gap?: string | number;
  duplicateCount?: number;
  pauseOnHover?: boolean;
  mobileSettings?: {
    direction?: Direction;
    speed?: number;
  };
  on?: MarqueeHooks;
}

interface InfiniteMarqueeInstance {
  destroy?: () => void;
}

type InfiniteMarqueeCtor = new (options: InfiniteMarqueeOptions) => InfiniteMarqueeInstance;

// Si la librería inyecta el constructor en window, lo tipamos:
declare global {
  interface Window {
    InfiniteMarquee?: InfiniteMarqueeCtor;
  }
}

/**
 * Inicializa las diferentes marquesinas y devuelve una función de cleanup.
 */
export function initMarqueeAnimations(): () => void {
  // SSR guard
  if (typeof window === 'undefined') {
    return () => {};
  }

  const Marquee = window.InfiniteMarquee;
  if (!Marquee) {
    // Si no existe la lib, no hacemos nada
    // (puedes quitar el console.warn si no lo quieres)
    console.warn('InfiniteMarquee not available');
    return () => {};
  }

  const instances: InfiniteMarqueeInstance[] = [];

  const create = (selector: string, options: Omit<InfiniteMarqueeOptions, 'element'>) => {
    const el = document.querySelector(selector);
    if (el) {
      const inst = new Marquee({ element: selector, ...options });
      instances.push(inst);
    }
  };

  create('.logos-marquee-container', {
    speed: 40000,
    smoothEdges: true,
    direction: 'left',
    gap: '32px',
    duplicateCount: 1,
    mobileSettings: {
      direction: 'top',
      speed: 50000,
    },
    on: {
      beforeInit: () => console.log('Not Yet Initialized'),
      afterInit: () => console.log('Initialized'),
    },
  });

  create('.logos-right-marquee-container', {
    speed: 40000,
    smoothEdges: true,
    direction: 'right',
    gap: '32px',
    duplicateCount: 1,
    mobileSettings: {
      direction: 'right',
      speed: 50000,
    },
    on: {
      beforeInit: () => console.log('Not Yet Initialized'),
      afterInit: () => console.log('Initialized'),
    },
  });

  create('.cards-marquee-container', {
    speed: 140000,
    smoothEdges: true,
    direction: 'left',
    gap: '32px',
    pauseOnHover: true,
    on: {
      beforeInit: () => console.log('Not Yet Initialized'),
      afterInit: () => console.log('Initialized'),
    },
  });

  create('.cards-right-marquee-container', {
    speed: 140000,
    smoothEdges: true,
    direction: 'right',
    gap: '32px',
    pauseOnHover: true,
    on: {
      beforeInit: () => console.log('Not Yet Initialized'),
      afterInit: () => console.log('Initialized'),
    },
  });

  // Cleanup
  return () => {
    for (const inst of instances) {
      inst.destroy?.();
    }
  };
}