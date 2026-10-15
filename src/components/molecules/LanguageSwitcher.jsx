import { useTranslation } from 'react-i18next'
import { FiChevronDown } from 'react-icons/fi'
import { LANGUAGES } from '../../lib/i18n'

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage || i18n.language

  const handleChange = (e) => {
    const code = e.target.value
    i18n.changeLanguage(code)
    try {
      localStorage.setItem('lang', code)
    } catch {
      // storage unavailable: language still changes for this session
    }
  }

  return (
    <div className="relative flex items-center">
      <select
        data-testid="lang-switch"
        aria-label={t('common.language')}
        value={current}
        onChange={handleChange}
        className="appearance-none bg-transparent text-xs text-white pr-4 cursor-pointer outline-none focus-visible:underline"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code} className="text-black">
            {l.label}
          </option>
        ))}
      </select>
      <FiChevronDown size={12} className="pointer-events-none absolute right-0 text-white" />
    </div>
  )
}
