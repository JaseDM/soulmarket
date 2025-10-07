"use client";

import {useEffect} from "react";
import {useLocale} from "next-intl";
import {usePathname} from "next/navigation";

import {initCommonAnimations} from "@/lib/common/common";
import {initRevealElements} from "@/lib/common/reveal-elements";
import {initGradientPathAnimation} from "@/lib/animations/gradient-path";
import {initMarqueeAnimations} from "@/lib/animations/marquee";
import {initTabFilter} from "@/lib/animations/tab-filter";
import {initSwiper} from "@/lib/animations/swiper";

type Cleanup = () => void;

/** Tipo mínimo para usar ScrollTrigger sin `any` */
type MinimalScrollTrigger = {
  getAll(): Array<{ kill(): void }>;
  refresh(): void;
};

export default function AnimationsBoot() {
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const cleanups: Cleanup[] = [];

    (async () => {
      // 0) KILL + RESET: tweens, triggers y estilos inline “pegados”
      try {
        const {default: gsap} = await import("gsap");
        gsap.killTweensOf("*");

        const stMod = await import("gsap/ScrollTrigger").catch(() => null);
        const ScrollTrigger: MinimalScrollTrigger | null =
          ((stMod as unknown as { ScrollTrigger?: MinimalScrollTrigger; default?: MinimalScrollTrigger })?.ScrollTrigger) ??
          ((stMod as unknown as { ScrollTrigger?: MinimalScrollTrigger; default?: MinimalScrollTrigger })?.default) ??
          null;

        // limpia estilos inline que pueden dejar contenido borroso/invisible
        const toReset = document.querySelectorAll<HTMLElement>("[data-ns-animate], [data-hero-line]");
        toReset.forEach((el) => {
          el.style.removeProperty("filter");
          el.style.removeProperty("opacity");
          el.style.removeProperty("transform");
          el.style.removeProperty("height");
        });

        if (ScrollTrigger) {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        }
      } catch {
        // noop
      }

      // 1) INIT: vuelve a montar todas tus animaciones
      try { const off = initCommonAnimations(); if (typeof off === "function") cleanups.push(off); } catch {}
      try { const off = initRevealElements(); if (typeof off === "function") cleanups.push(off); } catch {}
      try { const off = initGradientPathAnimation(); if (typeof off === "function") cleanups.push(off); } catch {}
      try { const off = initMarqueeAnimations(); if (typeof off === "function") cleanups.push(off); } catch {}
      try { const off = initTabFilter(); if (typeof off === "function") cleanups.push(off); } catch {}
      try { const off = initSwiper(); if (typeof off === "function") cleanups.push(off); } catch {}

      // 2) REFRESH: mide de nuevo tras pintar (textos cambian alto)
      try {
        const stMod = await import("gsap/ScrollTrigger").catch(() => null);
        const ScrollTrigger: MinimalScrollTrigger | null =
          ((stMod as unknown as { ScrollTrigger?: MinimalScrollTrigger; default?: MinimalScrollTrigger })?.ScrollTrigger) ??
          ((stMod as unknown as { ScrollTrigger?: MinimalScrollTrigger; default?: MinimalScrollTrigger })?.default) ??
          null;

        if (ScrollTrigger) {
          requestAnimationFrame(() => {
            try { ScrollTrigger.refresh(); } catch {}
          });
        }
      } catch {
        // noop
      }
    })();

    // Cleanup al salir o volver a cambiar
    return () => {
      for (const off of cleanups) {
        try { off(); } catch {}
      }
      (async () => {
        try {
          const stMod = await import("gsap/ScrollTrigger").catch(() => null);
          const ScrollTrigger: MinimalScrollTrigger | null =
            ((stMod as unknown as { ScrollTrigger?: MinimalScrollTrigger; default?: MinimalScrollTrigger })?.ScrollTrigger) ??
            ((stMod as unknown as { ScrollTrigger?: MinimalScrollTrigger; default?: MinimalScrollTrigger })?.default) ??
            null;
          if (ScrollTrigger) {
            ScrollTrigger.getAll().forEach((t) => t.kill());
          }
        } catch {
          // noop
        }
      })();
    };
  }, [locale, pathname]);

  return null;
}