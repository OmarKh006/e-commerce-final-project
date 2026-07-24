import { supabase } from "./supabaseClient";
import { useAuthStore } from "../hooks/useAuthStore";

export function initAuthListener() {
  supabase.auth.getSession().then(({ data: { session } }) => {
    useAuthStore.setState({ user: session?.user ?? null, loading: false });
  });

  const { data: subscription } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      useAuthStore.setState({ user: session?.user ?? null, loading: false });
    },
  );

  return () => subscription.subscription.unsubscribe();
}
