import { db } from "../data/supabase.js";
import { resetPending } from "../core/state.js";

export async function saveProduitPending(pendingProduit) {
  const rows = Object.entries(pendingProduit).map(([id, fields]) => ({
    id: Number(id),
    ...fields
  }));

  if (!rows.length) return;

  const { error } = await db
    .from("PRODUIT")
    .upsert(rows, { onConflict: "id" });

  if (error) throw error;

  resetPending();
}
