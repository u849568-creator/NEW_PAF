import { renderLogistiqueSection } from "./logistique.section.js";
import { state, hasPending, resetPending } from "../core/state.js";
import { saveProduitPending } from "../domain/save.service.js";
import { renderPafSection } from "./paf.section.js";
import { createEmptyPaf } from "../domain/paf.model.js";

/**
 * @param {Object} produit
 * @param {"edit"|"create"} mode
 */
export function renderProduitDetail(produit, mode = "edit") {
  state.currentProduit = produit;

  const container = document.getElementById("product-detail");
  if (!container) {
    console.error("Container #product-detail introuvable");
    return;
  }

  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "product-detail";

  wrapper.innerHTML = `
    <h3>Détail produit</h3>

    <div class="section">
      <div class="section-header">Logistique</div>
      <div class="section-content" id="logistique-section"></div>
    </div>

    <div class="actions">
      <span id="pendingInfo" class="badge"></span>
      <button id="btnSave">Valider</button>
      <button class="secondary" id="btnCancel">Annuler</button>
    </div>
  `;

  container.appendChild(wrapper);

  // --- Render Logistique ---
  const logistiqueContainer = document.getElementById("logistique-section");
  renderLogistiqueSection(logistiqueContainer, produit, mode);

  // --- Pending UI ---
  const pendingInfo = document.getElementById("pendingInfo");
  const btnSave = document.getElementById("btnSave");
  const btnCancel = document.getElementById("btnCancel");

  function refreshPendingInfo() {
    const has = hasPending();
    pendingInfo.textContent = has ? "Modifications en attente" : "";
    btnSave.disabled = !has;
  }

  btnSave.onclick = async () => {
    try {
      await saveProduitPending(state.pending.PRODUIT);
      refreshPendingInfo();
      alert("Changements enregistrés");
    } catch (e) {
      console.error(e);
      alert(e.message || "Erreur lors de la sauvegarde");
    }
  };

  btnCancel.onclick = () => {
    resetPending();
    refreshPendingInfo();
    alert("Modifications annulées (recharger le produit)");
  };

  refreshPendingInfo();
}
