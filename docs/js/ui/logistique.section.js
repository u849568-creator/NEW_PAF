import { state } from "../core/state.js";

/**
 * @param {HTMLElement} container
 * @param {Object} produit
 * @param {"edit"|"create"} mode
 */
export function renderLogistiqueSection(container, produit, mode = "edit") {
  if (!container) return;

  container.innerHTML = "";

  const disabled = mode === "read" ? "disabled" : "";

  const table = document.createElement("table");
  table.innerHTML = `
    <tr>
      <th></th>
      <th>Monoprix</th>
      <th>Franprix</th>
      <th>Casino</th>
    </tr>
    <tr>
      <th>Entrepôt</th>
      <td><input type="checkbox" ${disabled} data-field="LIVRAISON_ENTREPOT_MONOPRIX"></td>
      <td><input type="checkbox" ${disabled} data-field="LIVRAISON_ENTREPOT_FRANPRIX"></td>
      <td><input type="checkbox" ${disabled} data-field="LIVRAISON_ENTREPOT_CASINO"></td>
    </tr>
    <tr>
      <th>Directe</th>
      <td><input type="checkbox" ${disabled} data-field="LIVRAISON_DIRECTE_MONOPRIX"></td>
      <td><input type="checkbox" ${disabled} data-field="LIVRAISON_DIRECTE_FRANPRIX"></td>
      <td><input type="checkbox" ${disabled} data-field="LIVRAISON_DIRECTE_CASINO"></td>
    </tr>
  `;

  // Initialisation + gestion du pending
  table.querySelectorAll('input[type="checkbox"]').forEach(input => {
    const field = input.dataset.field;
    input.checked = !!produit[field];

    input.addEventListener("change", () => {
      const value = input.checked;
      produit[field] = value;

      // init pending pour ce produit
      if (!state.pending.PRODUIT[produit.id]) {
        state.pending.PRODUIT[produit.id] = {};
      }

      state.pending.PRODUIT[produit.id][field] = value;
    });
  });

  container.appendChild(table);
}
