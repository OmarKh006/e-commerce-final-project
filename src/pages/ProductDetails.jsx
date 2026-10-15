import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BreadcrumbNav from '../components/molecules/BreadcrumbNav'
import ProductGallery from '../components/organisms/ProductGallery'
import ProductInfoPanel from '../components/organisms/ProductInfoPanel'
import ProductReviews from '../components/organisms/ProductReviews'
import ProductCard from '../components/molecules/ProductCard'
import { SectionEyebrow } from '../components/organisms/FlashSaleSection'
import { useCategories, useProduct, useProducts } from '../hooks/useProducts'
import Button from '../components/atoms/Button'

export default function ProductDetails() {
  const { id } = useParams()
  const { t } = useTranslation()
  const { data: product, isLoading, isError } = useProduct(id)
  const { data: allProducts } = useProducts()
  const { data: categories } = useCategories()

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-body text-sm">{t('product.loading')}</p>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center" data-testid="product-not-found">
        <p className="text-body text-sm mb-6">{t('product.notFound')}</p>
        <Button as={Link} to="/" variant="primary">{t('product.backHome')}</Button>
      </div>
    )
  }

  const related = (allProducts || []).filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-16">
      <BreadcrumbNav
        items={[
          { label: t('nav.account'), to: '/account' },
          { label: categories?.find((c) => String(c.id) === String(product.category))?.name ?? t('nav.product') },
          { label: product.title },
        ]}
      />

      <div data-testid="product-details" className="flex flex-col gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ProductGallery images={product.images?.length ? product.images : [product.image]} title={product.title} />
          <ProductInfoPanel product={product} />
        </div>

        <ProductReviews productId={product.id} />
      </div>

      {related.length > 0 && (
        <section>
          <SectionEyebrow>{t('product.relatedItem')}</SectionEyebrow>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
