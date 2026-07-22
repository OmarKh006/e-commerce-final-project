import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../atoms/Button'

export default function NotFoundHero() {
  const { t } = useTranslation()

  return (
    <div className="text-center py-24">
      <h1 className="font-heading text-6xl md:text-8xl font-semibold mb-6">404</h1>
      <h2 className="font-heading text-2xl font-medium mb-4">{t('notFound.title')}</h2>
      <p className="text-sm text-body mb-10">{t('notFound.description')}</p>
      <Button as={Link} to="/" variant="primary" size="lg">
        {t('notFound.backHome')}
      </Button>
    </div>
  )
}
