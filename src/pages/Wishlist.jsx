import BreadcrumbNav from '../components/molecules/BreadcrumbNav'
import WishlistGrid from '../components/organisms/WishlistGrid'

export default function Wishlist() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <BreadcrumbNav items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
      <div className="mt-8">
        <WishlistGrid />
      </div>
    </div>
  )
}
