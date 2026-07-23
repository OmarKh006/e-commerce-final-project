import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FiUser,
  FiShoppingBag,
  FiXCircle,
  FiStar,
  FiLogOut,
} from "react-icons/fi";
import { useAuthStore } from "../../store/useAuthStore";

export default function AccountDropdown({ open, onClose }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  if (!open) return null;

  const handleLogout = async () => {
    await logout();
    onClose?.();
    navigate("/login");
  };

  const LINKS = [
    { label: t("accountMenu.manage"), to: "/account", icon: FiUser },
    {
      label: t("accountMenu.myOrder"),
      to: "/account/orders",
      icon: FiShoppingBag,
    },
    {
      label: t("accountMenu.cancellations"),
      to: "/account/cancellations",
      icon: FiXCircle,
    },
    { label: t("accountMenu.reviews"), to: "/account/reviews", icon: FiStar },
  ];

  return (
    <div className="absolute top-0 right-0 pt-10 w-56 z-30">
      <div
        onMouseLeave={onClose}
        className="rounded-lg border border-white/20 shadow-card-hover overflow-hidden text-ink"
        style={{
          backgroundColor: "rgba(0,0,0,0.04)",
        }}
      >
        <ul className="py-2">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-2.5 text-sm hover:text-primary"
              >
                <l.icon size={16} />
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:text-primary cursor-pointer"
            >
              <FiLogOut size={16} />
              {t("accountMenu.logout")}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
