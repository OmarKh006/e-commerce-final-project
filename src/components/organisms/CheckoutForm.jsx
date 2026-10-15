import { useTranslation } from 'react-i18next'
import Input from '../atoms/Input'
import Checkbox from '../atoms/Checkbox'

// Renders the billing fields only. The surrounding <form data-testid="checkout-form">
// lives in pages/Checkout so the place-order button can sit in the summary column.
export default function CheckoutForm({ form, errors = {}, onChange }) {
  const { t } = useTranslation()

  const handleChange = (e) => onChange((f) => ({ ...f, [e.target.name]: e.target.value }))
  const handleCheckbox = (e) => onChange((f) => ({ ...f, saveInfo: e.target.checked }))

  return (
    <div>
      <h1 className="font-heading text-3xl font-medium mb-8">{t('checkout.title')}</h1>

      <div className="flex flex-col gap-6 max-w-md">
        <Input id="co-firstName" label={`${t('checkout.firstName')}*`} name="firstName" autoComplete="given-name" value={form.firstName} onChange={handleChange} error={errors.firstName} />
        <Input id="co-companyName" label={t('checkout.companyName')} name="companyName" autoComplete="organization" value={form.companyName} onChange={handleChange} />
        <Input id="co-streetAddress" label={`${t('checkout.streetAddress')}*`} name="streetAddress" autoComplete="street-address" value={form.streetAddress} onChange={handleChange} error={errors.streetAddress} />
        <Input id="co-apartment" label={t('checkout.apartment')} name="apartment" value={form.apartment} onChange={handleChange} />
        <Input id="co-townCity" label={`${t('checkout.townCity')}*`} name="townCity" autoComplete="address-level2" value={form.townCity} onChange={handleChange} error={errors.townCity} />
        <Input id="co-phoneNumber" label={`${t('checkout.phoneNumber')}*`} type="tel" name="phoneNumber" autoComplete="tel" value={form.phoneNumber} onChange={handleChange} error={errors.phoneNumber} />
        <Input id="co-emailAddress" label={`${t('checkout.emailAddress')}*`} type="email" name="emailAddress" autoComplete="email" value={form.emailAddress} onChange={handleChange} error={errors.emailAddress} />

        <Checkbox
          id="saveInfo"
          label={t('checkout.saveInfo')}
          checked={form.saveInfo}
          onChange={handleCheckbox}
        />
      </div>
    </div>
  )
}
