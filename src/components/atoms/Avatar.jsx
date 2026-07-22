import { FiUser } from 'react-icons/fi'

export default function Avatar({ src, name, size = 36, className = '' }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name || 'avatar'}
        style={{ width: size, height: size }}
        className={`rounded-full object-cover ${className}`}
      />
    )
  }

  const initials = name
    ? name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
    : null

  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium ${className}`}
    >
      {initials || <FiUser size={size * 0.5} />}
    </div>
  )
}
