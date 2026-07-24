import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BreadcrumbNav from "../components/molecules/BreadcrumbNav";
import CartTable from "../components/organisms/CartTable";
import OrderSummaryCard from "../components/organisms/OrderSummaryCard";
import CouponForm from "../components/molecules/CouponForm";
import Button from "../components/atoms/Button";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { t } = useTranslation();
  const { items, applyCoupon } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <BreadcrumbNav
        items={[{ label: "Home", to: "/" }, { label: t("cart.title") }]}
      />

      <div className="mt-8">
        <CartTable />
      </div>

      {items.length > 0 && (
        <>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-8">
            <Button as={Link} to="/" variant="outline">
              {t("cart.returnToShop")}
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-8 mt-14">
            <CouponForm onApply={applyCoupon} />
            <OrderSummaryCard mode="cart" />
          </div>
        </>
      )}
    </div>
  );
}
