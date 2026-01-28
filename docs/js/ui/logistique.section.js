/**
 * @param {HTMLElement} container
 * @param {Object} produit
 * @param {"edit"|"create"} mode
 */
export function renderLogistiqueSection(container, produit, mode = "edit") {
  container.innerHTML = "";

  const disabled = mode === "read" ? "disabled" : "";

  const table = document.createElement("table");
  table.innerHTML = `
    <tr><th></th><th>Monoprix</th><th>Franprix</th><th>Casino</th></tr>
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

  // init values
  table.querySelectorAll("input[type=checkbox]").forEach(input => {
    const field = input.dataset.field;
    input.checked = !!produit[field];

    // update local model (pas encore de pending)
    input.addEventListener("change", () => {
      produit[field] = input.checked;
    });
  });

  container.appendChild(table);
}
