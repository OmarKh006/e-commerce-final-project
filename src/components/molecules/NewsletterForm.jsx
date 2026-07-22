import { useState } from 'react'
import { FiSend } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

export default function NewsletterForm({ onSubmit }) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(email)
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('footer.emailPlaceholder')}
        className="w-full bg-transparent border border-white/40 text-white text-sm rounded-sm pl-4 pr-10 py-2.5 outline-none placeholder:text-white/60"
      />
      <button type="submit" aria-label="Subscribe" className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer">
        <FiSend size={16} />
      </button>
    </form>
  )
}
