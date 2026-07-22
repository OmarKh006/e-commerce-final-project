import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FcGoogle } from 'react-icons/fc'
import AuthFormPanel from '../components/organisms/AuthFormPanel'
import Input from '../components/atoms/Input'
import Button from '../components/atoms/Button'
import { useAuthStore } from '../store/useAuthStore'

export default function Signup() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const signup = useAuthStore((s) => s.signup)
  const [form, setForm] = useState({ name: '', identifier: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.identifier || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    // TODO: replace with Supabase auth.signUp
    signup(form.name, form.identifier)
    navigate('/account', { replace: true })
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <AuthFormPanel>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <h1 className="font-heading text-3xl font-medium mb-3">{t('auth.signupTitle')}</h1>
            <p className="text-sm text-body">{t('auth.signupSubtitle')}</p>
          </div>

          <Input variant="underline" name="name" placeholder={t('auth.name')} value={form.name} onChange={handleChange} />
          <Input variant="underline" name="identifier" placeholder={t('auth.emailOrPhone')} value={form.identifier} onChange={handleChange} />
          <Input variant="underline" type="password" name="password" placeholder={t('auth.password')} value={form.password} onChange={handleChange} />

          {error && <p className="text-xs text-error">{error}</p>}

          <Button type="submit" variant="primary" size="lg" className="w-full">
            {t('auth.createAccount')}
          </Button>

          <Button type="button" variant="outline" size="lg" className="w-full gap-3">
            <FcGoogle size={20} /> {t('auth.signupWithGoogle')}
          </Button>

          <p className="text-sm text-body text-center">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link to="/login" className="text-ink underline">{t('auth.login')}</Link>
          </p>
        </form>
      </AuthFormPanel>
    </div>
  )
}
