export default function PaymentMethodOption({ label, icons, selected, onSelect, name = 'payment' }) {
  return (
    <label className="flex items-center justify-between cursor-pointer py-2">
      <span className="flex items-center gap-3">
        <input
          type="radio"
          name={name}
          checked={selected}
          onChange={onSelect}
          className="w-4 h-4 accent-primary cursor-pointer"
        />
        <span className="text-sm text-ink">{label}</span>
      </span>
      {icons && (
        <span className="flex items-center gap-2">
          {icons.map((Icon, i) => (
            <Icon key={i} size={22} />
          ))}
        </span>
      )}
    </label>
  )
}
