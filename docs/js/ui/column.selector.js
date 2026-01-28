import { COLUMN_GROUPS } from "../domain/columns.config.js";

export function renderColumnSelector(container) {
  container.innerHTML = "";

  Object.entries(COLUMN_GROUPS).forEach(([key, group]) => {
    const label = document.createElement("label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;

    checkbox.addEventListener("change", () => {
      toggleGroup(group.columns, checkbox.checked);
    });

    label.appendChild(checkbox);
    label.append(" " + group.label);

    container.appendChild(label);
    container.appendChild(document.createElement("br"));
  });
}

function toggleGroup(columns, visible) {
  columns.forEach(col => {
    document
      .querySelectorAll(`[data-column="${col}"]`)
      .forEach(el => {
        el.style.display = visible ? "" : "none";
      });
  });
}
