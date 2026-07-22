const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  black: 'bg-black text-white hover:bg-ink',
  outline: 'bg-transparent text-ink border border-line hover:border-ink',
  text: 'bg-transparent text-ink hover:text-primary px-0',
}

const SIZES = {
  sm: 'text-sm px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-base px-12 py-4',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = 'button',
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
