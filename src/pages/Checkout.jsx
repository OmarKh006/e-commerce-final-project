import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BreadcrumbNav from "../components/molecules/BreadcrumbNav";
import CheckoutForm from "../components/organisms/CheckoutForm";
import OrderSummaryCard from "../components/organisms/OrderSummaryCard";
import PaymentMethodOption from "../components/molecules/PaymentMethodOption";
import CouponForm from "../components/molecules/CouponForm";
import Button from "../components/atoms/Button";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, applyCoupon, clear: clearCart } = useCart();

  const [form, setForm] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
    saveInfo: true,
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placed, setPlaced] = useState(false);

  const handlePlaceOrder = () => {
    if (
      !form.firstName ||
      !form.streetAddress ||
      !form.townCity ||
      !form.phoneNumber ||
      !form.emailAddress
    ) {
      return;
    }
    // TODO: persist order to Supabase (orders + order_items) once backend is wired
    setPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !placed) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-body text-sm mb-6">
          Your cart is empty — nothing to check out.
        </p>
        <Button onClick={() => navigate("/")} variant="primary">
          Return To Shop
        </Button>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-medium mb-3">
          Order placed!
        </h1>
        <p className="text-sm text-body mb-2">
          Thanks — your order has been received.
        </p>
        <p className="text-xs text-body mb-8">({t("checkout.demoNotice")})</p>
        <Button onClick={() => navigate("/")} variant="primary">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <BreadcrumbNav
        items={[
          { label: "Account", to: "/account" },
          { label: "My Account", to: "/account" },
          { label: "Product", to: "/" },
          { label: "View Cart", to: "/cart" },
          { label: "CheckOut" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-10">
        <CheckoutForm form={form} onChange={setForm} />

        <div>
          <OrderSummaryCard mode="checkout" />

          <div className="mt-6 flex flex-col gap-1">
            <PaymentMethodOption
              label={t("checkout.bank")}
              selected={paymentMethod === "bank"}
              onSelect={() => setPaymentMethod("bank")}
            />
            <PaymentMethodOption
              label={t("checkout.cashOnDelivery")}
              selected={paymentMethod === "cod"}
              onSelect={() => setPaymentMethod("cod")}
            />
          </div>

          <div className="mt-6">
            <CouponForm onApply={applyCoupon} />
          </div>

          <p className="text-xs text-body mt-4">{t("checkout.demoNotice")}</p>

          <Button
            onClick={handlePlaceOrder}
            variant="primary"
            size="lg"
            className="mt-6"
          >
            {t("checkout.placeOrder")}
          </Button>
        </div>
      </div>
    </div>
  );
}
