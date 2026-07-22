import { useTranslation } from 'react-i18next'

export default function AboutHero() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1">
        <h1 className="font-heading text-4xl font-semibold mb-6">{t('about.ourStory')}</h1>
        <p className="text-sm text-body leading-relaxed mb-4">
          Launched in 2015, Exclusive is South Asia's premier online shopping marketplace with an
          active presence in Bangladesh. Supported by a wide range of tailored marketing, data and
          service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million
          customers across the region.
        </p>
        <p className="text-sm text-body leading-relaxed">
          Exclusive has more than 1 million products to offer, growing very fast. Exclusive offers a
          diverse assortment in categories ranging from consumer goods.
        </p>
      </div>
      <div className="flex-1 w-full">
        <div className="w-full h-96 rounded-sm bg-[#F28FB0]" />
      </div>
    </div>
  )
}
