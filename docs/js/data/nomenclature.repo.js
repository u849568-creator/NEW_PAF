import { db } from "./supabase.js";

export async function fetchReferentiel(tableName) {
  const { data, error } = await db
    .from(tableName)
    .select("id, LIBELLE")
    .order("LIBELLE");

  if (error) throw error;
  return data ?? [];
}
