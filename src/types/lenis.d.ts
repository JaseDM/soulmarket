declare module 'lenis' {
  export type LenisOptions = {
    lerp?: number; duration?: number; smoothWheel?: boolean; smoothTouch?: boolean;
    wheelMultiplier?: number; touchMultiplier?: number; infinite?: boolean;
    syncTouch?: boolean; gestureOrientation?: 'vertical' | 'horizontal' | 'both';
    normalizeWheel?: boolean; wrapper?: HTMLElement | Window; content?: HTMLElement;
    orientation?: 'vertical' | 'horizontal';
  };
  export default class Lenis {
    constructor(options?: LenisOptions);
    raf(time: number): void;
    scrollTo(
      target: string | number | HTMLElement,
      opts?: {offset?: number; duration?: number; easing?: (t: number) => number}
    ): void;
    on(event: 'scroll', handler: () => void): void;
    off(event: 'scroll', handler: () => void): void;
    destroy(): void;
  }
}