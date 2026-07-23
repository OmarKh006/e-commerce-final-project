import { useState } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import CategoryIcon from '../molecules/CategoryIcon'
import { SectionEyebrow } from './FlashSaleSection'

export default function CategoryBrowseSection({ categories = [], onSelect }) {
  const { t } = useTranslation()
  const [active, setActive] = useState(null)

  const handleSelect = (id) => {
    setActive(id)
    onSelect?.(id)
  }

  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <SectionEyebrow>{t('home.categoriesEyebrow')}</SectionEyebrow>
          <h2 className="font-heading text-2xl font-semibold">{t('home.browseByCategory')}</h2>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-secondary-gray flex items-center justify-center cursor-pointer">
            <FiArrowLeft size={16} />
          </button>
          <button className="w-9 h-9 rounded-full bg-secondary-gray flex items-center justify-center cursor-pointer">
            <FiArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-5">
        {categories.map((c) => (
          <CategoryIcon key={c.id} category={c} active={active === c.id} onClick={handleSelect} />
        ))}
      </div>
    </section>
  )
}
