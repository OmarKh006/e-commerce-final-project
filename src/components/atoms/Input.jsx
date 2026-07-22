export default function Input({
  label,
  error,
  variant = "boxed",
  className = "",
  id,
  ...props
}) {
  const base =
    "w-full text-sm outline-none transition-colors duration-150 placeholder:text-body/70";
  const variants = {
    underline: "bg-transparent border-b border-line focus:border-ink py-2",
    boxed:
      "bg-input-bg border border-transparent focus:border-ink rounded-sm px-4 py-3",
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-xs text-body mb-1.5">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`${base} ${variants[variant]} ${error ? "border-error" : ""} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
