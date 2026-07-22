import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      productIds: [],

      isWishlisted: (id) => get().productIds.includes(id),

      toggle: (id) =>
        set((state) => ({
          productIds: state.productIds.includes(id)
            ? state.productIds.filter((x) => x !== id)
            : [...state.productIds, id],
        })),

      remove: (id) =>
        set((state) => ({ productIds: state.productIds.filter((x) => x !== id) })),

      clear: () => set({ productIds: [] }),
    }),
    { name: 'exclusive-wishlist' }
  )
)
