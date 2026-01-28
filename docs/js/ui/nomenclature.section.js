import { fetchReferentiel } from "../data/nomenclature.repo.js";

/**
 * @param {HTMLElement} container
 * @param {Object} model
 * @param {"edit"|"create"} mode
 */
export async function renderNomenclatureSection(container, model, mode = "edit") {
  if (!container) return;

  const disabled = mode === "read";

  container.innerHTML = `
    <div class="section">
      <div class="section-header">Nomenclature</div>
      <div class="section-content">

        <!-- CIRCANA -->
        <div class="nomenclature-block full">
          <div class="nomenclature-title">CIRCANA</div>
          <div class="nomenclature-fields horizontal">
            <div data-select="MARCHE_CIRCANA_ID"></div>
            <div data-select="RAYON_CIRCANA_ID"></div>
            <div data-select="CATEGORIE_CIRCANA_ID"></div>
            <div data-select="TYPE_CIRCANA_ID"></div>
            <div data-select="SS_TYPE_CIRCANA_ID"></div>
          </div>
        </div>

        <div class="nomenclature-row">

          <!-- MONOPRIX -->
          <div class="nomenclature-block">
            <div class="nomenclature-title">MONOPRIX</div>
            <div data-select="RAY_MON_ID"></div>
            <div data-select="UG_MON_ID"></div>
          </div>

          <!-- FRANPRIX -->
          <div class="nomenclature-block">
            <div class="nomenclature-title">FRANPRIX</div>
            <div data-select="UNIVERS_FPX_ID"></div>
            <div data-select="RAY_FPX_ID"></div>
            <div data-select="SS_GROUPE_FPX_ID"></div>
          </div>

        </div>
      </div>
    </div>
  `;

  // ---- CIRCANA ----
  await renderSelect(container, "MARCHE_CIRCANA_ID", "MARCHE_CIRCANA", model, disabled);
  await renderSelect(container, "RAYON_CIRCANA_ID", "RAYON_CIRCANA", model, disabled);
  await renderSelect(container, "CATEGORIE_CIRCANA_ID", "CATEGORIE_CIRCANA", model, disabled);
  await renderSelect(container, "TYPE_CIRCANA_ID", "TYPE_CIRCANA", model, disabled);
  await renderSelect(container, "SS_TYPE_CIRCANA_ID", "SS_TYPE_CIRCANA", model, disabled);

  // ---- MONOPRIX ----
  await renderSelect(container, "RAY_MON_ID", "RAY_MON", model, disabled);
  await renderSelect(container, "UG_MON_ID", "UG_MON", model, disabled);

  // ---- FRANPRIX ----
  await renderSelect(container, "UNIVERS_FPX_ID", "UNIVERS_FPX", model, disabled);
  await renderSelect(container, "RAY_FPX_ID", "RAY_FPX", model, disabled);
  await renderSelect(container, "SS_GROUPE_FPX_ID", "SS_GROUPE_FPX", model, disabled);
}

/* ---------- Helpers ---------- */

async function renderSelect(container, field, table, model, disabled) {
  const target = container.querySelector(`[data-select="${field}"]`);
  if (!target) return;

  const label = document.createElement("label");
  label.textContent = labelFromField(field);

  const select = document.createElement("select");
  select.disabled = disabled;

  select.innerHTML = `<option value="">—</option>`;

  const rows = await fetchReferentiel(table);

  rows.forEach(r => {
    const opt = document.createElement("option");
    opt.value = r.id;
    opt.textContent = r.LIBELLE;
    select.appendChild(opt);
  });

  // pré-sélection si valeur existante
  if (model[field]) {
    select.value = String(model[field]);
  }

  select.addEventListener("change", () => {
    model[field] = select.value ? Number(select.value) : null;
  });

  target.appendChild(label);
  target.appendChild(select);
}

function labelFromField(field) {
  return field
    .replace("_ID", "")
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/(^|\s)\S/g, l => l.toUpperCase());
}
