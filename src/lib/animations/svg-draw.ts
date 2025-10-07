// src/lib/animations/svg-draw.ts
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

type Cleanup = () => void

export function initSvgDraw(): Cleanup {
  if (typeof window === 'undefined') return () => {}

  gsap.registerPlugin(ScrollTrigger)

  const selectors = ['#svg-one', '#svg-two', '#svg-three']
  const targets = selectors.join(', ')

  gsap.set(targets, {visibility: 'visible'})

  selectors.forEach((selector) => {
    gsap.timeline({
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%'
      }
    }).from(selector, {
      duration: 1,
      drawSVG: 1,
      delay: 0.5,
      ease: 'power2.out'
    })
  })

  // 🔑 Cleanup → eliminar todos los ScrollTriggers creados
  return () => {
    ScrollTrigger.getAll().forEach((st) => st.kill())
  }
}