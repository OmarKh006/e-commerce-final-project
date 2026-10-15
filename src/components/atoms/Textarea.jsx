import { useId } from 'react'

export default function Textarea({ label, error, rows = 6, className = '', id, ...props }) {
  const autoId = useId()
  const fieldId = id || autoId
  const errorId = `${fieldId}-error`

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={fieldId} className="block text-xs text-body mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={fieldId}
        rows={rows}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full text-sm outline-none bg-input-bg border border-transparent focus:border-ink rounded-sm px-4 py-3 resize-none placeholder:text-body/70 ${error ? 'border-error' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-error">
          {error}
        </p>
      )}
    </div>
  )
}
