import { db } from "./supabase.js";

export async function fetchLatestProduits(limit = 20) {
  const { data, error } = await db
    .from("PRODUIT")
    .select('id,"EAN","LIBELLE","CODE_S"')
    .order("id", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data ?? [];
}
