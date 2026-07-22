import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Input from '../atoms/Input'
import Textarea from '../atoms/Textarea'
import Button from '../atoms/Button'

export default function ContactForm() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="border border-line rounded-sm p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Input name="name" placeholder={`${t('contact.yourName')} *`} value={form.name} onChange={handleChange} required />
          <Input type="email" name="email" placeholder={`${t('contact.yourEmail')} *`} value={form.email} onChange={handleChange} required />
          <Input name="phone" placeholder={`${t('contact.yourPhone')} *`} value={form.phone} onChange={handleChange} required />
        </div>

        <Textarea
          name="message"
          placeholder={t('contact.yourMessage')}
          rows={8}
          value={form.message}
          onChange={handleChange}
        />

        {sent && <p className="text-xs text-success">Message sent — we'll get back to you within 24 hours.</p>}

        <div className="flex justify-end">
          <Button type="submit" variant="primary">{t('contact.sendMessage')}</Button>
        </div>
      </form>
    </div>
  )
}
