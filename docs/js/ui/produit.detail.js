import { renderLogistiqueSection } from "./logistique.section.js";

/**
 * @param {Object} produit
 * @param {"edit"|"create"} mode
 */
export function renderProduitDetail(produit, mode = "edit") {
  const container = document.getElementById("product-detail");
  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "product-detail";

  wrapper.innerHTML = `
    <h3>Détail produit</h3>

    <div class="section">
      <div class="section-header">Logistique</div>
      <div class="section-content" id="logistique-section"></div>
    </div>
  `;

  container.appendChild(wrapper);

  const logistiqueContainer = document.getElementById("logistique-section");
  renderLogistiqueSection(logistiqueContainer, produit, mode);
}
