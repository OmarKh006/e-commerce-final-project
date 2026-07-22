import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductCard from '../molecules/ProductCard'
import Button from '../atoms/Button'
import { SectionEyebrow } from './FlashSaleSection'

export default function ProductGridSection({ eyebrow, title, products, showViewAllButton = false }) {
  const { t } = useTranslation()

  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-heading text-2xl font-semibold">{title}</h2>
        </div>
        {!showViewAllButton && (
          <Link to="/search" className="hidden md:block">
            <Button variant="primary" size="sm">{t('home.viewAll')}</Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {showViewAllButton && (
        <div className="flex justify-center mt-10">
          <Button as={Link} to="/search" variant="primary" size="lg">
            {t('home.viewAllProducts')}
          </Button>
        </div>
      )}
    </section>
  )
}
