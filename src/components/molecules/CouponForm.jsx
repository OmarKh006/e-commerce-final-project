import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../atoms/Button'

// Not a <form>: it is rendered inside the checkout <form>, and nested forms are invalid HTML.
export default function CouponForm({ onApply }) {
  const { t } = useTranslation()
  const [code, setCode] = useState('')
  const [feedback, setFeedback] = useState(null)

  const apply = () => {
    const result = onApply?.(code)
    if (!result) return
    if (result.cleared) setFeedback({ ok: true, text: t('cart.couponRemoved') })
    else if (result.ok) setFeedback({ ok: true, text: t('cart.couponApplied', { code: result.code, pct: result.pct }) })
    else setFeedback({ ok: false, text: t('cart.couponInvalid') })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      apply()
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={code}
          aria-label={t('cart.couponPlaceholder')}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('cart.couponPlaceholder')}
          className="flex-1 min-w-0 border border-line rounded-sm px-4 py-3 text-sm outline-none focus:border-ink placeholder:text-body/70"
        />
        <Button type="button" variant="primary" onClick={apply}>
          {t('cart.applyCoupon')}
        </Button>
      </div>
      {feedback && (
        <p role="status" className={`mt-2 text-xs ${feedback.ok ? 'text-success' : 'text-error'}`}>
          {feedback.text}
        </p>
      )}
    </div>
  )
}
