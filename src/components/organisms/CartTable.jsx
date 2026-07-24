import { FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import QuantityStepper from "../molecules/QuantityStepper";
import Button from "../atoms/Button";
import { useCart } from "../../context/CartContext";

export default function CartTable() {
  const { t } = useTranslation();
  const { items, updateQty, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-body text-sm mb-6">Your cart is empty.</p>
        <Button as={Link} to="/" variant="primary">
          {t("cart.returnToShop")}
        </Button>
      </div>
    );
  }

  return (
    <div className="border border-line rounded-sm">
      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-8 py-5 text-sm text-body border-b border-line">
        <span>{t("cart.product")}</span>
        <span>{t("cart.price")}</span>
        <span>{t("cart.quantity")}</span>
        <span>{t("cart.subtotal")}</span>
        <span />
      </div>

      {items.map((item) => (
        <div
          key={item.key}
          className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-8 py-6 border-b border-line last:border-b-0"
        >
          <div className="flex items-center gap-4 col-span-2 md:col-span-1">
            <img
              src={item.product.image}
              alt={item.product.title}
              className="w-14 h-14 object-cover rounded-sm bg-secondary-gray"
            />
            <span className="text-sm">{item.product.title}</span>
          </div>
          <span className="text-sm">${item.product.price}</span>
          <QuantityStepper
            size="sm"
            value={item.qty}
            onChange={(qty) => updateQty(item.key, qty)}
          />
          <span className="text-sm">${item.product.price * item.qty}</span>
          <button
            onClick={() => removeItem(item.key)}
            aria-label="Remove item"
            className="text-body hover:text-error cursor-pointer justify-self-end"
          >
            <FiX size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
