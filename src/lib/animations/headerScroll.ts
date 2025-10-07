

function attachHeaderOne(): () => void {
  const bar = document.querySelector<HTMLElement>('.js-header-bar')
  if (!bar) return () => {}

  const onScroll = () => {
    if (window.scrollY > 100) {
      bar.classList.add('is-scrolled')    // ✅ aplicamos el estado scrolleado
    } else {
      bar.classList.remove('is-scrolled')
    }
  }

  onScroll() // estado correcto al cargar
  window.addEventListener('scroll', onScroll, {passive: true})
  return () => window.removeEventListener('scroll', onScroll)
}

function attachHeaderTwo(): () => void {
  const header = document.querySelector<HTMLElement>('.header-two')
  const headerBtn = document.querySelector<HTMLElement>('.header-btn')
  if (!header || !headerBtn) return () => {}

  const onScroll = () => {
    if (window.scrollY > 150) {
      header.style.transition = 'all 0.5s ease-in-out'
      header.classList.add('header-two-scroll')
      headerBtn.classList.remove('btn-secondary')
      headerBtn.classList.add('btn-white')
    } else {
      header.classList.remove('header-two-scroll')
      headerBtn.classList.remove('btn-white')
      headerBtn.classList.add('btn-secondary')
    }
  }

  onScroll()
  window.addEventListener('scroll', onScroll, {passive: true})
  return () => window.removeEventListener('scroll', onScroll)
}

function attachHeaderThree(): () => void {
  const header = document.querySelector<HTMLElement>('.header-three')
  if (!header) return () => {}

  const onScroll = () => {
    if (window.scrollY > 100) {
      header.style.transition = 'all 0.5s ease-in-out'
      header.classList.add('header-three-scroll')
    } else {
      header.classList.remove('header-three-scroll')
    }
  }

  onScroll()
  window.addEventListener('scroll', onScroll, {passive: true})
  return () => window.removeEventListener('scroll', onScroll)
}

function attachHeaderFour(): () => void {
  const header = document.querySelector<HTMLElement>('.header-four')
  if (!header) return () => {}

  const onScroll = () => {
    if (window.scrollY > 100) {
      header.style.transition = 'all 0.5s ease-in-out'
      header.classList.add('header-four-scroll')
    } else {
      header.classList.remove('header-four-scroll')
    }
  }

  onScroll()
  window.addEventListener('scroll', onScroll, {passive: true})
  return () => window.removeEventListener('scroll', onScroll)
}

function attachHeaderFive(): () => void {
  const header = document.querySelector<HTMLElement>('.header-five')
  if (!header) return () => {}

  const onScroll = () => {
    if (window.scrollY > 25) {
      header.style.transition = 'all 0.5s ease-in-out'
      header.classList.add('header-five-scroll')
    } else {
      header.classList.remove('header-five-scroll')
    }
  }

  onScroll()
  window.addEventListener('scroll', onScroll, {passive: true})
  return () => window.removeEventListener('scroll', onScroll)
}

function attachHeaderSix(): () => void {
  const header = document.querySelector<HTMLElement>('.header-six')
  if (!header) return () => {}

  const onScroll = () => {
    if (window.scrollY > 100) {
      header.style.transition = 'all 0.5s ease-in-out'
      header.classList.add('header-six-scroll')
    } else {
      header.classList.remove('header-six-scroll')
    }
  }

  onScroll()
  window.addEventListener('scroll', onScroll, {passive: true})
  return () => window.removeEventListener('scroll', onScroll)
}

/** Inicializa todos los headers que existan en el DOM y devuelve un cleanup único */
export function initHeaderAnimations(): () => void {
  const cleanups: Array<() => void> = []
  cleanups.push(attachHeaderOne())
  cleanups.push(attachHeaderTwo())
  cleanups.push(attachHeaderThree())
  cleanups.push(attachHeaderFour())
  cleanups.push(attachHeaderFive())
  cleanups.push(attachHeaderSix())

  return () => cleanups.forEach(fn => fn && fn())
}