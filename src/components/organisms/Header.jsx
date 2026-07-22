import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiHeart, FiShoppingCart, FiUser, FiMenu, FiGrid } from 'react-icons/fi'
import Logo from '../atoms/Logo'
import SearchBar from '../molecules/SearchBar'
import CategoryMegaMenu from './CategoryMegaMenu'
import AccountDropdown from './AccountDropdown'
import NavMobileDrawer from './NavMobileDrawer'
import { useWishlistStore } from '../../store/useWishlistStore'
import { useCartStore } from '../../store/useCartStore'

export default function Header({ isAuthenticated = false }) {
  const { t } = useTranslation()
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const wishlistCount = useWishlistStore((s) => s.productIds.length)
  const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.qty, 0))

  const NAV_LINKS = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.contact'), to: '/contact' },
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.signup'), to: '/signup' },
  ]

  return (
    <header className="border-b border-line">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6">
        <button
          className="md:hidden cursor-pointer"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <FiMenu size={22} />
        </button>

        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => setCategoryOpen(true)}
            onMouseLeave={() => setCategoryOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm text-ink cursor-pointer">
              <FiGrid size={14} /> {t('nav.categories')}
            </button>
            <CategoryMegaMenu open={categoryOpen} onClose={() => setCategoryOpen(false)} />
          </div>
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm ${isActive ? 'text-ink underline underline-offset-4' : 'text-ink/80 hover:text-ink'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <SearchBar className="hidden lg:block w-64" />

          <Link to="/wishlist" className="relative" aria-label="Wishlist">
            <FiHeart size={20} className="text-ink" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative" aria-label="Cart">
            <FiShoppingCart size={20} className="text-ink" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <div
            className="relative"
            onMouseEnter={() => isAuthenticated && setAccountOpen(true)}
            onMouseLeave={() => setAccountOpen(false)}
          >
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              aria-label="Account"
              className={`w-8 h-8 rounded-full flex items-center justify-center ${isAuthenticated ? 'bg-primary text-white' : 'text-ink'}`}
            >
              <FiUser size={isAuthenticated ? 16 : 20} />
            </Link>
            <AccountDropdown open={accountOpen} onClose={() => setAccountOpen(false)} />
          </div>
        </div>
      </div>

      <NavMobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
