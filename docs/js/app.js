import { renderProduitList } from "./ui/produit.list.js";
import { renderProduitDetail } from "./ui/produit.detail.js";
import { createEmptyProduit } from "./domain/produit.model.js";
import { showListView, showDetailView } from "./ui/navigation.js";
import { renderColumnSelector } from "./ui/column.selector.js";
import { renderTableHeader } from "./ui/table.header.js";

function wireHeaderButtons() {
  // ➕ Ajouter un produit
  const btnNewProduct = document.getElementById("btnNewProduct");
  if (btnNewProduct) {
    btnNewProduct.addEventListener("click", (e) => {
      e.preventDefault();
      const produit = createEmptyProduit();
      renderProduitDetail(produit);
      showDetailView();
    });
  }
  // ⬅ Retour à la liste
  const backToList = document.getElementById("backToList");
  if (backToList) {
    backToList.addEventListener("click", () => {
      showListView();
    });
  }
  // Logout
  const btnLogout = document.getElementById("btnLogout");
  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      alert("TODO logout()");
    });
  }
}

async function main() {
  // Boutons header (nouveau produit, retour, logout)
  wireHeaderButtons();

  // Génération dynamique du header de table
  const table = document.querySelector("table");
  renderTableHeader(table);

  // Sélecteur de colonnes (groupes)
  const selectorContainer = document.getElementById("column-selector");
  if (selectorContainer) {
    renderColumnSelector(selectorContainer);
  }

  // Chargement des produits
  await renderProduitList();

  // Vue initiale = liste
  showListView();
}

main().catch(err => {
  console.error(err);
  alert(err?.message ?? String(err));
  
});
