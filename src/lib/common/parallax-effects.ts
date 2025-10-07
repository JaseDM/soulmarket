// src/lib/common/parallax-effect.ts
// Parallax por ratón, compatible con múltiples escenas y SSR-safe.

type Cleanup = () => void

type ElementConfig = {
  element: HTMLElement
  depth: number
  directionX: number
  directionY: number
  movementScale: number
}

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined'

/** Lee número de atributo con fallback y claves alternativas */
function numAttr(el: HTMLElement, keys: string[], fallback: number): number {
  for (const key of keys) {
    const raw = el.getAttribute(key)
    if (raw != null) {
      const n = Number(raw)
      if (Number.isFinite(n)) return n
    }
  }
  return fallback
}

/** Inicializa parallax en todas las escenas encontradas */
export function initParallaxEffects(): Cleanup {
  if (!isBrowser()) return () => {}

  // Soporta 1) id="scene" (legacy) y 2) [data-parallax-scene] (múltiples)
  const scenes = new Set<HTMLElement>()
  const byId = document.getElementById('scene')
  if (byId) scenes.add(byId)
  document.querySelectorAll<HTMLElement>('[data-parallax-scene]').forEach((s) => scenes.add(s))

  if (scenes.size === 0) return () => {}

  // Guardamos todos los cleanups de cada escena
  const sceneCleanups: Cleanup[] = []

  scenes.forEach((scene) => {
    const off = initScene(scene)
    sceneCleanups.push(off)
  })

  return () => {
    for (const off of sceneCleanups) {
      try { off() } catch {}
    }
  }
}

