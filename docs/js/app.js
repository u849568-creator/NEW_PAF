import { renderProduitList } from "./ui/produit.list.js";
import { renderProduitDetail } from "./ui/produit.detail.js";
import { createEmptyProduit } from "./domain/produit.model.js";
import { showListView, showDetailView } from "./ui/navigation.js";

console.log("Produit vide :", createEmptyProduit());

function wireHeaderButtons() {
  // ➕ Ajouter un produit
  document.getElementById("btnNewProduct")?.addEventListener("click", (e) => {
    e.preventDefault();
    const produit = createEmptyProduit();
    renderProduitDetail(produit);
    showDetailView();
  });

  // ⬅ Retour à la liste
  document.getElementById("backToList")?.addEventListener("click", () => {
    showListView();
  });

  // Logout
  document.getElementById("btnLogout")?.addEventListener("click", () => {
    alert("TODO logout()");
  });
}

async function main() {
  wireHeaderButtons();
  await renderProduitList();
  showListView(); // état initial
}

main().catch(err => {
  console.error(err);
  alert(err?.message ?? String(err));
});
