import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  // Fail soft: the UI renders its error states instead of a blank screen.
  console.error(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. " +
      "Copy .env.example to .env and fill in your project values.",
  );
}

// Placeholder values are only used when the env vars are missing; every request
// made with them fails, so nothing is faked.
export const supabase = createClient(
  supabaseUrl || "http://localhost:54321",
  supabaseAnonKey || "missing-anon-key",
);
