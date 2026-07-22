import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // { name, email } | null

      // TODO: replace with supabase.auth.signInWithPassword(...)
      login: (identifier) =>
        set({
          user: {
            name: identifier.includes('@') ? identifier.split('@')[0] : 'Md Rimel',
            email: identifier.includes('@') ? identifier : 'rimel1111@gmail.com',
          },
        }),

      // TODO: replace with supabase.auth.signUp(...)
      signup: (name, identifier) =>
        set({
          user: {
            name,
            email: identifier,
          },
        }),

      // TODO: replace with supabase.auth.signOut()
      logout: () => set({ user: null }),
    }),
    { name: 'exclusive-auth' }
  )
)
