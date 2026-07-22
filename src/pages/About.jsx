import BreadcrumbNav from '../components/molecules/BreadcrumbNav'
import AboutHero from '../components/organisms/AboutHero'
import StatsRow from '../components/organisms/StatsRow'
import TeamCarousel from '../components/organisms/TeamCarousel'
import ServiceFeaturesBar from '../components/organisms/ServiceFeaturesBar'

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-20">
      <BreadcrumbNav items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
      <AboutHero />
      <StatsRow />
      <TeamCarousel />
      <ServiceFeaturesBar />
    </div>
  )
}
