export default function Textarea({ label, error, rows = 6, className = '', id, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-xs text-body mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`w-full text-sm outline-none bg-input-bg border border-transparent focus:border-ink rounded-sm px-4 py-3 resize-none placeholder:text-body/70 ${error ? 'border-error' : ''} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  )
}
