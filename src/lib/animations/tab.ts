// src/lib/animations/tab.ts
import {gsap} from 'gsap'

type Cleanup = () => void
type Btn = HTMLButtonElement
type TabContent = HTMLElement

type Config = {
  animation: {
    duration: number
    delay: number
    ease: string
    y: number
  }
  mobile: {
    activeBg: string
    activeColor: string
    activeBorder: string
    scale: number
  }
}

const config: Config = {
  animation: {
    duration: 0.3,
    delay: 0.05,
    ease: 'power2.out',
    y: 20
  },
  mobile: {
    activeBg: '#864ffe',
    activeColor: 'white',
    activeBorder: '#5a19be',
    scale: 1.05
  }
}

export function initTabs(): Cleanup {
  if (typeof window === 'undefined') return () => {}

  // Cache
  const tabBarBtns = document.querySelectorAll<Btn>('.tab-bar button')
  const tabContent = document.querySelectorAll<TabContent>('.tab-content')
  const activeTabBar = document.querySelector<HTMLElement>('.active-tab-bar')
  const mobileTabBtns = document.querySelectorAll<Btn>('.tab-mobile button')

  const hasButtons = tabBarBtns.length > 0 || mobileTabBtns.length > 0
  const hasContent = tabContent.length > 0
  if (!hasButtons || !hasContent) return () => {}

  let currentIndex = 0
  const listeners: Cleanup[] = []

  // Helpers
  function updateButtonStates(buttons: NodeListOf<Btn>, activeIndex: number) {
    buttons.forEach((btn, i) => {
      const isActive = i === activeIndex
      btn.setAttribute('data-state', isActive ? 'selected' : '')
      btn.setAttribute('aria-selected', String(isActive))
      btn.setAttribute('tabindex', isActive ? '0' : '-1')
    })
  }

  function updateMobileButtonStates(buttons: NodeListOf<Btn>, activeIndex: number) {
    const {mobile} = config
    buttons.forEach((btn, i) => {
      const isActive = i === activeIndex
      btn.classList.toggle('mobile-tab-active', isActive)
      Object.assign(btn.style, isActive
        ? {
            backgroundColor: mobile.activeBg,
            color: mobile.activeColor,
            borderColor: mobile.activeBorder,
            transform: `scale(${mobile.scale})`
          }
        : {backgroundColor: '', color: '', borderColor: '', transform: ''})
      btn.setAttribute('aria-selected', String(isActive))
      btn.setAttribute('tabindex', isActive ? '0' : '-1')
    })
  }

  function updateActiveTabBar(activeButton: HTMLElement | null) {
    if (!activeTabBar || !activeButton) return
    const left = activeButton.offsetLeft - activeTabBar.offsetLeft
    const width = activeButton.offsetWidth
    activeTabBar.style.setProperty('--_left', `${left}px`)
    activeTabBar.style.setProperty('--_width', `${width}px`)
  }

  function switchTabContent(targetIndex: number, previousIndex: number) {
    const {animation} = config
    tabContent.forEach((content, i) => {
      if (i === targetIndex) {
        const displayType = content.getAttribute('data-display') || 'flex'
        content.style.display = displayType
        content.setAttribute('aria-hidden', 'false')

        if (previousIndex !== targetIndex) {
          gsap.fromTo(
            content,
            {opacity: 0, y: animation.y},
            {opacity: 1, y: 0, duration: animation.duration, delay: animation.delay, ease: animation.ease}
          )
        }
      } else {
        content.style.display = 'none'
        content.setAttribute('aria-hidden', 'true')
      }
    })
  }

  function switchToTab(targetIndex: number) {
    if (targetIndex < 0 || targetIndex >= tabContent.length) return
    const prev = currentIndex
    currentIndex = targetIndex
    if (tabBarBtns.length > 0) {
      updateButtonStates(tabBarBtns, targetIndex)
      updateActiveTabBar(tabBarBtns[targetIndex])
    }
    switchTabContent(targetIndex, prev)
  }

  function switchToMobileTab(targetIndex: number) {
    if (targetIndex < 0 || targetIndex >= tabContent.length) return
    const prev = currentIndex
    currentIndex = targetIndex
    if (mobileTabBtns.length > 0) {
      updateMobileButtonStates(mobileTabBtns, targetIndex)
    }
    switchTabContent(targetIndex, prev)
  }

  // Listeners Desktop
  if (tabBarBtns.length > 0) {
    // a11y
    tabBarBtns.forEach((btn, idx) => {
      btn.setAttribute('role', 'tab')
      btn.setAttribute('aria-controls', `tab-${idx}`)
      btn.id = `tab-${idx}`

      const onClick = (e: Event) => { e.preventDefault(); switchToTab(idx) }
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchToTab(idx) }
      }
      btn.addEventListener('click', onClick)
      btn.addEventListener('keydown', onKey)
      listeners.push(() => {
        btn.removeEventListener('click', onClick)
        btn.removeEventListener('keydown', onKey)
      })
    })

    // Estado inicial desktop
    updateButtonStates(tabBarBtns, 0)
    updateActiveTabBar(tabBarBtns[0])
    switchTabContent(0, -1)
  }

  // Listeners Mobile
  if (mobileTabBtns.length > 0) {
    mobileTabBtns.forEach((btn, idx) => {
      btn.setAttribute('role', 'tab')
      btn.setAttribute('aria-controls', `mobile-tab-${idx}`)
      btn.id = `mobile-tab-${idx}`

      const onClick = (e: Event) => { e.preventDefault(); switchToMobileTab(idx) }
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchToMobileTab(idx) }
      }
      btn.addEventListener('click', onClick)
      btn.addEventListener('keydown', onKey)
      listeners.push(() => {
        btn.removeEventListener('click', onClick)
        btn.removeEventListener('keydown', onKey)
      })
    })

    // Estado inicial mobile (si no hay desktop)
    if (tabBarBtns.length === 0) {
      updateMobileButtonStates(mobileTabBtns, 0)
      switchTabContent(0, -1)
    }
  }

  // Resize: reposiciona barra activa
  if (activeTabBar && tabBarBtns.length > 0) {
    const onResize = () => {
      const btn = tabBarBtns[currentIndex]
      if (btn) updateActiveTabBar(btn)
    }
    window.addEventListener('resize', onResize)
    listeners.push(() => window.removeEventListener('resize', onResize))
  }

  // Cleanup
  return () => {
    listeners.forEach((off) => { try { off() } catch {} })
  }
}