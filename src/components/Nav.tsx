'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Route } from 'next'  // 👈 importa Route

const links: { href: Route; label: string }[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact Us' },
]

export default function Nav() {
  const pathname = usePathname()
  const isActive = (href: Route) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-2">
        <span className="font-semibold mr-4">SoulMarket</span>
        <div className="flex gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={[
                'px-3 py-2 rounded-md text-sm font-medium transition',
                isActive(l.href) ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'
              ].join(' ')}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}