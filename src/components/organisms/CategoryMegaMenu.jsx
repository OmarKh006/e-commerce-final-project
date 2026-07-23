import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useProducts";

export default function CategoryMegaMenu({ open, onClose }) {
  const { data: categories = [] } = useCategories();

  if (!open) return null;

  return (
    <div
      className="absolute top-full left-0 w-64 bg-white border border-line shadow-card-hover z-30"
      onMouseLeave={onClose}
    >
      <ul className="py-2">
        {categories.map((c) => (
          <li key={c.id}>
            <Link
              to="#"
              className="flex items-center justify-between px-4 py-2.5 text-sm text-ink hover:bg-secondary-gray hover:text-primary"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
