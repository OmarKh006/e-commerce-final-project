import { Link } from 'react-router-dom'

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`font-heading text-2xl font-bold text-ink tracking-tight ${className}`}>
      Exclusive
    </Link>
  )
}
