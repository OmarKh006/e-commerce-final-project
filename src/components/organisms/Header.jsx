import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiGrid,
  FiLogOut,
} from "react-icons/fi";
import Logo from "../atoms/Logo";
import SearchBar from "../molecules/SearchBar";
import CategoryMegaMenu from "./CategoryMegaMenu";
import AccountDropdown from "./AccountDropdown";
import NavMobileDrawer from "./NavMobileDrawer";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Header({ isAuthenticated = false }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { productIds } = useWishlist();
  const { count: cartCount } = useCart();
  const wishlistCount = productIds.length;

  const NAV_LINKS = [
    { label: t("nav.home"), to: "/" },
    { label: t("nav.contact"), to: "/contact" },
    { label: t("nav.about"), to: "/about" },
    ...(isAuthenticated ? [] : [{ label: t("nav.signup"), to: "/signup" }]),
  ];

  const handleLogout = async () => {
    await logout();
    setAccountOpen(false);
    navigate("/login");
  };

  return (
    <header className="border-b border-line">
      <div className="max-w-7xl mx-auto px-4 py-3 lg:py-0 lg:h-20 flex flex-wrap lg:flex-nowrap items-center justify-between gap-x-4 gap-y-3">
        <button
          type="button"
          className="md:hidden cursor-pointer"
          aria-label={t("nav.openMenu")}
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
            <button
              type="button"
              className="flex items-center gap-1 text-sm text-ink cursor-pointer"
            >
              <FiGrid size={14} /> {t("nav.categories")}
            </button>
            <CategoryMegaMenu
              open={categoryOpen}
              onClose={() => setCategoryOpen(false)}
            />
          </div>
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm ${isActive ? "text-ink underline underline-offset-4" : "text-ink/80 hover:text-ink"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* `contents` on small screens lets the search bar wrap onto its own row. */}
        <div className="contents lg:flex lg:items-center lg:gap-5">
          <SearchBar className="order-last w-full lg:order-none lg:w-64" />

          <div className="flex items-center gap-4 sm:gap-5">
            <Link
              to="/wishlist"
              className="relative"
              aria-label={t("nav.wishlist")}
            >
              <FiHeart size={20} className="text-ink" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative" aria-label={t("nav.cart")}>
              <FiShoppingCart size={20} className="text-ink" />
              {/* Always rendered so the count (including 0) is readable; hidden visually at 0. */}
              <span
                data-testid="cart-count"
                className={`absolute -top-2 -right-2 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center ${cartCount > 0 ? "" : "invisible"}`}
              >
                {cartCount}
              </span>
            </Link>

            <div
              className="relative"
              onMouseEnter={() => isAuthenticated && setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <Link
                to={isAuthenticated ? "/account" : "/login"}
                aria-label={t("accountMenu.manage")}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${isAuthenticated ? "bg-primary text-white" : "text-ink"}`}
              >
                <FiUser size={isAuthenticated ? 16 : 20} />
              </Link>
              <AccountDropdown
                open={accountOpen}
                onClose={() => setAccountOpen(false)}
              />
            </div>

            {isAuthenticated && (
              <button
                type="button"
                data-testid="logout"
                onClick={handleLogout}
                aria-label={t("nav.logout")}
                title={t("nav.logout")}
                className="text-ink hover:text-primary cursor-pointer"
              >
                <FiLogOut size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      <NavMobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isAuthenticated={isAuthenticated}
      />
    </header>
  );
}
