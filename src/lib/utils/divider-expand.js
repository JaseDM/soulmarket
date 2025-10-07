import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// evita doble registro si otro módulo ya lo hizo
if (!gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)
}


export function dividerExpand(divider) {
  gsap.to(divider, {
    scrollTrigger: {
      trigger: divider,
      start: 'top 100%',
      end: 'top 50%',
      scrub: false,
      toggleActions: 'play none none none',
    },
    width: '100%',
    duration: 1,
    delay: 0.7,
    ease: 'power2.out',
  });
}
