import { renderProduitList } from "./ui/produit.list.js";

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
  await renderProduitList();
}

main().catch(err => {
  console.error(err);
  alert(err?.message ?? String(err));
});
