import { db } from "./supabase.js";

export async function fetchPafByProduit(produitId) {
  const { data, error } = await db
    .from("PAF")
    .select(`
      annee_id,
      reseau_id,
      REFERENCEMENT,
      MODULATION,
      RESEAU:reseau_id ( RESEAU ),
      ANNEE:annee_id ( ANNEE )
    `)
    .eq("produit_id", produitId);

  if (error) throw error;
  return data ?? [];
}
