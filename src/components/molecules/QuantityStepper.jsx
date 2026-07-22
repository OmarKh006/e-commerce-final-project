import { FiMinus, FiPlus } from 'react-icons/fi'

export default function QuantityStepper({ value, onChange, min = 1, max = 99, size = 'md' }) {
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))

  const heights = { sm: 'h-9', md: 'h-11' }

  return (
    <div className={`inline-flex items-center border border-line rounded-sm ${heights[size]}`}>
      <button
        type="button"
        onClick={dec}
        className="w-9 h-full flex items-center justify-center text-body hover:text-ink cursor-pointer"
        aria-label="Decrease quantity"
      >
        <FiMinus size={14} />
      </button>
      <span className="w-10 text-center text-sm select-none">{value}</span>
      <button
        type="button"
        onClick={inc}
        className="w-9 h-full flex items-center justify-center text-white bg-primary hover:bg-primary-hover rounded-r-sm cursor-pointer"
        aria-label="Increase quantity"
      >
        <FiPlus size={14} />
      </button>
    </div>
  )
}
