export default function Checkbox({ label, checked, onChange, id, className = '' }) {
  return (
    <label htmlFor={id} className={`inline-flex items-center gap-2 text-sm text-ink cursor-pointer ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-primary cursor-pointer"
      />
      {label}
    </label>
  )
}
