// src/lib/animations/gradient-path.ts
// Requiere: npm i gsap
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(MotionPathPlugin)

type Cleanup = () => void

// Tipado global para exponer controles sin usar `any`
declare global {
  interface Window {
    gradientAnimation?: {
      pause: () => void
      resume: () => void
      restart: () => void
      isActive: () => boolean
    }
  }
}

/**
 * Anima rectángulos siguiendo paths SVG con un gradiente progresivo,
 * orquestados por un único timeline de GSAP.
 *
 * IDs esperados en el DOM:
 *  - curve-path-1 ... curve-path-8  (SVGPathElement)
 *  - rect-1-1 ... rect-1-60, rect-2-1 ... rect-8-60 (SVGRectElement)
 */
export function initGradientPathAnimation(): Cleanup {
  if (typeof window === 'undefined') return () => {}

  // --- Utilidad para interpolar colores hex (#RRGGBB) ---
  const interpolateColor = (c1: string, c2: string, f: number): string => {
    const r1 = parseInt(c1.slice(1, 3), 16)
    const g1 = parseInt(c1.slice(3, 5), 16)
    const b1 = parseInt(c1.slice(5, 7), 16)
    const r2 = parseInt(c2.slice(1, 3), 16)
    const g2 = parseInt(c2.slice(3, 5), 16)
    const b2 = parseInt(c2.slice(5, 7), 16)
    const r = Math.round(r1 + (r2 - r1) * f)
    const g = Math.round(g1 + (g2 - g1) * f)
    const b = Math.round(b1 + (b2 - b1) * f)
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b
      .toString(16)
      .padStart(2, '0')}`
  }

  // Paths a animar
  const paths = [
    'curve-path-1',
    'curve-path-2',
    'curve-path-3',
    'curve-path-4',
    'curve-path-5',
    'curve-path-6',
    'curve-path-7',
    'curve-path-8'
  ] as const

  // Timeline maestro: controla todo el conjunto
  const tl = gsap.timeline({
    defaults: { ease: 'power1.inOut' }
    // Nota: NO repetimos el timeline en sí; dejamos que cada tween repita infinito
    // para que el control play/pause/restart del timeline afecte a todos.
  })

  paths.forEach((pathId, index) => {
    const path = document.getElementById(pathId) as SVGPathElement | null
    if (!path) return

    // Colores extremos por path (alternando como en tu implementación original)
    const from = index % 2 === 0 ? '#83E7EE' : '#F9EB57'
    const to = index % 2 === 0 ? '#F9EB57' : '#83E7EE'

    // Un poco de variación por path
    const baseDuration = gsap.utils.random(3, 6)
    const baseDelay = gsap.utils.random(0, 2)

    // 60 rectángulos por path
    for (let i = 1; i <= 60; i++) {
      const rect = document.getElementById(`rect-${index + 1}-${i}`) as SVGRectElement | null
      if (!rect) continue

      // Gradiente estático progresivo en la "fila" de rectángulos
      const factor = (i - 1) / 59
      rect.setAttribute('fill', interpolateColor(from, to, factor))

      // Cada rectángulo sigue el path, con leve offset de delay
      const tween = gsap.to(rect, {
        motionPath: {
          path,              // puede ser Element o string selector
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: false
        },
        duration: baseDuration,
        repeat: -1,          // ciclo infinito (cada rect por su cuenta)
        delay: baseDelay + i * 0.002
      })

      // Añadimos el tween al timeline en el tiempo 0 para que el TL lo controle todo
      tl.add(tween, 0)
    }
  })

  // Arrancamos (por si acaso)
  tl.play(0)

  // Exponer controlador global (tipado)
  window.gradientAnimation = {
    pause: () => tl.pause(),
    resume: () => tl.resume(),
    restart: () => tl.restart(true),
    isActive: () => tl.isActive()
  }

  // Cleanup
  return () => {
    try {
      tl.kill()
    } catch {
      // noop
    }
    window.gradientAnimation = undefined
  }
}