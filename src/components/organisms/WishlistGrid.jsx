import { useTranslation } from "react-i18next";
import ProductCard from "../molecules/ProductCard";
import Button from "../atoms/Button";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { useProducts } from "../../hooks/useProducts";

export default function WishlistGrid() {
  const { t } = useTranslation();
  const { productIds } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { data: allProducts, isLoading, isError } = useProducts();

  const wishlistedProducts = (allProducts || []).filter((p) =>
    productIds.includes(p.id),
  );

  const moveAllToBag = () => {
    wishlistedProducts.forEach((p) => addToCart(p, 1));
  };

  if (isLoading) {
    return (
      <div className="text-center py-24">
        <p className="text-body text-sm">{t("wishlist.loading")}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-24">
        <p className="text-error text-sm">
          {t("wishlist.loadError")}
        </p>
      </div>
    );
  }

  if (wishlistedProducts.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-body text-sm" data-testid="wishlist-empty">
          {t("wishlist.empty")}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-xl font-medium">
          {t("wishlist.title")} ({wishlistedProducts.length})
        </h1>
        <Button variant="outline" onClick={moveAllToBag}>
          {t("wishlist.moveAllToBag")}
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistedProducts.map((p) => (
          <div key={p.id} data-testid="wishlist-item" data-product-id={p.id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
