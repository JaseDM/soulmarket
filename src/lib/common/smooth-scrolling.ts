// src/lib/common/smooth-scrolling.ts
type Cleanup = () => void;

/* ───────── Tipos mínimos (sin dependencias) ───────── */

interface GsapTicker {
  add: (fn: (t: number) => void) => void;
  remove: (fn: (t: number) => void) => void;
  lagSmoothing?: (threshold?: number, adjustedLag?: number) => void;
}
interface GsapLike {
  ticker?: GsapTicker;
  registerPlugin?: (...plugins: unknown[]) => void;
}
interface ScrollTriggerLike {
  update: () => void;
}
interface LenisOptions {
  lerp?: number;
  smoothWheel?: boolean;
}
interface LenisInstance {
  raf: (time: number) => void;
  on?: (event: 'scroll', handler: () => void) => void;
  off?: (event: 'scroll', handler: () => void) => void;
  destroy?: () => void;
  scrollTo?: (
    target: string | Element,
    options?: { offset?: number; duration?: number; easing?: (t: number) => number }
  ) => void;
}
type LenisCtor = new (opts?: LenisOptions) => LenisInstance;

/* ───────── Utils ───────── */

function isMobileLike() {
  if (typeof window === 'undefined') return false;
  const ua = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)
    || window.innerWidth <= 768
    || 'ontouchstart' in window;
}

export function initSmoothScrolling(): Cleanup {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};

  let rafId: number | null = null;
  let gsapTickerFn: ((t: number) => void) | null = null;
  let lenis: LenisInstance | null = null;
  let lenisScrollHandler: (() => void) | null = null;
  let removeScrollTriggerUpdate: (() => void) | null = null;

  const clickHandlers: Array<{ el: Element; fn: (e: Event) => void }> = [];

  const setup = async () => {
    // Carga GSAP (opcional) y ScrollTrigger
    let gsapRef: GsapLike | undefined;
    let ScrollTriggerRef: ScrollTriggerLike | undefined;

    try {
      const gsapMod: unknown = await import('gsap');
      // gsap puede venir en varias formas según bundler
      const maybeGsap = (gsapMod as { gsap?: GsapLike; default?: GsapLike })?.gsap
        ?? (gsapMod as { default?: GsapLike })?.default
        ?? (gsapMod as GsapLike);
      if (maybeGsap && typeof maybeGsap === 'object') {
        gsapRef = maybeGsap;
      }

      try {
        const stMod: unknown = await import('gsap/ScrollTrigger');
        const maybeST =
          (stMod as { ScrollTrigger?: ScrollTriggerLike; default?: ScrollTriggerLike })?.ScrollTrigger
          ?? (stMod as { default?: ScrollTriggerLike })?.default;

        if (maybeST && gsapRef?.registerPlugin) {
          gsapRef.registerPlugin(maybeST);
          ScrollTriggerRef = maybeST;
        }
      } catch {
        // ScrollTrigger opcional
      }
    } catch {
      // GSAP opcional
    }

    // Lenis solo en desktop
    if (!isMobileLike()) {
      try {
        const mod = await import('@studio-freight/lenis');
        const Lenis = (mod as { default: LenisCtor }).default;
        const instance = new Lenis({ lerp: 0.1, smoothWheel: true });
        lenis = instance;

        if (lenis && ScrollTriggerRef?.update && lenis.on && lenis.off) {
          lenisScrollHandler = () => ScrollTriggerRef!.update();
          lenis.on('scroll', lenisScrollHandler);
          removeScrollTriggerUpdate = () => {
            try { lenis?.off?.('scroll', lenisScrollHandler!); } catch {}
          };
        }

        if (gsapRef?.ticker?.add) {
          gsapTickerFn = (time: number) => lenis?.raf(time * 1000);
          gsapRef.ticker.add(gsapTickerFn);
          if (typeof gsapRef.ticker.lagSmoothing === 'function') {
            gsapRef.ticker.lagSmoothing(0);
          }
        } else {
          const loop = (t: number) => {
            lenis?.raf(t);
            rafId = requestAnimationFrame(loop);
          };
          rafId = requestAnimationFrame(loop);
        }
      } catch {
        lenis = null; // fallback nativo
      }
    }

    // Enlaces con desplazamiento suave
    const links = document.querySelectorAll<HTMLElement>('.lenis-scroll-to');
    const onClick = (el: HTMLElement) => (e: Event) => {
      e.preventDefault();
      const href = el.getAttribute('href');
      if (!href) return;
      if (lenis?.scrollTo) {
        lenis.scrollTo(href, {
          offset: -100, duration: 1.7, easing: (t: number) => 1 - Math.pow(1 - t, 3)
        });
      } else {
        const target = document.querySelector(href);
        if (target) {
          (target as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => window.scrollBy(0, -100), 100);
        }
      }
    };
    links.forEach((el) => {
      const fn = onClick(el);
      el.addEventListener('click', fn);
      clickHandlers.push({ el, fn });
    });
  };

  void setup();

  return () => {
    clickHandlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
    try {
      if (gsapTickerFn) {
        const gsapGlobal = (globalThis as unknown as { gsap?: GsapLike }).gsap;
        if (gsapGlobal?.ticker?.remove) gsapGlobal.ticker.remove(gsapTickerFn);
      } else if (rafId != null) {
        cancelAnimationFrame(rafId);
      }
    } catch {}
    try { removeScrollTriggerUpdate?.(); } catch {}
    try { lenis?.destroy?.(); } catch {}
  };
}