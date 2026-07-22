import { create } from 'zustand'
import { persist } from 'zustand/middleware'
function lineKey(productId, color, size) {
  return `${productId}:${color ?? ''}:${size ?? ''}`
}

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // { key, productId, product, qty, color, size }
      couponCode: null,

      addItem: (product, qty = 1, color = null, size = null) => {
        const key = lineKey(product.id, color, size)
        set((state) => {
          const existing = state.items.find((i) => i.key === key)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, qty: i.qty + qty } : i
              ),
            }
          }
          return {
            items: [...state.items, { key, productId: product.id, product, qty, color, size }],
          }
        })
      },

      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),

      updateQty: (key, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        })),

      applyCoupon: (code) => set({ couponCode: code || null }),

      clear: () => set({ items: [], couponCode: null }),

      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),

      subtotal: () => get().items.reduce((sum, i) => sum + i.product.price * i.qty, 0),
    }),
    { name: 'exclusive-cart' }
  )
)
