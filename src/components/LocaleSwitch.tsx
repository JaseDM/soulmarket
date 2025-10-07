// src/components/LocaleSwitch.tsx
'use client'

import {useLocale, useTranslations} from 'next-intl'
import {usePathname, useRouter} from '@/i18n/navigation'
import {useState} from 'react'
import {LanguageIcon} from '@heroicons/react/24/outline'

export default function LocaleSwitch() {
  const t = useTranslations('Header')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const changeLocale = (lng: string) => {
    router.replace(pathname, {locale: lng})
    setOpen(false)
  }

  return (
    <div className="relative">
      {/* Botón principal con ícono */}
      <button
        type="button"
        aria-label={t('changeLanguage', {default: 'Change language'})}
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center size-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <LanguageIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black/5 z-50">
          <li>
            <button
              onClick={() => changeLocale('es')}
              className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
                locale === 'es' ? 'font-medium text-blue-600 dark:text-blue-400' : ''
              }`}
            >
              Español
            </button>
          </li>
          <li>
            <button
              onClick={() => changeLocale('en')}
              className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
                locale === 'en' ? 'font-medium text-blue-600 dark:text-blue-400' : ''
              }`}
            >
              English
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}