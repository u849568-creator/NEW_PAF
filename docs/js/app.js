import { createEmptyProduit } from "./domain/produit.model.js";

console.log("Produit vide :", createEmptyProduit());

function wireHeaderButtons() {
  document.getElementById("btnNewProduct")?.addEventListener("click", () => {
    window.location.href = "new_product.html";
  });

  document.getElementById("btnLogout")?.addEventListener("click", () => {
    // on branchera ton logout existant ensuite
    alert("TODO logout()");
  });
}

async function main() {
  wireHeaderButtons();
  await createEmptyProduit();
}

main().catch(err => {
  console.error(err);
  alert(err?.message ?? String(err));
});
