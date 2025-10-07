// src/lib/common/progress.ts
type Cleanup = () => void;

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export function initProgress(): Cleanup {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]');
  if (!bar) return () => {};

  // Opcional: limitar el progreso a un contenedor concreto
  // Ej.: <div data-scroll-progress data-progress-target="#main" />
  const targetSelector = bar.getAttribute('data-progress-target') || '';
  const target =
    targetSelector ? (document.querySelector(targetSelector) as HTMLElement | null) : null;

  // A11y
  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-valuemin', '0');
  bar.setAttribute('aria-valuemax', '100');

  let ticking = false;

  const computeProgress = (): number => {
    // Caso 1: documento completo
    if (!target) {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const scrolled = total > 0 ? h.scrollTop / total : 0;
      return clamp01(scrolled);
    }

    // Caso 2: contenedor objetivo
    const rect = target.getBoundingClientRect();
    const viewportH = window.innerHeight || document.documentElement.clientHeight;

    // Distancia total a “recorrer” para el contenedor:
    // desde que su top toca la parte superior del viewport (0)
    // hasta que su bottom pasa la parte inferior del viewport.
    const start = rect.top;                   // top relativo a viewport
    const end = rect.bottom - viewportH;      // cuando su bottom sale por abajo
    const total = end - 0;                    // tramo visible a considerar

    // Si el contenedor es más pequeño que la pantalla, evita divisiones por 0
    if (total <= 0) {
      return rect.bottom <= viewportH ? 1 : 0; // o 1 si ya se ve completo
    }

    // Progreso del “scroll” del contenedor en el viewport
    const progress = (0 - start) / total;
    return clamp01(progress);
  };

  const render = () => {
    ticking = false;
    const p = computeProgress();
    const pct = Math.round(p * 100);

    // Estilo de ancho (barra linear)
    bar.style.width = `${pct}%`;

    // A11y
    bar.setAttribute('aria-valuenow', String(pct));
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  };

  window.addEventListener('scroll', onScroll, {passive: true});
  window.addEventListener('resize', onScroll, {passive: true});

  // Primer pintado
  onScroll();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}