import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function AccountSidebarNav({ active = 'profile' }) {
  const { t } = useTranslation()

  const GROUPS = [
    {
      title: t('account.manageAccount'),
      items: [
        { key: 'profile', label: t('account.myProfile'), to: '/account' },
        { key: 'address', label: t('account.addressBook'), to: '/account/address' },
        { key: 'payment', label: t('account.paymentOptions'), to: '/account/payment' },
      ],
    },
    {
      title: t('account.myOrders'),
      items: [
        { key: 'returns', label: t('account.myReturns'), to: '/account/returns' },
        { key: 'cancellations', label: t('account.myCancellations'), to: '/account/cancellations' },
      ],
    },
    {
      title: t('account.myWishlist'),
      items: [],
      standaloneTo: '/wishlist',
    },
  ]

  return (
    <nav className="flex flex-col gap-8">
      {GROUPS.map((group) => (
        <div key={group.title}>
          {group.standaloneTo ? (
            <Link to={group.standaloneTo} className="text-sm font-medium text-ink">
              {group.title}
            </Link>
          ) : (
            <>
              <h3 className="text-sm font-medium text-ink mb-2">{group.title}</h3>
              <ul className="flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item.key}>
                    <Link
                      to={item.to}
                      className={`text-sm ${active === item.key ? 'text-primary' : 'text-body hover:text-ink'}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </nav>
  )
}