function initScene(scene: HTMLElement): Cleanup {
  // === hooks/refs internos ===
  const listeners: Array<{target: EventTarget; type: string; fn: EventListenerOrEventListenerObject; opts?: AddEventListenerOptions | boolean}> = []
  const imageListeners: Array<{img: HTMLImageElement; load?: EventListener; error?: EventListener}> = []
  let rafId: number | null = null

  // 1) Congelar elementos (evita “saltos” al cargar)
  freezeParallaxElements(scene)

  // 2) Esperar a que cargue la ventana + imágenes y arrancar
  const startParallaxAfterLoad = () => {
    waitForImagesToLoad(scene, () => {
      // retardo suave para transición
      setTimeout(() => {
        unfreezeAndStartParallax(scene)
      }, 300)
    })
  }

  if (document.readyState === 'complete') {
    startParallaxAfterLoad()
  } else {
    addL(window, 'load', startParallaxAfterLoad, {once: true})
  }

  // === Helpers ===

  function addL(
    target: EventTarget,
    type: string,
    fn: EventListenerOrEventListenerObject,
    opts?: AddEventListenerOptions | boolean
  ) {
    if (opts !== undefined) {
      target.addEventListener(type, fn, opts)
    } else {
      target.addEventListener(type, fn)
    }
    listeners.push({ target, type, fn, opts })
  }

  function freezeParallaxElements(root: HTMLElement) {
    root.querySelectorAll<HTMLElement>('.parallax-effect').forEach((el) => {
      el.style.willChange = 'transform'
      el.style.transform = 'translate3d(0,0,0)'
      el.style.transition = 'none'
      el.classList.add('parallax-frozen')
    })
  }

  function unfreezeAndStartParallax(root: HTMLElement) {
    root.querySelectorAll<HTMLElement>('.parallax-effect').forEach((el) => {
      el.classList.remove('parallax-frozen')
      el.style.transition = 'transform 0.3s ease-out'
    })
    setupParallaxAnimation(root)
  }

  function waitForImagesToLoad(root: HTMLElement, onComplete: () => void) {
    const imgs = Array.from(root.querySelectorAll<HTMLImageElement>('.parallax-effect img'))
    if (imgs.length === 0) {
      onComplete()
      return
    }

    let loaded = 0
    const total = imgs.length
    const check = () => {
      loaded++
      if (loaded >= total) onComplete()
    }

    imgs.forEach((img) => {
      if (img.complete) {
        check()
      } else {
        const onLoad = () => { cleanupImg(img); check() }
        const onError = () => { cleanupImg(img); check() }
        img.addEventListener('load', onLoad)
        img.addEventListener('error', onError)
        imageListeners.push({img, load: onLoad, error: onError})
      }
    })
  }

  function setupParallaxAnimation(root: HTMLElement) {
    const parallaxEls = root.querySelectorAll<HTMLElement>('.parallax-effect')
    const configs = createElementConfigs(parallaxEls)

    let isAnimating = false
    let mouseX = root.offsetWidth / 2
    let mouseY = root.offsetHeight / 2

    // Inicial
    initializeElements(configs)
    updateParallaxPositions(configs, mouseX, mouseY, root)

    const throttledHandler: EventListener = (evt) => {
    const mouseEvt = evt as MouseEvent
    const rect = root.getBoundingClientRect()
    mouseX = mouseEvt.clientX - rect.left
    mouseY = mouseEvt.clientY - rect.top

    if (!isAnimating) {
      rafId = requestAnimationFrame(() => {
        updateParallaxPositions(configs, mouseX, mouseY, root)
        isAnimating = false
      })
      isAnimating = true
    }
  }

  addL(root, 'mousemove', createThrottledHandler(throttledHandler), {passive: true})

    // Optimización cuando sale el ratón
    addL(root, 'mouseleave', () => {
      // tras 1s quitamos willChange
      const id = window.setTimeout(() => {
        configs.forEach(({element}) => {
          element.style.willChange = 'auto'
        })
      }, 1000)
      // cancela si vuelve a entrar rápidamente
      addL(root, 'mouseenter', () => clearTimeout(id), {once: true})
    })
  }

  function cleanupImg(img: HTMLImageElement) {
    try { img.removeEventListener('load', (imageListeners.find(i => i.img === img)?.load as EventListener)!) } catch {}
    try { img.removeEventListener('error', (imageListeners.find(i => i.img === img)?.error as EventListener)!) } catch {}
  }

  function createElementConfigs(elements: NodeListOf<HTMLElement>): ElementConfig[] {
    return Array.from(elements).map((element) => ({
      element,
      depth: numAttr(element, ['data-parallax-value'], 1),
      // Algunos themes tenían el typo "data-data-parallax-x/y"; soportamos ambos
      directionX: numAttr(element, ['data-parallax-x', 'data-data-parallax-x'], 1),
      directionY: numAttr(element, ['data-parallax-y', 'data-data-parallax-y'], 1),
      movementScale: 25
    }))
  }

  function initializeElements(configs: ElementConfig[]) {
    configs.forEach(({element}) => {
      element.style.willChange = 'transform'
      element.style.transform = 'translateZ(0)'
    })
  }

  function updateParallaxPositions(configs: ElementConfig[], mouseX: number, mouseY: number, root: HTMLElement) {
    const centerX = root.offsetWidth / 2
    const centerY = root.offsetHeight / 2
    const relX = (mouseX - centerX) / centerX
    const relY = (mouseY - centerY) / centerY

    configs.forEach(({element, depth, directionX, directionY, movementScale}) => {
      if (element.classList.contains('parallax-frozen')) return
      const moveX = relX * depth * directionX * movementScale
      const moveY = relY * depth * directionY * movementScale
      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`
    })
  }

  function createThrottledHandler(handler: EventListener): EventListener {
  let timeoutId: number | null = null
  return (event) => {
    if (timeoutId) return
    timeoutId = window.setTimeout(() => {
      handler(event)
      timeoutId = null
    }, 16) // ~60fps
  }
}

  // === Cleanup por escena ===
  return () => {
    if (rafId != null) {
      cancelAnimationFrame(rafId)
      rafId = null
    }
    // listeners DOM
    listeners.forEach(({ target, type, fn, opts }) => {
      try {
        if (opts !== undefined) {
          target.removeEventListener(type, fn, opts)
        } else {
          target.removeEventListener(type, fn)
        }
      } catch {}
    })
    listeners.length = 0
    // listeners de imágenes
    imageListeners.forEach(({img, load, error}) => {
      try { if (load) img.removeEventListener('load', load) } catch {}
      try { if (error) img.removeEventListener('error', error) } catch {}
    })
    imageListeners.length = 0
  }
}