'use client'

import {useEffect, useRef, useState} from 'react'

type Tab = {
  label: string
  content: React.ReactNode
}

export default function Tabs({
  tabs,
  initial = 0
}: {
  tabs: Tab[]
  initial?: number
}) {
  const [active, setActive] = useState(initial)
  const barRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Subrayado animado (barra activa) en desktop
  useEffect(() => {
    const bar = barRef.current
    const list = listRef.current
    if (!bar || !list) return

    const btn = list.querySelectorAll<HTMLButtonElement>('button')[active]
    if (!btn) return

    const rect = btn.getBoundingClientRect()
    const listRect = list.getBoundingClientRect()

    bar.style.width = `${rect.width}px`
    bar.style.transform = `translateX(${rect.left - listRect.left}px)`
  }, [active])

  return (
    <div>
      {/* TabBar mobile */}
      <div className="tab-mobile flex items-center justify-start flex-wrap lg:hidden gap-4 mb-14 lg:mb-[72px] sm:max-w-[500px] sm:mx-auto">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={[
              'px-3.5 py-2 min-w-16 cursor-pointer text-tagline-2 font-medium border rounded-full',
              active === i
                ? 'text-secondary dark:text-accent border-primary-500 dark:border-primary-400 bg-primary-50/50 dark:bg-background-7'
                : 'text-secondary/60 dark:text-accent/60 border-stroke-2 dark:border-stroke-7 dark:bg-background-7'
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TabBar desktop */}
      <div
        role="tablist"
        ref={listRef}
        className="tab-bar hidden lg:flex justify-center items-center border-b border-stroke-2 dark:border-stroke-6 mb-14 lg:mb-[72px] relative"
      >
        {/* barra bajo la pestaña activa */}
       {/* <div
          ref={barRef}
          className="active-tab-bar absolute bottom-0 left-0 h-[2px] w-0 bg-primary-500 transition-all duration-300"
        />*/}
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={[
              'py-3 cursor-pointer focus-visible:outline-0 px-10 -mb-px',
              active === i
                ? 'text-secondary dark:text-accent'
                : 'text-secondary/60 dark:text-accent/60'
            ].join(' ')}
          >
            <span className="text-tagline-1 font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Paneles */}
      <div>
        {tabs.map((tab, i) => (
          <div
            key={i}
            role="tabpanel"
            hidden={active !== i}
            className={active === i ? 'tab-content' : 'tab-content hidden'}
            data-display="flex"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}