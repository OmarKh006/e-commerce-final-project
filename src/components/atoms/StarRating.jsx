import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function StarRating({
  rating = 0,
  reviewCount,
  mode = "display",
  size = 14,
  onChange,
}) {
  const stars = [1, 2, 3, 4, 5];

  if (mode === "input") {
    return (
      <div className="flex items-center gap-1">
        {stars.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange?.(s)}
            aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}
            className="cursor-pointer text-star"
          >
            {s <= rating ? (
              <FaStar size={size + 4} />
            ) : (
              <FaRegStar size={size + 4} />
            )}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center text-star">
        {stars.map((s) => {
          if (rating >= s) return <FaStar key={s} size={size} />;
          if (rating >= s - 0.5) return <FaStarHalfAlt key={s} size={size} />;
          return <FaRegStar key={s} size={size} />;
        })}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-body">({reviewCount})</span>
      )}
    </div>
  );
}
