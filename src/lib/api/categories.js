import { supabase } from "../supabaseClient";

export async function fetchCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw error;
  return (data || []).map((row) => ({
    id: row.id,
    name: row.name,
    icon: row.icon,
  }));
}
