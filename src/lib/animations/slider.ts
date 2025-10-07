// src/lib/animations/slider.ts
import {gsap} from 'gsap'

export type Cleanup = () => void

export type Testimonial = {
  name: string
  position: string
  image: string
  quote: string
}

type SliderOptions = {
  intervalMs?: number
  avatarsSelector?: string                 // contenedor de 5 <img>
  quoteSelector?: string                   // h3 dentro del contenedor de quote
  nameSelector?: string                    // h4 dentro del contenedor de info
  positionSelector?: string                // p dentro del contenedor de info
  testimonials?: Testimonial[]             // si no pasas, usa los de abajo
}

/** Datos por defecto (modifícalos o pásalos por opciones) */
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Jessica Lee',
    position: 'Head of Customer Success',
    image: '/images/avatar/avatar-9.png',
    quote:
      "The investment insights are clear, easy to understand and follow. I love the automation and feel like I'm making real progress every day."
  },
  {
    name: 'Mark Thompson',
    position: 'Marketing Director',
    image: '/images/avatar/avatar-10.png',
    quote:
      "This platform helps our team move faster, stay aligned, and reduce errors. It's a powerful tool that boosts productivity all around."
  },
  {
    name: 'Amina Yusuf',
    position: 'Product Manager',
    image: '/images/avatar/avatar-11.png',
    quote:
      'Our planning is finally clear and consistent. I feel more confident in how my team executes tasks and reaches project goals on time.'
  },
  {
    name: 'Leo Chen',
    position: 'Founder, ScaleX',
    image: '/images/avatar/avatar-13.png',
    quote:
      'The design is clean and the interface is effortless to use. It saves time, improves clarity, and just makes everything run smoother.'
  },
  {
    name: 'John Doe',
    position: 'CEO',
    image: '/images/avatar/avatar-14.png',
    quote:
      "A great platform for managing projects with clarity and speed. It's intuitive, efficient, and keeps everyone on the same page easily."
  }
] as const

/**
 * Inicializa el slider de testimonios (GSAP).
 * Requiere en el DOM:
 *  - 5 <img class="testimonial-avatar">
 *  - #testimonial-quote > h3
 *  - #testimonial-info > h4, p
 */
export function initSlider(opts: SliderOptions = {}): Cleanup {
  if (typeof window === 'undefined') return () => {}

  const {
    intervalMs = 3000,
    avatarsSelector = '.testimonial-avatar',
    quoteSelector = '#testimonial-quote h3',
    nameSelector = '#testimonial-info h4',
    positionSelector = '#testimonial-info p',
    testimonials = DEFAULT_TESTIMONIALS.slice()
  } = opts

  // si no hay datos => no iniciamos
  if (!Array.isArray(testimonials) || testimonials.length === 0) {
    // console.warn('[slider] no testimonials provided')
    return () => {}
  }

  let currentIndex = 0

  const avatarImgs = Array.from(
    document.querySelectorAll<HTMLImageElement>(avatarsSelector)
  )
  const quoteEl = document.querySelector<HTMLElement>(quoteSelector)!
  const nameEl = document.querySelector<HTMLElement>(nameSelector)!
  const positionEl = document.querySelector<HTMLElement>(positionSelector)!

  // Guard clauses: estructura mínima
  if (avatarImgs.length < 5 || !quoteEl || !nameEl || !positionEl) {
    // console.warn('[slider] missing DOM structure')
    return () => {}
  }

  function updateAvatarImages() {
    // necesitamos exactamente 5 avatares
    const visible = avatarImgs.slice(0, 5)
    for (let i = 0; i < visible.length; i++) {
      const avatarIndex = (currentIndex + i - 2 + testimonials.length) % testimonials.length
      const t = testimonials[avatarIndex]
      const imgEl = visible[i]
      if (!imgEl || !t) continue 

      imgEl.src = t.image
      imgEl.alt = `${t.name}'s avatar`

      gsap.fromTo(
        imgEl as HTMLElement,
        {opacity: 1, scale: 1.1},
        {opacity: 1, scale: 1, duration: 0.4, delay: i * 0.05, ease: 'power2.out'}
      )
    }
  }

  function updateTextContent() {
    const t = testimonials[currentIndex]
    
    if (!t) return // 👈 evita el error
    gsap.to(quoteEl as HTMLElement, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      onComplete: () => {
        quoteEl.textContent = `"${t.quote}"`
        gsap.to(quoteEl as HTMLElement, {opacity: 1, y: 0, duration: 0.3, ease: 'power2.out'})
      }
    })

    gsap.to(nameEl as HTMLElement, {
      opacity: 0,
      y: 5,
      duration: 0.2,
      onComplete: () => {
        nameEl.textContent = t.name
        gsap.to(nameEl as HTMLElement, {opacity: 1, y: 0, duration: 0.3, ease: 'power2.out'})
      }
    })

    gsap.to(positionEl as HTMLElement, {
      opacity: 0,
      y: 5,
      duration: 0.2,
      onComplete: () => {
        positionEl.textContent = t.position
        gsap.to(positionEl as HTMLElement, {opacity: 1, y: 0, duration: 0.3, ease: 'power2.out'})
      }
    })
  }

  function updateTestimonial() {
    updateAvatarImages()
    updateTextContent()
  }

  // Primera carga
  updateTestimonial()

  // Autoplay
  const id = window.setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length
    updateTestimonial()
  }, intervalMs)

  // Cleanup
  return () => {
    window.clearInterval(id)
  }
}