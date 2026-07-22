import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import { useCartStore } from "../../store/useCartStore";

export default function OrderSummaryCard({ mode = "cart" }) {
  const { t } = useTranslation();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());

  if (mode === "checkout") {
    return (
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-3">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-10 h-10 object-cover rounded-sm bg-secondary-gray"
              />
              {item.product.title}
            </span>
            <span>${item.product.price * item.qty}</span>
          </div>
        ))}
        <div className="border-t border-line pt-4 flex justify-between text-sm">
          <span>{t("cart.subtotal")}</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>{t("cart.shipping")}</span>
          <span>{t("cart.free")}</span>
        </div>
        <div className="border-t border-line pt-4 flex justify-between font-medium">
          <span>{t("cart.total")}</span>
          <span>${subtotal}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-line rounded-sm p-6 w-full max-w-sm">
      <h3 className="font-heading font-medium mb-6">{t("cart.cartTotal")}</h3>
      <div className="flex justify-between text-sm mb-4 pb-4 border-b border-line">
        <span>{t("cart.subtotal")}</span>
        <span>${subtotal}</span>
      </div>
      <div className="flex justify-between text-sm mb-4 pb-4 border-b border-line">
        <span>{t("cart.shipping")}</span>
        <span>{t("cart.free")}</span>
      </div>
      <div className="flex justify-between text-sm mb-6">
        <span>{t("cart.total")}</span>
        <span>${subtotal}</span>
      </div>
      <Button as={Link} to="/checkout" variant="primary" className="w-full">
        {t("cart.proceedToCheckout")}
      </Button>
    </div>
  );
}
