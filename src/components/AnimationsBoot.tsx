'use client';

import {useEffect} from 'react';
import {useLocale} from 'next-intl';
import {usePathname} from 'next/navigation';

import {initCommonAnimations} from '@/lib/common/common';
import {initRevealElements} from '@/lib/common/reveal-elements';
import {initGradientPathAnimation} from '@/lib/animations/gradient-path';
import {initMarqueeAnimations} from '@/lib/animations/marquee';
import {initTabFilter} from '@/lib/animations/tab-filter';
import {initSwiper} from '@/lib/animations/swiper';

type Cleanup = () => void;

// Tipos mínimos para no depender de tipos de GSAP
type ScrollTriggerLike = { kill: () => void };
interface ScrollTriggerNS {
  getAll: () => ScrollTriggerLike[];
  refresh: () => void;
}

async function loadScrollTrigger(): Promise<ScrollTriggerNS | null> {
  try {

    const mod = await import('gsap/ScrollTrigger');
    return (mod.ScrollTrigger ?? mod.default) as ScrollTriggerNS;
  } catch {
    return null;
  }
}

export default function AnimationsBoot() {
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: Cleanup[] = [];

    (async () => {
      try {
        const {default: gsap} = await import('gsap');
        gsap.killTweensOf('*');

        const ScrollTrigger = await loadScrollTrigger();

        // Limpia estilos inline que pueden quedar de animaciones previas
        const toReset = document.querySelectorAll<HTMLElement>(
          '[data-ns-animate], [data-hero-line]'
        );
        toReset.forEach((el) => {
          el.style.removeProperty('filter');
          el.style.removeProperty('opacity');
          el.style.removeProperty('transform');
          el.style.removeProperty('height');
        });

        if (ScrollTrigger) {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        }
      } catch {
        // noop
      }

      // Inicializa animaciones
      try { cleanups.push(initCommonAnimations()); } catch {}
      try { cleanups.push(initRevealElements()); } catch {}
      try { cleanups.push(initGradientPathAnimation()); } catch {}
      try { cleanups.push(initMarqueeAnimations()); } catch {}
      try { cleanups.push(initTabFilter()); } catch {}
      try { cleanups.push(initSwiper()); } catch {}

      // Refresh tras primer paint
      try {
        const ScrollTrigger = await loadScrollTrigger();
        if (ScrollTrigger) {
          requestAnimationFrame(() => {
            try { ScrollTrigger.refresh(); } catch {}
          });
        }
      } catch {}
    })();

    return () => {
      // Ejecuta cleanups registrados
      for (const off of cleanups) {
        try { off(); } catch {}
      }
      // Mata triggers que queden vivos
      (async () => {
        const ScrollTrigger = await loadScrollTrigger();
        if (ScrollTrigger) {
          try {
            ScrollTrigger.getAll().forEach((t) => t.kill());
          } catch {}
        }
      })();
    };
  }, [locale, pathname]);

  // Soporte para refrescos suaves desde otros componentes (portfolio filters, etc.)
  useEffect(() => {
    const onSoftRefresh = async () => {
      try {
        const mod = await import('@/lib/common/reveal-elements').catch(() => null);
        mod?.initRevealElements?.();

        const ScrollTrigger = await loadScrollTrigger();
        ScrollTrigger?.refresh();
      } catch {
        document
          .querySelectorAll<HTMLElement>('[data-ns-animate]')
          .forEach((el) => el.style.removeProperty('opacity'));
      }
    };

    window.addEventListener('animations:refresh', onSoftRefresh);
    return () => window.removeEventListener('animations:refresh', onSoftRefresh);
  }, []);

  return null;
}