export default function IconButton({
  icon: Icon,
  active = false,
  size = 18,
  className = '',
  label,
  ...props
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-card hover:shadow-card-hover transition-shadow duration-200 cursor-pointer ${className}`}
      {...props}
    >
      <Icon size={size} className={active ? 'text-primary fill-primary' : 'text-ink'} />
    </button>
  )
}
