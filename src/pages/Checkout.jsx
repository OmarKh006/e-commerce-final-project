import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BreadcrumbNav from "../components/molecules/BreadcrumbNav";
import CheckoutForm from "../components/organisms/CheckoutForm";
import OrderSummaryCard from "../components/organisms/OrderSummaryCard";
import PaymentMethodOption from "../components/molecules/PaymentMethodOption";
import CouponForm from "../components/molecules/CouponForm";
import Button from "../components/atoms/Button";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../lib/format";
import { newOrderId, saveOrder } from "../lib/orders";
import { isValidEmail } from "../lib/validation";


function validate(form, t) {
  const errors = {};
  const required = t("checkout.errors.required");
  if (!form.firstName.trim()) errors.firstName = required;
  if (!form.streetAddress.trim()) errors.streetAddress = required;
  if (!form.townCity.trim()) errors.townCity = required;

  const phone = form.phoneNumber.trim();
  if (!phone) errors.phoneNumber = required;
  else {
    const digits = phone.replace(/\D/g, "");
    if (!/^[+\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
      errors.phoneNumber = t("checkout.errors.phone");
    }
  }

  const email = form.emailAddress.trim();
  if (!email) errors.emailAddress = required;
  else if (!isValidEmail(email)) errors.emailAddress = t("checkout.errors.email");
  return errors;
}

export default function Checkout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, total, applyCoupon, clear: clearCart } = useCart();
  const submittedRef = useRef(false);

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
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [order, setOrder] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submittedRef.current || items.length === 0) return;

    const found = validate(form, t);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // move focus to the first invalid field
      const first = Object.keys(found)[0];
      document.getElementById(`co-${first}`)?.focus();
      return;
    }

    submittedRef.current = true; // blocks double submits
    const placed = saveOrder({
      id: newOrderId(),
      userId: user?.id ?? null,
      createdAt: new Date().toISOString(),
      paymentMethod,
      customer: {
        firstName: form.firstName.trim(),
        email: form.emailAddress.trim(),
        phone: form.phoneNumber.trim(),
        address: `${form.streetAddress.trim()}, ${form.townCity.trim()}`,
      },
      items: items.map((i) => ({
        productId: i.productId,
        title: i.product.title,
        price: i.product.price,
        qty: i.qty,
      })),
      total,
    });
    setOrder(placed);
    clearCart();
  };

  if (order) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 py-24 text-center"
        data-testid="order-success"
        role="status"
      >
        <h1 className="font-heading text-2xl font-medium mb-3">
          {t("checkout.orderPlacedTitle")}
        </h1>
        <p className="text-sm text-body mb-2">{t("checkout.orderPlacedMsg")}</p>
        <p className="text-sm mb-1">{t("checkout.orderNumber", { id: order.id })}</p>
        <p className="text-sm mb-2">
          {t("checkout.orderTotal", { total: formatPrice(order.total) })}
        </p>
        <p className="text-xs text-body mb-8">({t("checkout.demoNotice")})</p>
        <Button as={Link} to="/" variant="primary">
          {t("checkout.continueShopping")}
        </Button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center" data-testid="checkout-empty">
        <p className="text-body text-sm mb-6">{t("checkout.emptyCart")}</p>
        <Button onClick={() => navigate("/")} variant="primary">
          {t("cart.returnToShop")}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <BreadcrumbNav
        items={[
          { label: t("nav.account"), to: "/account" },
          { label: t("footer.myAccount"), to: "/account" },
          { label: t("nav.product"), to: "/" },
          { label: t("cart.viewCart"), to: "/cart" },
          { label: t("checkout.breadcrumb") },
        ]}
      />

      <form
        data-testid="checkout-form"
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-10"
      >
        <CheckoutForm form={form} errors={errors} onChange={setForm} />

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
            type="submit"
            data-testid="place-order"
            variant="primary"
            size="lg"
            className="mt-6"
          >
            {t("checkout.placeOrder")}
          </Button>
        </div>
      </form>
    </div>
  );
}
