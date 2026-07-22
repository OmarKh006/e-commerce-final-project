import { useTranslation } from 'react-i18next'
import { FiTruck, FiHeadphones, FiShield } from 'react-icons/fi'
import ServiceFeature from '../molecules/ServiceFeature'

export default function ServiceFeaturesBar() {
  const { t } = useTranslation()

  const FEATURES = [
    { icon: FiTruck, title: t('service.deliveryTitle'), description: t('service.deliveryDesc') },
    { icon: FiHeadphones, title: t('service.supportTitle'), description: t('service.supportDesc') },
    { icon: FiShield, title: t('service.guaranteeTitle'), description: t('service.guaranteeDesc') },
  ]

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-10">
      {FEATURES.map((f) => (
        <ServiceFeature key={f.title} {...f} />
      ))}
    </section>
  )
}
