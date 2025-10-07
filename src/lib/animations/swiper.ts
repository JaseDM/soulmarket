type Cleanup = () => void;

type SwiperOptions = Record<string, unknown>;

interface SwiperInstance {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
}

type SwiperTarget = string | Element | Element[];

type SwiperConstructor = new (target: SwiperTarget, options?: SwiperOptions) => SwiperInstance;

declare global {
  interface Window {
    Swiper?: SwiperConstructor;
  }
}

export function initSwiper(): Cleanup {
  // SSR guard + lib guard
  if (typeof window === 'undefined' || !window.Swiper) return () => {};

  const Swiper = window.Swiper;

  const reviewsSwiper = new Swiper('.reviews-swiper', { /* ...config igual... */ });
  const singleCardReviewsSwiper = new Swiper('.single-card-reviews-swiper', { /* ... */ });
  const reviewsFadeInSwiper = new Swiper('.reviews-fade-in-swiper', { /* ... */ });
  const blogArticleSwiper = new Swiper('.blog-article-swiper', { /* ... */ });

  return () => {
    reviewsSwiper.destroy?.(true, true);
    singleCardReviewsSwiper.destroy?.(true, true);
    reviewsFadeInSwiper.destroy?.(true, true);
    blogArticleSwiper.destroy?.(true, true);
  };
}