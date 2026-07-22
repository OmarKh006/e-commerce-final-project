import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiChevronRight } from "react-icons/fi";

const SIDEBAR_LINKS = [
  {
    key: "womensFashion",
    to: "#",
    hasSubmenu: true,
  },
  { key: "mensFashion", to: "#", hasSubmenu: true },
  { key: "electronics", to: "#" },
  { key: "homeLifestyle", to: "#" },
  { key: "medicine", to: "#" },
  { key: "sportsOutdoor", to: "#" },
  { key: "babysToys", to: "#" },
  { key: "groceriesPets", to: "#" },
  { key: "healthBeauty", to: "#" },
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
