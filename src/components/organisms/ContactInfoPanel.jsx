import { FiPhone, FiMail } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

export default function ContactInfoPanel() {
  const { t } = useTranslation()

  return (
    <div className="border border-line rounded-sm p-8 flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
            <FiPhone size={16} />
          </span>
          <h3 className="font-medium">{t('contact.callToUs')}</h3>
        </div>
        <p className="text-sm text-body mb-1">{t('contact.callDesc')}</p>
        <p className="text-sm text-ink">Phone: +8801611112222</p>
      </div>

      <div className="border-t border-line" />

      <div>
        <div className="flex items-center gap-4 mb-4">
          <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
            <FiMail size={16} />
          </span>
          <h3 className="font-medium">{t('contact.writeToUs')}</h3>
        </div>
        <p className="text-sm text-body mb-3">{t('contact.writeDesc')}</p>
        <p className="text-sm text-ink">Emails: customer@exclusive.com</p>
        <p className="text-sm text-ink">Emails: support@exclusive.com</p>
      </div>
    </div>
  )
}
