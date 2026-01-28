/**
 * Structure PAF interne :
 * {
 *   [anneeId]: {
 *     [reseauId]: {
 *       referencement: boolean,
 *       modulation: string
 *     }
 *   }
 * }
 */

export function createEmptyPaf() {
  return {};
}

/**
 * Transforme les lignes PAF Supabase
 * en structure exploitable par l’UI
 */
export function buildPafModel(rows = []) {
  const model = createEmptyPaf();

  rows.forEach(r => {
    if (!model[r.annee_id]) model[r.annee_id] = {};
    if (!model[r.annee_id][r.reseau_id]) {
      model[r.annee_id][r.reseau_id] = {
        referencement: false,
        modulation: ""
      };
    }

    model[r.annee_id][r.reseau_id] = {
      referencement: !!r.REFERENCEMENT,
      modulation: r.MODULATION ?? ""
    };
  });

  return model;
}

/**
 * Génère un payload DB depuis le modèle interne
 */
export function pafModelToRows(model, produitId) {
  const rows = [];

  Object.entries(model).forEach(([anneeId, reseaux]) => {
    Object.entries(reseaux).forEach(([reseauId, values]) => {
      rows.push({
        produit_id: produitId,
        annee_id: Number(anneeId),
        reseau_id: Number(reseauId),
        REFERENCEMENT: !!values.referencement,
        MODULATION: values.modulation ?? ""
      });
    });
  });

  return rows;
}
