import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Input from '../atoms/Input'
import Textarea from '../atoms/Textarea'
import Button from '../atoms/Button'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMPTY = { name: '', email: '', phone: '', message: '' }

export default function ContactForm() {
  const { t } = useTranslation()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setSent(false)
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = {}
    if (!form.name.trim()) found.name = t('contact.formName')
    if (!EMAIL_RE.test(form.email.trim())) found.email = t('contact.formEmail')
    if (!form.phone.trim()) found.phone = t('contact.formPhone')
    if (!form.message.trim()) found.message = t('contact.formMessage')
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // Demo: there is no mail backend, so nothing is actually delivered.
    setSent(true)
    setForm(EMPTY)
  }

  return (
    <div className="border border-line rounded-sm p-8">
      <form data-testid="contact-form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Input name="name" aria-label={t('contact.yourName')} placeholder={`${t('contact.yourName')} *`} value={form.name} onChange={handleChange} error={errors.name} />
          <Input type="email" name="email" aria-label={t('contact.yourEmail')} placeholder={`${t('contact.yourEmail')} *`} value={form.email} onChange={handleChange} error={errors.email} />
          <Input type="tel" name="phone" aria-label={t('contact.yourPhone')} placeholder={`${t('contact.yourPhone')} *`} value={form.phone} onChange={handleChange} error={errors.phone} />
        </div>

        <Textarea
          name="message"
          aria-label={t('contact.yourMessage')}
          placeholder={t('contact.yourMessage')}
          rows={8}
          value={form.message}
          onChange={handleChange}
          error={errors.message}
        />

        {sent && <p role="status" className="text-xs text-success">{t('contact.sentDemo')}</p>}

        <div className="flex justify-end">
          <Button type="submit" variant="primary">{t('contact.sendMessage')}</Button>
        </div>
      </form>
    </div>
  )
}
