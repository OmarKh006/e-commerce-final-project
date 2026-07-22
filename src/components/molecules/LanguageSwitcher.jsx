import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiChevronDown } from 'react-icons/fi'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const current = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0]

  const handleSelect = (code) => {
    i18n.changeLanguage(code)
    localStorage.setItem('lang', code)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-xs text-white cursor-pointer"
      >
        {current.label} <FiChevronDown size={12} />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-28 bg-white text-ink rounded-sm shadow-card-hover z-20 overflow-hidden">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSelect(l.code)}
              className="w-full text-left px-3 py-2 text-xs hover:bg-secondary-gray cursor-pointer"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
