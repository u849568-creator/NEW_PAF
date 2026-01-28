import { renderProduitList } from "./ui/produit.list.js";
import { createEmptyProduit } from "./domain/produit.model.js";
import { showListView } from "./ui/navigation.js";

console.log("Produit vide :", createEmptyProduit());

function wireHeaderButtons() {
  // Nouveau produit
  document.getElementById("btnNewProduct")?.addEventListener("click", () => {
    window.location.href = "new_product.html";
  });

  // Retour à la liste
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
