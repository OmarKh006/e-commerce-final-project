import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/format";

function DiscountRow({ discount, couponCode, className = "" }) {
  const { t } = useTranslation();
  if (!discount) return null;
  return (
    <div className={`flex justify-between text-sm ${className}`}>
      <span>
        {t("cart.discount")} ({couponCode})
      </span>
      <span>-{formatPrice(discount)}</span>
    </div>
  );
}

export default function OrderSummaryCard({ mode = "cart" }) {
  const { t } = useTranslation();
  const { items, subtotal, discount, total, couponCode } = useCart();

  if (mode === "checkout") {
    return (
      <div className="flex flex-col gap-4" data-testid="order-summary">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="flex items-center gap-3">
              <img
                src={item.product.image}
                alt=""
                className="w-10 h-10 object-contain rounded-sm bg-secondary-gray"
              />
              <span>
                {item.product.title}
                {item.qty > 1 && <span className="text-body"> × {item.qty}</span>}
              </span>
            </span>
            <span>{formatPrice(item.product.price * item.qty)}</span>
          </div>
        ))}
        <div className="border-t border-line pt-4 flex justify-between text-sm">
          <span>{t("cart.subtotal")}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <DiscountRow discount={discount} couponCode={couponCode} />
        <div className="flex justify-between text-sm">
          <span>{t("cart.shipping")}</span>
          <span>{t("cart.free")}</span>
        </div>
        <div className="border-t border-line pt-4 flex justify-between font-medium">
          <span>{t("cart.total")}</span>
          <span data-testid="order-total">{formatPrice(total)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line rounded-sm p-6 w-full max-w-sm">
      <h3 className="font-heading font-medium mb-6">{t("cart.cartTotal")}</h3>
      <div className="flex justify-between text-sm mb-4 pb-4 border-b border-line">
        <span>{t("cart.subtotal")}</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <DiscountRow
        discount={discount}
        couponCode={couponCode}
        className="mb-4 pb-4 border-b border-line"
      />
      <div className="flex justify-between text-sm mb-4 pb-4 border-b border-line">
        <span>{t("cart.shipping")}</span>
        <span>{t("cart.free")}</span>
      </div>
      <div className="flex justify-between text-sm mb-6">
        <span>{t("cart.total")}</span>
        <span data-testid="cart-total">{formatPrice(total)}</span>
      </div>
      <Button as={Link} to="/checkout" variant="primary" className="w-full">
        {t("cart.proceedToCheckout")}
      </Button>
    </div>
  );
}
