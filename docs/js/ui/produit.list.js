import { fetchLatestProduits } from "../data/produit.repo.js";
import { renderProduitDetail } from "./produit.detail.js";
import { normalizeProduit } from "../domain/produit.model.js";
import { showDetailView } from "./navigation.js";
import { COLUMN_GROUPS } from "../domain/columns.config.js";

export async function renderProduitList() {
  const table = document.querySelector("table");
  const tbody = document.getElementById("rows");
  tbody.innerHTML = "";

  const produits = await fetchLatestProduits(20);

  produits.forEach(p => {
    const tr = document.createElement("tr");
    tr.className = "expandable";
    tr.dataset.id = p.id;

    Object.values(COLUMN_GROUPS).forEach(group => {
      group.columns.forEach(col => {
        tr.appendChild(cell(p[col.key], col.key));
      });
    });

    tr.addEventListener("click", () => {
      const produit = normalizeProduit(p);
      renderProduitDetail(produit);
      showDetailView();
    });

    tbody.appendChild(tr);
  });
}

function cell(value, columnKey) {
  const td = document.createElement("td");
  td.textContent = value ?? "";
  td.dataset.column = columnKey;
  return td;
}
