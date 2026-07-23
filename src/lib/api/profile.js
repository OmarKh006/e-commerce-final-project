import { supabase } from "../supabaseClient";

function mapProfile(row) {
  if (!row) return null;
  return {
    id: row.id,
    firstName: row.first_name || "",
    lastName: row.last_name || "",
    email: row.email || "",
    address: row.address || "",
  };
}

export async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  return mapProfile(data);
}

export async function updateProfile(userId, { firstName, lastName, address }) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      first_name: firstName,
      last_name: lastName,
      address,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return mapProfile(data);
}
