import { fetchLatestProduits } from "../data/produit.repo.js";
import { renderProduitDetail } from "./produit.detail.js";
import { normalizeProduit } from "../domain/produit.model.js";
import { showDetailView } from "./navigation.js";

export async function renderProduitList() {
  const rows = document.getElementById("rows");
  rows.innerHTML = "";

  const produits = await fetchLatestProduits(20);

  produits.forEach(p => {
    const tr = document.createElement("tr");
    tr.className = "expandable";
    tr.dataset.id = p.id;

    const tdEan = document.createElement("td");
    tdEan.textContent = p.EAN ?? "";

    const tdLib = document.createElement("td");
    tdLib.textContent = p.LIBELLE ?? "";

    const tdCode = document.createElement("td");
    tdCode.textContent = p.CODE_S ?? "";

    tr.append(tdEan, tdLib, tdCode);

    // on câblera l’ouverture détails à l’étape 2
tr.addEventListener("click", () => {
  const produit = normalizeProduit(p);
  renderProduitDetail(produit, "edit");
  showDetailView();

});

    rows.appendChild(tr);
  });
}
