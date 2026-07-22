import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { useAuthStore } from '../../store/useAuthStore'

function splitName(fullName = '') {
  const [firstName, ...rest] = fullName.trim().split(' ')
  return { firstName: firstName || '', lastName: rest.join(' ') }
}

export default function ProfileForm() {
  const { t } = useTranslation()
  const user = useAuthStore((s) => s.user)

  const [form, setForm] = useState({
    ...splitName(user?.name),
    email: user?.email || '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    setForm((f) => ({ ...f, ...splitName(user?.name), email: user?.email || '' }))
  }, [user])

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: persist via Supabase profile update
  }

  return (
    <div className="border border-line rounded-sm p-8 max-w-3xl">
      <h2 className="text-primary font-medium mb-6">{t('account.editProfile')}</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Input label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
          <Input label={t('account.lastName')} name="lastName" value={form.lastName} onChange={handleChange} />
          <Input label={t('account.email')} name="email" value={form.email} onChange={handleChange} />
          <Input label={t('account.address')} name="address" value={form.address} onChange={handleChange} placeholder="Add your address" />
        </div>

        <div>
          <p className="text-sm text-ink mb-4">{t('account.passwordChanges')}</p>
          <div className="flex flex-col gap-4">
            <Input
              type="password"
              name="currentPassword"
              placeholder={t('account.currentPassword')}
              value={form.currentPassword}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="newPassword"
              placeholder={t('account.newPassword')}
              value={form.newPassword}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder={t('account.confirmNewPassword')}
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-6">
          <Button type="button" variant="text">{t('account.cancel')}</Button>
          <Button type="submit" variant="primary">{t('account.saveChanges')}</Button>
        </div>
      </form>
    </div>
  )
}
