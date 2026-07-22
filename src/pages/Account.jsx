import { useTranslation } from 'react-i18next'
import BreadcrumbNav from '../components/molecules/BreadcrumbNav'
import AccountSidebarNav from '../components/organisms/AccountSidebarNav'
import ProfileForm from '../components/organisms/ProfileForm'
import { useAuthStore } from '../store/useAuthStore'

export default function Account() {
  const { t } = useTranslation()
  const user = useAuthStore((s) => s.user)

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-10">
        <BreadcrumbNav items={[{ label: 'Home', to: '/' }, { label: 'My Account' }]} />
        <p className="text-sm">
          {t('account.welcome')} <span className="text-primary">{user?.name}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10">
        <AccountSidebarNav active="profile" />
        <ProfileForm />
      </div>
    </div>
  )
}
