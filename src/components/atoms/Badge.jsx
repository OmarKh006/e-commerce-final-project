const VARIANTS = {
  sale: 'bg-primary text-white',
  new: 'bg-success text-white',
  outOfStock: 'bg-body text-white',
}

export default function Badge({ children, variant = 'sale', className = '' }) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-sm text-xs font-medium ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
