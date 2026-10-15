import { useTranslation } from 'react-i18next'
import BreadcrumbNav from '../components/molecules/BreadcrumbNav'
import WishlistGrid from '../components/organisms/WishlistGrid'

export default function Wishlist() {
  const { t } = useTranslation()
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <BreadcrumbNav items={[{ label: t('nav.home'), to: '/' }, { label: t('wishlist.title') }]} />
      <div className="mt-8">
        <WishlistGrid />
      </div>
    </div>
  )
}
