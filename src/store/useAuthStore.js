import { create } from "zustand";
import { supabase } from "../lib/supabaseClient";
import { useCartStore } from "./useCartStore";
import { useWishlistStore } from "./useWishlistStore";

export const useAuthStore = create(() => ({
  user: null,
  loading: true,

  signup: async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) return { success: false, error };

    return { success: true, data, needsEmailConfirmation: !data.session };
  },

  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { success: false, error };
    return { success: true, data };
  },

  logout: async () => {
    await supabase.auth.signOut();
    useCartStore.getState().clear();
    useWishlistStore.getState().clear();
  },

  updatePassword: async (newPassword) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return { success: false, error };
    return { success: true };
  },
}));
