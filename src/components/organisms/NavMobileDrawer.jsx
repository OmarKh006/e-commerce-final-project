import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiX } from 'react-icons/fi'

export default function NavMobileDrawer({ open, onClose }) {
  const { t } = useTranslation()
  if (!open) return null

  const NAV_LINKS = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.contact'), to: '/contact' },
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.signup'), to: '/signup' },
  ]

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute top-0 left-0 h-full w-72 bg-white p-6">
        <button onClick={onClose} aria-label="Close menu" className="mb-6 cursor-pointer">
          <FiX size={22} />
        </button>
        <ul className="flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <li key={l.to}>
              <Link to={l.to} onClick={onClose} className="text-base text-ink">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
