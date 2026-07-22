import BreadcrumbNav from '../components/molecules/BreadcrumbNav'
import NotFoundHero from '../components/organisms/NotFoundHero'

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <BreadcrumbNav items={[{ label: 'Home', to: '/' }, { label: '404 Error' }]} />
      <NotFoundHero />
    </div>
  )
}
