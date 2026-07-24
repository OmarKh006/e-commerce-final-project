import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiHeart, FiTruck, FiRefreshCw } from "react-icons/fi";
import StarRating from "../atoms/StarRating";
import Button from "../atoms/Button";
import QuantityStepper from "../molecules/QuantityStepper";
import { ColorSwatchPicker, SizePicker } from "../molecules/ColorSwatchPicker";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductInfoPanel({ product }) {
  const { t } = useTranslation();
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState(product.colors?.[0] ?? null);
  const [size, setSize] = useState(product.sizes?.[0] ?? null);

  const { addItem: addToCart } = useCart();
  const { isWishlisted: isWishlistedFn, toggle: toggleWishlist } = useWishlist();
  const isWishlisted = isWishlistedFn(product.id);

  const handleBuyNow = () => addToCart(product, qty, color, size);

  return (
    <div>
      <h1 className="font-heading text-2xl font-medium mb-2">
        {product.title}
      </h1>

      <div className="flex items-center gap-3 mb-3">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <span className="text-line">|</span>
        <span
          className={`text-sm ${product.inStock ? "text-success" : "text-error"}`}
        >
          {product.inStock ? t("product.inStock") : t("product.outOfStock")}
        </span>
      </div>

      <p className="font-heading text-xl mb-4">${product.price}</p>

      <p className="text-sm text-body leading-relaxed pb-6 border-b border-line mb-6">
        {product.description}
      </p>

      {product.colors?.length > 0 && (
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm w-16">{t("product.colours")}:</span>
          <ColorSwatchPicker
            colors={product.colors}
            selected={color}
            onChange={setColor}
          />
        </div>
      )}

      {product.sizes?.length > 0 && (
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm w-16">{t("product.size")}:</span>
          <SizePicker
            sizes={product.sizes}
            selected={size}
            onChange={setSize}
          />
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <QuantityStepper value={qty} onChange={setQty} />
        <Button
          variant="primary"
          size="lg"
          onClick={handleBuyNow}
          disabled={!product.inStock}
        >
          {t("product.buyNow")}
        </Button>
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className="w-11 h-11 border border-line rounded-sm flex items-center justify-center cursor-pointer"
        >
          <FiHeart
            className={isWishlisted ? "fill-primary text-primary" : "text-ink"}
            size={18}
          />
        </button>
      </div>

      <div className="border border-line rounded-sm">
        <div className="flex items-start gap-4 p-4 border-b border-line">
          <FiTruck size={22} className="mt-0.5" />
          <div>
            <p className="text-sm font-medium">{t("product.freeDelivery")}</p>
            <p className="text-xs text-body underline">
              {t("product.freeDeliveryDesc")}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-4">
          <FiRefreshCw size={22} className="mt-0.5" />
          <div>
            <p className="text-sm font-medium">{t("product.returnDelivery")}</p>
            <p className="text-xs text-body">
              {t("product.returnDeliveryDesc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
