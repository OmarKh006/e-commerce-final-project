import BreadcrumbNav from '../components/molecules/BreadcrumbNav'
import ContactInfoPanel from '../components/organisms/ContactInfoPanel'
import ContactForm from '../components/organisms/ContactForm'

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <BreadcrumbNav items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 mt-8">
        <ContactInfoPanel />
        <ContactForm />
      </div>
    </div>
  )
}
