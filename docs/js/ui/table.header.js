import { COLUMN_GROUPS } from "../domain/columns.config.js";

export function renderTableHeader(table) {
  const thead = table.querySelector("thead") || table.createTHead();
  thead.innerHTML = "";

  const tr = document.createElement("tr");

  Object.values(COLUMN_GROUPS).forEach(group => {
    group.columns.forEach(col => {
      const th = document.createElement("th");
      th.textContent = col.label;
      th.dataset.column = col.key; // important pour le masquage
      tr.appendChild(th);
    });
  });

  thead.appendChild(tr);
}
