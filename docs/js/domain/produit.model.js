/**
 * Modèle Produit (édition / création)
 */
export function createEmptyProduit() {
  return {
    id: null,

    // Identité
    EAN: "",
    LIBELLE: "",
    CODE_S: "",

    // Logistique
    LIVRAISON_ENTREPOT_MONOPRIX: false,
    LIVRAISON_DIRECTE_MONOPRIX: false,

    LIVRAISON_ENTREPOT_FRANPRIX: false,
    LIVRAISON_DIRECTE_FRANPRIX: false,

    LIVRAISON_ENTREPOT_CASINO: false,
    LIVRAISON_DIRECTE_CASINO: false
  };
}

/**
 * Normalise un produit venant de la DB
 * (sécurise les undefined / null)
 */
export function normalizeProduit(raw = {}) {
  const empty = createEmptyProduit();

  return {
    ...empty,
    ...raw,
    id: raw.id ?? empty.id
  };
}
