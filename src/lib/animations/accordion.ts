// src/lib/animations/accordion.ts
// Requiere: npm i gsap
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Cleanup = () => void

export function initAccordionAnimation(): Cleanup {
  if (typeof window === 'undefined') return () => {}

  const accordion = document.querySelector<HTMLElement>('.accordion')
  const items = Array.from(document.querySelectorAll<HTMLElement>('.accordion-item'))
  if (!accordion || items.length === 0) return () => {}

  let activeItem: HTMLElement | null = null
  const removeFns: Array<() => void> = []
  const triggers: ScrollTrigger[] = []

  // Helpers
  const setOpenState = (item: HTMLElement) => {
    const plusIconSpans = item.querySelectorAll<HTMLElement>('.accordion-plus-icon span')
    const accordionArrow = item.querySelector<SVGElement>('.accordion-arrow svg')

    if (plusIconSpans[1]) {
      plusIconSpans[1].style.transform = 'rotate(90deg)'
    }
    if (accordionArrow) {
      accordionArrow.style.transform = 'rotate(180deg)'
    }
  }

  const openAccordion = (item: HTMLElement) => {
    const content = item.querySelector<HTMLElement>('.accordion-content')
    const plusIconSpans = item.querySelectorAll<HTMLElement>('.accordion-plus-icon span')
    const accordionArrow = item.querySelector<SVGElement>('.accordion-arrow svg')
    if (!content) return

    content.classList.remove('hidden')
    content.style.height = 'auto'
    const contentHeight = content.scrollHeight
    content.style.height = '0px'

    gsap.to(content, {height: contentHeight, opacity: 1, duration: 0.3})

    if (plusIconSpans[1]) {
      gsap.to(plusIconSpans[1], {rotation: 90, duration: 0.3, ease: 'power2.out'})
    }
    if (accordionArrow) {
      gsap.to(accordionArrow, {rotation: -180, duration: 0.3, ease: 'power2.out'})
    }
  }

  const closeAccordion = (item: HTMLElement) => {
    const content = item.querySelector<HTMLElement>('.accordion-content')
    const plusIconSpans = item.querySelectorAll<HTMLElement>('.accordion-plus-icon span')
    const accordionArrow = item.querySelector<SVGElement>('.accordion-arrow svg')
    if (!content) return

    content.style.height = 'auto'
    const contentHeight = content.scrollHeight
    content.style.height = `${contentHeight}px`

    gsap.to(content, {
      height: 0,
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        content.classList.add('hidden')
        content.style.height = '0px'
      }
    })

    if (plusIconSpans[1]) {
      gsap.to(plusIconSpans[1], {rotation: 0, duration: 0.5, ease: 'power2.out'})
    }
    if (accordionArrow) {
      gsap.to(accordionArrow, {rotation: 0, duration: 0.5, ease: 'power2.out'})
    }
  }

  // Setup inicial por item
  items.forEach((item, index) => {
    const action = item.querySelector<HTMLElement>('.accordion-action')
    const content = item.querySelector<HTMLElement>('.accordion-content')
    if (!action || !content) return

    // Estado inicial visible/oculto
    if (item.classList.contains('active-accordion')) {
      content.classList.remove('hidden')
      content.style.height = 'auto'
      activeItem = item
      setOpenState(item)
    } else {
      content.classList.add('hidden')
      content.style.height = '0px'
    }

    // Click handler
    const onClick = (e: MouseEvent) => {
      e.preventDefault()
      if (activeItem && activeItem !== item) {
        closeAccordion(activeItem)
      }
      if (activeItem === item) {
        closeAccordion(item)
        activeItem = null
      } else {
        openAccordion(item)
        activeItem = item
      }
    }
    action.addEventListener('click', onClick)
    removeFns.push(() => action.removeEventListener('click', onClick))

    // Animación de entrada al hacer scroll
    gsap.set(item, {opacity: 0, y: 50, filter: 'blur(20px)', overflow: 'hidden'})
    const tween = gsap.fromTo(
      item,
      {opacity: 0, y: 50, filter: 'blur(20px)'},
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.5,
        delay: index * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          end: 'top 50%',
          scrub: false,
          once: true
        }
      }
    )
    const st = (tween.vars.scrollTrigger as ScrollTrigger | undefined)
    if (st) triggers.push(st)
  })

  // Cleanup
  return () => {
    removeFns.forEach((off) => {
      try { off() } catch {}
    })
    triggers.forEach((t) => {
      try { t.kill() } catch {}
    })
  }
}