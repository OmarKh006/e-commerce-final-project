import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import CountdownTimer from "../molecules/CountdownTimer";
import ProductCard from "../molecules/ProductCard";
import Button from "../atoms/Button";
import { Link } from "react-router-dom";

export function SectionEyebrow({ children }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="w-5 h-10 bg-primary rounded-sm" />
      <span className="text-sm font-semibold text-primary">{children}</span>
    </div>
  );
}

export default function FlashSaleSection({ products, endsAt }) {
  const { t } = useTranslation();

  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <SectionEyebrow>{t("home.today")}</SectionEyebrow>
          <div className="flex items-center gap-10">
            <h2 className="font-heading text-2xl font-semibold">
              {t("home.flashSales")}
            </h2>
            <CountdownTimer endsAt={endsAt} />
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-secondary-gray flex items-center justify-center cursor-pointer">
            <FiArrowLeft size={16} />
          </button>
          <button className="w-9 h-9 rounded-full bg-secondary-gray flex items-center justify-center cursor-pointer">
            <FiArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button as={Link} to="#" variant="primary" size="lg">
          {t("home.viewAllProducts")}
        </Button>
      </div>
    </section>
  );
}
