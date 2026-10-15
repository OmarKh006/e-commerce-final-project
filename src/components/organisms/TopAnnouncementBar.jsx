import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../molecules/LanguageSwitcher'

export default function TopAnnouncementBar() {
  const { t } = useTranslation()

  return (
    <div className="bg-black text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 min-h-9 py-1.5 flex items-center justify-center relative">
        <p className="text-center pr-20 md:pr-0">
          {t('topBar.announcement')}{' '}
          <a href="#" className="underline font-medium">{t('topBar.shopNow')}</a>
        </p>
        <div className="absolute right-4">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}
