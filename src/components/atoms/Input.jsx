import { useId } from "react";

export default function Input({
  label,
  error,
  variant = "boxed",
  className = "",
  id,
  ...props
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const errorId = `${inputId}-error`;
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
        <label htmlFor={inputId} className="block text-xs text-body mb-1.5">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`${base} ${variants[variant]} ${error ? "border-error" : ""} ${className}`}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  );
}
