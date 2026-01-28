import { renderProduitList } from "./ui/produit.list.js";
import { renderProduitDetail } from "./ui/produit.detail.js";
import { createEmptyProduit } from "./domain/produit.model.js";
import { showListView, showDetailView } from "./ui/navigation.js";

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
  wireHeaderButtons();
  await renderProduitList();
  showListView(); // état initial
}

main().catch(err => {
  console.error(err);
  alert(err?.message ?? String(err));
});
