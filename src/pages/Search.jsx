import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ProductCard from "../components/molecules/ProductCard";
import Button from "../components/atoms/Button";
import { useCategories, useProducts } from "../hooks/useProducts";

export default function Search() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const query = (params.get("q") ?? "").trim();
  const categoryId = params.get("category");
  const { data: products, isLoading, isError } = useProducts();
  const { data: categories } = useCategories();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-sm text-body">
        {t("home.loading")}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-sm text-error">
        {t("home.loadError")}
      </div>
    );
  }

  // Case-insensitive; every word typed must appear in the product title.
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = (products || []).filter((p) => {
    if (categoryId && String(p.category) !== categoryId) return false;
    const title = p.title.toLowerCase();
    return terms.every((term) => title.includes(term));
  });

  const categoryName = categories?.find((c) => String(c.id) === categoryId)?.name;
  const heading = query
    ? t("search.resultsFor", { query })
    : categoryId
      ? t("search.categoryResults", { name: categoryName ?? categoryId })
      : t("search.allProducts");

  return (
    <div className="max-w-7xl mx-auto px-4 py-10" data-testid="search-results">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold">{heading}</h1>
        <p className="text-sm text-body mt-1" role="status">
          {t("search.resultsCount", { total: results.length })}
        </p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-16" data-testid="search-no-results">
          <p className="text-body text-sm mb-6">
            {t("search.noResults", { query })}
          </p>
          <Button as={Link} to="/" variant="primary">
            {t("search.backHome")}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
