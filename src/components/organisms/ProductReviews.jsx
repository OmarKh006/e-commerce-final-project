import { useState } from "react";
import { useTranslation } from "react-i18next";
import StarRating from "../atoms/StarRating";
import Textarea from "../atoms/Textarea";
import Button from "../atoms/Button";
import { useAuth } from "../../context/AuthContext";
import { addReview, getReviews } from "../../lib/reviews";

const MIN_LEN = 5;
const MAX_LEN = 1000;

export default function ProductReviews({ productId }) {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [reviews, setReviews] = useState(() => getReviews(productId));
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const author =
    user?.user_metadata?.name || user?.email?.split("@")[0] || t("product.guest");

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotice("");
    const body = text.trim();

    if (body.length < MIN_LEN) return setError(t("product.reviewTooShort"));
    if (body.length > MAX_LEN) return setError(t("product.reviewTooLong"));
    if (reviews.some((r) => r.text === body && r.author === author)) {
      return setError(t("product.reviewDuplicate"));
    }

    try {
      const next = addReview(productId, {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        author,
        rating,
        text: body,
        createdAt: new Date().toISOString(),
      });
      setReviews(next);
      setText("");
      setError("");
      setNotice(t("product.reviewSaved"));
    } catch {
      setError(t("product.reviewStorageError"));
    }
  };

  return (
    <section aria-labelledby="reviews-heading" className="border-t border-line pt-10">
      <h2 id="reviews-heading" className="font-heading text-xl font-medium mb-6">
        {t("product.reviewsTitle")} ({reviews.length})
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <h3 className="text-sm font-medium">{t("product.writeReview")}</h3>

          <div>
            <p className="text-xs text-body mb-1.5">{t("product.yourRating")}</p>
            <StarRating
              mode="input"
              rating={rating}
              onChange={setRating}
              size={16}
            />
          </div>

          <Textarea
            data-testid="review-text"
            label={t("product.yourReview")}
            rows={5}
            value={text}
            maxLength={MAX_LEN + 200}
            placeholder={t("product.reviewPlaceholder")}
            error={error}
            onChange={(e) => {
              setText(e.target.value);
              if (error) setError("");
            }}
          />

          {notice && (
            <p role="status" className="text-xs text-success">
              {notice}
            </p>
          )}

          <div>
            <Button type="submit" variant="primary" data-testid="review-submit">
              {t("product.submitReview")}
            </Button>
          </div>
        </form>

        <div>
          {reviews.length === 0 ? (
            <p className="text-sm text-body">{t("product.noReviews")}</p>
          ) : (
            <ul className="flex flex-col gap-6">
              {reviews.map((r) => (
                <li
                  key={r.id}
                  data-testid="review"
                  className="border-b border-line pb-6 last:border-b-0"
                >
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className="text-sm font-medium">{r.author}</span>
                    <time
                      dateTime={r.createdAt}
                      className="text-xs text-body"
                    >
                      {new Date(r.createdAt).toLocaleDateString(i18n.language)}
                    </time>
                  </div>
                  <StarRating rating={r.rating} />
                  <p className="text-sm text-body mt-2 whitespace-pre-line break-words">
                    {r.text}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
