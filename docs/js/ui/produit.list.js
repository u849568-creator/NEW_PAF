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

    // ===== Colonnes identité =====
    tr.appendChild(cell(p.EAN, "EAN"));
    tr.appendChild(cell(p.LIBELLE, "LIBELLE"));
    tr.appendChild(cell(p.CODE_S, "CODE_S"));

    // ===== Exemples nomenclature (si dispo plus tard) =====
    tr.appendChild(cell(p.RAY_MON ?? "", "RAY_MON"));
    tr.appendChild(cell(p.UG_MON ?? "", "UG_MON"));

    tr.appendChild(cell(p.UNIVERS_FPX ?? "", "UNIVERS_FPX"));
    tr.appendChild(cell(p.RAY_FPX ?? "", "RAY_FPX"));
    tr.appendChild(cell(p.SS_GROUPE_FPX ?? "", "SS_GROUPE_FPX"));

    tr.appendChild(cell(p.UE_CASINO ?? "", "UE_CASINO"));
    tr.appendChild(cell(p.FAMILLE_CASINO ?? "", "FAMILLE_CASINO"));

    // ===== Navigation vers le détail =====
    tr.addEventListener("click", () => {
      const produit = normalizeProduit(p);
      renderProduitDetail(produit);
      showDetailView();
    });

    rows.appendChild(tr);
  });
}

/* ---------- helpers ---------- */

function cell(value, columnKey) {
  const td = document.createElement("td");
  td.textContent = value ?? "";
  td.dataset.column = columnKey;
  return td;
}
