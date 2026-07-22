import { useTranslation } from 'react-i18next'
import ProductCard from '../molecules/ProductCard'
import Button from '../atoms/Button'
import { useWishlistStore } from '../../store/useWishlistStore'
import { useCartStore } from '../../store/useCartStore'
import { products as allProducts } from '../../data/mockData'

export default function WishlistGrid() {
  const { t } = useTranslation()
  const productIds = useWishlistStore((s) => s.productIds)
  const addToCart = useCartStore((s) => s.addItem)

  const wishlistedProducts = allProducts.filter((p) => productIds.includes(p.id))

  const moveAllToBag = () => {
    wishlistedProducts.forEach((p) => addToCart(p, 1))
  }

  if (wishlistedProducts.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-body text-sm">Your wishlist is empty.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-xl font-medium">
          {t('wishlist.title')} ({wishlistedProducts.length})
        </h1>
        <Button variant="outline" onClick={moveAllToBag}>
          {t('wishlist.moveAllToBag')}
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
