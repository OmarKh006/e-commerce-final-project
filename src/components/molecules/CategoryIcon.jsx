import * as FiIcons from "react-icons/fi";

export default function CategoryIcon({ category, active = false, onClick }) {
  const Icon = FiIcons[category.icon] || FiIcons.FiBox;

  return (
    <button
      type="button"
      onClick={() => onClick?.(category.id)}
      className={`flex flex-col items-center justify-center gap-3 w-full aspect-4/3 border rounded-sm cursor-pointer transition-colors duration-150
        ${active ? "bg-primary text-white border-primary" : "border-line text-ink hover:border-primary hover:text-primary"}`}
    >
      <Icon size={28} />
      <span className="text-sm">{category.name}</span>
    </button>
  );
}
