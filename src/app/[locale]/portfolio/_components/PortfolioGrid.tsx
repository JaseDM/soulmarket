'use client'

import React, {useEffect, useState} from 'react'
import Image from 'next/image'

type Category = 'all' | 'web' | 'design' | 'media'

type PortfolioItem = {
  id: string
  title: string
  category: Exclude<Category, 'all'>
  image: string
  client?: string
  year?: string
  tags?: string[]
}

export type Labels = {
  all: string
  web: string
  design: string
  media: string
}

type Props = {
  labels: Labels
  initialCategory?: Category
}

const projects: PortfolioItem[] = [
  { id: '1', title: 'Caferio Website', category: 'web', image: '/images/portfolio/caferio.jpg', client: 'Caferio', year: '2024', tags: ['Next.js', 'Tailwind', 'UX/UI'] },
  { id: '2', title: 'Brand Identity Pack', category: 'design', image: '/images/portfolio/caferio.jpg', client: 'Visua', year: '2023', tags: ['Illustrator', 'Branding'] },
  { id: '3', title: 'Studio Reel', category: 'media', image: '/images/portfolio/caferio.jpg', client: 'Studio X', year: '2025', tags: ['Video', 'Editing', 'After Effects'] },
  { id: '4', title: 'E-commerce Launch', category: 'web', image: '/images/portfolio/caferio.jpg', client: 'TechStore', year: '2025', tags: ['React', 'Shopify', 'SEO'] },
  { id: '5', title: 'Product Campaign', category: 'media', image: '/images/portfolio/caferio.jpg', client: 'Nova Drinks', year: '2024', tags: ['Photography', 'Video'] },
  { id: '6', title: 'Creative Poster Set', category: 'design', image: '/images/portfolio/caferio.jpg', client: 'ArtSpace', year: '2023', tags: ['Figma', 'Print', 'Typography'] }
]

export default function PortfolioGrid({labels, initialCategory = 'all'}: Props) {
  const [filter, setFilter] = useState<Category>(initialCategory)

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  useEffect(() => {
    // Asegura que hay contenido visible al cargar
    setFilter(initialCategory)
    window.dispatchEvent(new Event('animations:refresh'))
  }, [initialCategory])

  return (
    <section className="mt-16 main-container">
      {/* Barra de filtros */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {(['all', 'web', 'design', 'media'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${
              filter === key
                ? 'bg-fuchsia-600 text-white border-fuchsia-600 shadow-md'
                : 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-800'
            }`}
          >
            {labels[key]}
          </button>
        ))}
      </div>

      {/* Grid de proyectos */}
      <div className="grid grid-cols-12 gap-6" data-ns-animate>
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="col-span-12 sm:col-span-6 lg:col-span-4"
            data-category={p.category}
          >
            <article className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="relative overflow-hidden">
                <Image
                    src={p.image}
                    alt={p.title}
                    width={800}
                    height={600}
                    className="h-auto w-full rounded-xl object-cover"
/>
                <span className="absolute top-4 left-4 bg-fuchsia-600 text-white text-xs px-3 py-1 rounded-full capitalize shadow-sm">
                  {labels[p.category] ?? p.category}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
                  {p.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  {p.client} · {p.year}
                </p>

                {p.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}