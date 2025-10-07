// src/lib/index.ts
type Cleanup = () => void;

export async function initCommon(): Promise<Cleanup> {
  const cleanups: Cleanup[] = [];

  // === COMMON ===
  try {
    const { initRevealElements } = await import('@/lib/common/reveal-elements');
    cleanups.push(initRevealElements());
  } catch (e) {
    console.warn('[common] reveal-elements not loaded:', e);
  }

  try {
    const { initSmoothScrolling } = await import('@/lib/common/smooth-scrolling');
    cleanups.push(initSmoothScrolling());
  } catch (e) {
    console.warn('[common] smooth-scrolling not loaded:', e);
  }

  try {
    const { initPriceSwitcher } = await import('@/lib/common/price-switcher');
    cleanups.push(initPriceSwitcher());
  } catch (e) {
    console.warn('[common] price-switcher not loaded:', e);
  }

  try {
    const { initProgress } = await import('@/lib/common/progress');
    cleanups.push(initProgress());
  } catch (e) {
    console.warn('[common] progress not loaded:', e);
  }

  try {
    const { initParallaxEffects } = await import('@/lib/common/parallax-effects');
    cleanups.push(initParallaxEffects());
  } catch (e) {
    console.warn('[common] parallax-effects not loaded:', e);
  }

  // === ANIMATIONS ===
  try {
    const { initGradientPathAnimation } = await import('@/lib/animations/gradient-path');
    cleanups.push(initGradientPathAnimation());
  } catch (e) {
    console.warn('[animations] gradient-path not loaded:', e);
  }

  try {
    const { initAccordionAnimation } = await import('@/lib/animations/accordion');
    cleanups.push(initAccordionAnimation());
  } catch (e) {
    console.warn('[animations] accordion not loaded:', e);
  }

  try {
    const { initMarqueeAnimations } = await import('@/lib/animations/marquee');
    cleanups.push(initMarqueeAnimations());
  } catch (e) {
    console.warn('[animations] marquee not loaded:', e);
  }

  try {
    const { initSidebarAnimation } = await import('@/lib/animations/sidebar');
    cleanups.push(initSidebarAnimation());
  } catch (e) {
    console.warn('[animations] sidebar not loaded:', e);
  }
  try {
    const {initSlider} = await import('@/lib/animations/slider')
    cleanups.push(initSlider()) // devuelve siempre un Cleanup
  } catch (e) {
    console.warn('[animations] slider not loaded:', e)
  }

  try {
    const {initSvgDraw} = await import('@/lib/animations/svg-draw')
    cleanups.push(initSvgDraw()) // ahora devuelve un Cleanup válido
  } catch (e) {
    console.warn('[animations] svg-draw not loaded:', e)
  }

  try {
    const { initSwiper } = await import('@/lib/animations/swiper');
    cleanups.push(initSwiper());
  } catch (e) {
    console.warn('[animations] swiper not loaded:', e);
  }

  try {
    const { initTabFilter } = await import('@/lib/animations/tab-filter');
    cleanups.push(initTabFilter());
  } catch (e) {
    console.warn('[animations] tab-filter not loaded:', e);
  }

  try {
    const {initTabs} = await import('@/lib/animations/tab')
    cleanups.push(initTabs())
  } catch (e) {
    console.warn('[animations] tabs not loaded:', e)
  }

  try {
    const { initModalAnimation } = await import('@/lib/animations/modal');

    type Destroyable = { destroy: () => void };
    const isCleanup = (v: unknown): v is Cleanup => typeof v === 'function';
    const isDestroyable = (v: unknown): v is Destroyable =>
      typeof v === 'object' &&
      v !== null &&
      'destroy' in v &&
      typeof (v as { destroy?: unknown }).destroy === 'function';

    const out: unknown = initModalAnimation();

    if (isCleanup(out)) {
      cleanups.push(out);
    } else if (isDestroyable(out)) {
      cleanups.push(() => out.destroy());
    } else {
      // no cleanup disponible
    }
  } catch (e) {
    console.warn('[animations] modal not loaded:', e);
  }

  // === CLEANUP ===
  return () => {
    for (const off of cleanups) {
      try {
        off();
      } catch {}
    }
  };
}