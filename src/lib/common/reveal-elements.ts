// src/lib/common/reveal-elements.ts
// Revelado de elementos con IntersectionObserver + GSAP opcional
// Limpio de `any` y con tipos estrictos.

type Cleanup = () => void;

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

type RevealDataset = {
  nsAnimate?: string;
  direction?: RevealDirection;
  delay?: string;     // números en string: "0.1"
  offset?: string;    // números en string: "50"
  instant?: string;   // "true" para pintar sin animación
};

type MinimalGSAP = {
  fromTo: (
    target: Element | Element[] | NodeListOf<Element>,
    fromVars: Record<string, unknown>,
    toVars: Record<string, unknown>
  ) => unknown;
};

function parseNumberAttr(value: string | undefined, fallback: number): number {
  if (value == null) return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function getDirectionOffset(
  direction: RevealDirection,
  offset: number
): { x: number; y: number } {
  switch (direction) {
    case 'up':
      return { x: 0, y: offset };
    case 'down':
      return { x: 0, y: -offset };
    case 'left':
      return { x: offset, y: 0 };
    case 'right':
      return { x: -offset, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

export function initRevealElements(): Cleanup {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  // Colecciones para cleanup
  const unobserveFns: Array<() => void> = [];
  let io: IntersectionObserver | null = null;

  // Elementos objetivo
  const targets = Array.from(
    document.querySelectorAll<HTMLElement>('[data-ns-animate]')
  );

  if (targets.length === 0) {
    return () => {};
  }

  // Carga GSAP de forma opcional
  let gsap: MinimalGSAP | null = null;
  (async () => {
    try {
      const mod = await import('gsap');
      gsap = (mod?.default ?? mod) as unknown as MinimalGSAP;
    } catch {
      // Si no hay GSAP, haremos un fallback básico con estilos
      gsap = null;
    }
  })().catch(() => { /* noop */ });

  // Pre-set de estilos iniciales (evita flashes)
  for (const el of targets) {
    const ds = el.dataset as RevealDataset;
    if (ds.instant === 'true') {
      // Pintado instantáneo, no ocultamos
      continue;
    }
    // Estado inicial: oculto / desplazado
    el.style.willChange = 'transform, opacity, filter';
    el.style.opacity = '0';
    // Nota: el desplazamiento inicial se aplicará en el momento del reveal para soportar cambios de dirección/offset por data-*
  }

  // IntersectionObserver callback
  const onIntersect: IntersectionObserverCallback = (entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as HTMLElement;
      const ds = el.dataset as RevealDataset;

      // No volver a animar si ya se hizo
      if (el.dataset.revealed === 'true') {
        observer.unobserve(el);
        return;
      }

      // “Instantáneo” = nada de animación
      if (ds.instant === 'true') {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = 'none';
        el.dataset.revealed = 'true';
        observer.unobserve(el);
        return;
      }

      // Parámetros desde data-*
      const direction: RevealDirection = (ds.direction as RevealDirection) ?? 'up';
      const delay = parseNumberAttr(ds.delay, 0);        // seg
      const offset = parseNumberAttr(ds.offset, 20);     // px
      const { x, y } = getDirectionOffset(direction, offset);

      // Si hay GSAP, usamos animación suave; si no, fallback con CSS inline
      if (gsap) {
        // fromTo con opacidad y transform
        gsap.fromTo(
          el,
          {
            opacity: 0,
            x,
            y,
            filter: 'blur(8px)'
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
            // tiempos GSAP en segundos
            duration: 0.6,
            delay,
            ease: 'power2.out',
            // evento onComplete para marcar y limpiar
            onComplete: () => {
              el.dataset.revealed = 'true';
              // limpiamos estilos que ya no son necesarios
              el.style.willChange = '';
            }
          } as Record<string, unknown>
        );
      } else {
        // Fallback sin GSAP: transición CSS básica controlada por JS
        el.style.transition = 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease, filter 600ms ease';
        // posición inicial
        el.style.transform = `translate(${x}px, ${y}px)`;
        el.style.opacity = '0';
        el.style.filter = 'blur(8px)';

        // forzamos reflow para que la transición ocurra
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        el.offsetHeight;

        // destino
        window.setTimeout(() => {
          el.style.transform = 'translate(0, 0)';
          el.style.opacity = '1';
          el.style.filter = 'blur(0px)';
          el.dataset.revealed = 'true';
          el.style.willChange = '';
        }, Math.max(0, Math.round(delay * 1000)));
      }

      observer.unobserve(el);
    }
  };

  // Crear IO con rootMargin para iniciar antes (mejor UX)
  io = new IntersectionObserver(onIntersect, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.15
  });

  // Observar todos los objetivos
  for (const el of targets) {
    io.observe(el);
    unobserveFns.push(() => io?.unobserve(el));
  }

  // Cleanup
  const cleanup: Cleanup = () => {
    for (const off of unobserveFns) {
      try { off(); } catch { /* noop */ }
    }
    try { io?.disconnect(); } catch { /* noop */ }
    io = null;
  };

  return cleanup;
}