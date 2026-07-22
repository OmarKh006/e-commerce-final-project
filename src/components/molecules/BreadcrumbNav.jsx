import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
export default function BreadcrumbNav({ items }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-body">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-2">
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-ink" : ""}>{item.label}</span>
            )}
            {!isLast && <FiChevronRight size={12} />}
          </span>
        );
      })}
    </nav>
  );
}
