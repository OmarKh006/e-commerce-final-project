import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiChevronRight } from "react-icons/fi";

const SIDEBAR_LINKS = [
  {
    key: "womensFashion",
    to: "/search?category=womens-fashion",
    hasSubmenu: true,
  },
  { key: "mensFashion", to: "/search?category=mens-fashion", hasSubmenu: true },
  { key: "electronics", to: "/search?category=electronics" },
  { key: "homeLifestyle", to: "/search?category=home-lifestyle" },
  { key: "medicine", to: "/search?category=medicine" },
  { key: "sportsOutdoor", to: "/search?category=sports-outdoor" },
  { key: "babysToys", to: "/search?category=babys-toys" },
  { key: "groceriesPets", to: "/search?category=groceries-pets" },
  { key: "healthBeauty", to: "/search?category=health-beauty" },
];

export default function HeroCategorySidebar() {
  const { t } = useTranslation();

  return (
    <nav
      aria-label="Shop by category"
      className="hidden lg:block w-60 shrink-0 border-r border-line"
    >
      <ul>
        {SIDEBAR_LINKS.map((link) => (
          <li key={link.key}>
            <Link
              to={link.to}
              className="flex items-center justify-between px-2 py-2.5 text-sm text-ink hover:text-primary transition-colors"
            >
              {t(`sidebar.${link.key}`)}
              {link.hasSubmenu && <FiChevronRight size={14} />}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
