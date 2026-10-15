import { useTranslation } from 'react-i18next'
import BreadcrumbNav from '../components/molecules/BreadcrumbNav'
import NotFoundHero from '../components/organisms/NotFoundHero'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <BreadcrumbNav items={[{ label: t('nav.home'), to: '/' }, { label: t('notFound.breadcrumb') }]} />
      <NotFoundHero />
    </div>
  )
}
