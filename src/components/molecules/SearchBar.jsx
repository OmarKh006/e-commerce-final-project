import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function SearchBar({ className = '' }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const urlQuery = location.pathname === '/search' ? params.get('q') ?? '' : ''
  const [query, setQuery] = useState(urlQuery)

  useEffect(() => {
    setQuery(urlQuery)
  }, [urlQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }

  return (
    <form onSubmit={handleSubmit} role="search" className={`relative ${className}`}>
      <input
        type="text"
        data-testid="search-input"
        aria-label={t('nav.searchLabel')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('nav.searchPlaceholder')}
        className="w-full bg-secondary-gray text-sm rounded-sm pl-4 pr-10 py-2 outline-none placeholder:text-body focus-visible:ring-1 focus-visible:ring-ink"
      />
      <button
        type="submit"
        aria-label={t('nav.search')}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-ink cursor-pointer"
      >
        <FiSearch size={16} />
      </button>
    </form>
  )
}
