import { useTranslation } from 'react-i18next'
import Input from '../atoms/Input'
import Checkbox from '../atoms/Checkbox'

export default function CheckoutForm({ form, onChange }) {
  const { t } = useTranslation()

  const handleChange = (e) => onChange((f) => ({ ...f, [e.target.name]: e.target.value }))
  const handleCheckbox = (e) => onChange((f) => ({ ...f, saveInfo: e.target.checked }))

  return (
    <div>
      <h1 className="font-heading text-3xl font-medium mb-8">{t('checkout.title')}</h1>

      <form className="flex flex-col gap-6 max-w-md">
        <Input label={`${t('checkout.firstName')}*`} name="firstName" value={form.firstName} onChange={handleChange} required />
        <Input label={t('checkout.companyName')} name="companyName" value={form.companyName} onChange={handleChange} />
        <Input label={`${t('checkout.streetAddress')}*`} name="streetAddress" value={form.streetAddress} onChange={handleChange} required />
        <Input label={t('checkout.apartment')} name="apartment" value={form.apartment} onChange={handleChange} />
        <Input label={`${t('checkout.townCity')}*`} name="townCity" value={form.townCity} onChange={handleChange} required />
        <Input label={`${t('checkout.phoneNumber')}*`} name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
        <Input label={`${t('checkout.emailAddress')}*`} type="email" name="emailAddress" value={form.emailAddress} onChange={handleChange} required />

        <Checkbox
          id="saveInfo"
          label={t('checkout.saveInfo')}
          checked={form.saveInfo}
          onChange={handleCheckbox}
        />
      </form>
    </div>
  )
}
