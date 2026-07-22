import { useState } from 'react'
import Button from '../atoms/Button'

export default function CouponForm({ onApply }) {
  const [code, setCode] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onApply?.(code)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Coupon Code"
        className="flex-1 border border-line rounded-sm px-4 py-3 text-sm outline-none focus:border-ink placeholder:text-body/70"
      />
      <Button type="submit" variant="primary">Apply Coupon</Button>
    </form>
  )
}
