/**
 * @param {HTMLElement} container
 * @param {Object} pafModel   // structure issue de buildPafModel()
 * @param {Array} annees      // [{ id, label }]
 * @param {Array} reseaux     // [{ id, label }]
 * @param {"edit"|"create"} mode
 */
export function renderPafSection(container, pafModel, annees, reseaux, mode = "edit") {
  if (!container) return;
  container.innerHTML = "";

  const disabled = mode === "read" ? "disabled" : "";

  // ---------- Référencement ----------
  const refTable = document.createElement("table");
  refTable.innerHTML = `
    <tr>
      <th>Année</th>
      ${reseaux.map(r => `<th>${r.label}</th>`).join("")}
    </tr>
    ${annees.map(a => `
      <tr>
        <td><strong>${a.label}</strong></td>
        ${reseaux.map(r => {
          const cell = pafModel?.[a.id]?.[r.id];
          const checked = cell?.referencement ? "checked" : "";
          return `
            <td>
              <input type="checkbox" ${checked} ${disabled}
                data-annee="${a.id}"
                data-reseau="${r.id}"
                data-type="referencement"
              >
            </td>
          `;
        }).join("")}
      </tr>
    `).join("")}
  `;

  // ---------- Diffusion ----------
  const difTable = document.createElement("table");
  difTable.innerHTML = `
    <tr>
      <th>Année</th>
      ${reseaux.map(r => `<th>${r.label}</th>`).join("")}
    </tr>
    ${annees.map(a => `
      <tr>
        <td><strong>${a.label}</strong></td>
        ${reseaux.map(r => {
          const cell = pafModel?.[a.id]?.[r.id];
          const value = cell?.modulation ?? "";
          return `
            <td>
              <textarea rows="2"
                ${disabled}
                data-annee="${a.id}"
                data-reseau="${r.id}"
                data-type="diffusion"
              >${escapeHtml(value)}</textarea>
            </td>
          `;
        }).join("")}
      </tr>
    `).join("")}
  `;

  container.appendChild(sectionBlock("Référencement", refTable));
  container.appendChild(sectionBlock("Diffusion", difTable));

  // ---------- Local update du modèle ----------
  container.querySelectorAll("input[type=checkbox]").forEach(input => {
    input.addEventListener("change", () => {
      const { annee, reseau } = input.dataset;
      ensureCell(pafModel, annee, reseau);
      pafModel[annee][reseau].referencement = input.checked;
    });
  });

  container.querySelectorAll("textarea").forEach(textarea => {
    textarea.addEventListener("input", () => {
      const { annee, reseau } = textarea.dataset;
      ensureCell(pafModel, annee, reseau);
      pafModel[annee][reseau].modulation = textarea.value;
    });
  });
}

/* ---------- Helpers ---------- */

function ensureCell(model, annee, reseau) {
  if (!model[annee]) model[annee] = {};
  if (!model[annee][reseau]) {
    model[annee][reseau] = { referencement: false, modulation: "" };
  }
}

function sectionBlock(title, content) {
  const wrapper = document.createElement("div");
  wrapper.className = "section";
  wrapper.innerHTML = `
    <div class="section-header">${title}</div>
    <div class="section-content"></div>
  `;
  wrapper.querySelector(".section-content").appendChild(content);
  return wrapper;
}

function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
