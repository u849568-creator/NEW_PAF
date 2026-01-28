export const state = {
  currentProduit: null,

  pending: {
    PRODUIT: {} // { [produitId]: { champ: valeur } }
  }
};

export function resetPending() {
  state.pending.PRODUIT = {};
}

export function hasPending() {
  return Object.keys(state.pending.PRODUIT).length > 0;
}
