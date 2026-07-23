import { useTranslation } from "react-i18next";
import HeroBanner from "../components/organisms/HeroBanner";
import HeroCategorySidebar from "../components/organisms/HeroCategorySidebar";
import FlashSaleSection from "../components/organisms/FlashSaleSection";
import CategoryBrowseSection from "../components/organisms/CategoryBrowseSection";
import ProductGridSection from "../components/organisms/ProductGridSection";
import {
  PromoBannerLarge,
  PromoTile,
} from "../components/organisms/PromoBannerSplit";
import ServiceFeaturesBar from "../components/organisms/ServiceFeaturesBar";
import { flashSaleEndsAt, jblOfferEndsAt } from "../data/mockData";
import { useProducts, useCategories } from "../hooks/useProducts";

export default function Home() {
  const { t } = useTranslation();
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
  } = useProducts();
  const { data: categories } = useCategories();

  if (productsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-sm text-body">
        Loading products…
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-sm text-error">
        Something went wrong loading products. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-20">
      <div className="flex items-stretch gap-8 pb-8 border-b border-line">
        <HeroCategorySidebar />
        <HeroBanner />
      </div>

      {products.length > 0 && (
        <FlashSaleSection products={products} endsAt={flashSaleEndsAt} />
      )}

      <CategoryBrowseSection categories={categories || []} />

      {products.length > 0 && (
        <ProductGridSection
          eyebrow={t("home.thisMonth")}
          title={t("home.bestSelling")}
          products={products.slice(0, 4)}
        />
      )}

      <PromoBannerLarge
        eyebrow={t("home.categoriesEyebrow")}
        title={t("home.musicExperience")}
        image="/JBL.png"
        endsAt={jblOfferEndsAt}
      />

      {products.length > 0 ? (
        <ProductGridSection
          eyebrow={t("home.ourProducts")}
          title={t("home.exploreProducts")}
          products={products}
          showViewAllButton
        />
      ) : (
        <p className="text-center text-sm text-body">No products yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PromoTile title="PlayStation 5" image="/PS5.png" size="lg" />
        <div className="flex flex-col gap-4 md:col-span-2">
          <PromoTile title="Women's Collections" />
          <div className="grid grid-cols-2 gap-4">
            <PromoTile title="Speakers" image="/Speakers.png" />
            <PromoTile title="Perfume" image="/Gucci.png" />
          </div>
        </div>
      </div>

      <ServiceFeaturesBar />
    </div>
  );
}
