export function ColorSwatchPicker({ colors, selected, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {colors.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          aria-label={`Select color ${c}`}
          className={`w-6 h-6 rounded-full border-2 cursor-pointer ${selected === c ? 'border-ink' : 'border-transparent'}`}
          style={{ boxShadow: `0 0 0 1px ${c === '#FFFFFF' ? '#E4E4E4' : c}` }}
        >
          <span className="block w-full h-full rounded-full" style={{ backgroundColor: c }} />
        </button>
      ))}
    </div>
  )
}

export function SizePicker({ sizes, selected, onChange }) {
  return (
    <div className="flex items-center gap-2">
      {sizes.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={`w-9 h-9 flex items-center justify-center text-sm rounded-sm border cursor-pointer transition-colors
            ${selected === s ? 'bg-primary text-white border-primary' : 'border-line text-ink hover:border-ink'}`}
        >
          {s}
        </button>
      ))}
    </div>
  )
}
