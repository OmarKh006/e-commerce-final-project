import { FiShoppingBag, FiDollarSign, FiGift, FiCreditCard } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import StatCard from '../molecules/StatCard'

export default function StatsRow() {
  const { t } = useTranslation()

  const STATS = [
    { icon: FiShoppingBag, value: '10.5k', label: t('about.sellers') },
    { icon: FiDollarSign, value: '33k', label: t('about.monthlySale'), highlighted: true },
    { icon: FiGift, value: '45.5k', label: t('about.customers') },
    { icon: FiCreditCard, value: '25k', label: t('about.grossSale') },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {STATS.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  )
}
