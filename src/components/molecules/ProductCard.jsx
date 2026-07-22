import { useState } from "react";
import { FiHeart, FiEye, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Badge from "../atoms/Badge";
import StarRating from "../atoms/StarRating";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useCartStore } from "../../store/useCartStore";

export default function ProductCard({ product }) {
  const { t } = useTranslation();
  const [hovered, setHovered] = useState(false);
  const {
    id,
    title,
    price,
    oldPrice,
    discountPct,
    rating,
    reviewCount,
    image,
    badge,
    colors,
    inStock,
  } = product;

  const isWishlisted = useWishlistStore((s) => s.isWishlisted(id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const addToCart = useCartStore((s) => s.addItem);

  return (
    <div
      className="group w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative bg-secondary-gray rounded-sm overflow-hidden aspect-square">
        {badge === "sale" && discountPct && (
          <Badge variant="sale" className="absolute top-3 left-3 z-10">
            -{discountPct}%
          </Badge>
        )}
        {badge === "new" && (
          <Badge variant="new" className="absolute top-3 left-3 z-10">
            NEW
          </Badge>
        )}

        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button
            type="button"
            aria-label="Toggle wishlist"
            onClick={() => toggleWishlist(id)}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:text-primary cursor-pointer"
          >
            <FiHeart
              className={
                isWishlisted ? "fill-primary text-primary" : "text-ink"
              }
              size={16}
            />
          </button>
          <Link
            to={`/product/${id}`}
            aria-label="Quick view"
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:text-primary cursor-pointer"
          >
            <FiEye className="text-ink" size={16} />
          </Link>
        </div>

        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={title}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </Link>

        {(hovered || !inStock) && (
          <button
            type="button"
            disabled={!inStock}
            onClick={() => addToCart(product, 1)}
            className="absolute bottom-0 left-0 right-0 bg-black text-white text-sm py-2.5 flex items-center justify-center gap-2 disabled:bg-body disabled:cursor-not-allowed cursor-pointer"
          >
            <FiShoppingCart size={14} />
            {inStock ? t("product.addToCart") : t("product.outOfStock")}
          </button>
        )}
      </div>

      <div className="mt-3">
        <Link
          to={`/product/${id}`}
          className="font-heading text-sm font-medium text-ink hover:text-primary"
        >
          {title}
        </Link>

        <div className="mt-1 flex items-center gap-2">
          <span className="font-heading text-primary font-medium text-sm">
            ${price}
          </span>
          {oldPrice && (
            <span className="text-body text-sm line-through">${oldPrice}</span>
          )}
        </div>

        <div className="mt-1 flex items-center justify-between">
          <StarRating rating={rating} reviewCount={reviewCount} />
          {colors?.length > 0 && (
            <div className="flex items-center gap-1">
              {colors.map((c) => (
                <span
                  key={c}
                  className="w-3.5 h-3.5 rounded-full border border-line"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
