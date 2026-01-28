/**
 * @param {HTMLElement} container
 * @param {Object} model
 * @param {"edit"|"create"} mode
 */
export function renderNomenclatureSection(container, model, mode = "edit") {
  if (!container) return;

  const disabled = mode === "read" ? "disabled" : "";

  container.innerHTML = `
    <div class="section">
      <div class="section-header">Nomenclature</div>
      <div class="section-content">

        <!-- CIRCANA -->
        <div class="nomenclature-block full">
          <div class="nomenclature-title">CIRCANA</div>
          <div class="nomenclature-fields horizontal">
            ${input("Marché", "CIRCANA.MARCHE", model, disabled)}
            ${input("Rayon", "CIRCANA.RAYON", model, disabled)}
            ${input("Groupe famille", "CIRCANA.GROUPE_FAMILLE", model, disabled)}
            ${input("Catégorie", "CIRCANA.CATEGORIE", model, disabled)}
            ${input("Type", "CIRCANA.TYPE", model, disabled)}
            ${input("Sous-type", "CIRCANA.SS_TYPE", model, disabled)}
          </div>
          <div class="muted" style="margin-top:8px;">
            (UI seulement pour l’instant — cascade et sauvegarde à venir)
          </div>
        </div>

        <div class="nomenclature-row">

          <!-- MONOPRIX -->
          <div class="nomenclature-block">
            <div class="nomenclature-title">MONOPRIX</div>
            ${input("Rayon", "MONOPRIX.RAYON", model, disabled)}
            ${input("UG", "MONOPRIX.UG", model, disabled)}
          </div>

          <!-- FRANPRIX -->
          <div class="nomenclature-block">
            <div class="nomenclature-title">FRANPRIX</div>
            ${input("Univers", "FRANPRIX.UNIVERS", model, disabled)}
            ${input("Rayon", "FRANPRIX.RAYON", model, disabled)}
            ${input("Sous-groupe", "FRANPRIX.SS_GROUPE", model, disabled)}
          </div>

          <!-- CASINO -->
          <div class="nomenclature-block">
            <div class="nomenclature-title">CASINO</div>
            ${input("UE", "CASINO.UE", model, disabled)}
            ${input("Famille", "CASINO.FAMILLE", model, disabled)}
          </div>

        </div>
      </div>
    </div>
  `;

  // Bind inputs → modèle
  container.querySelectorAll("input[data-path]").forEach(inputEl => {
    inputEl.addEventListener("input", () => {
      setValue(model, inputEl.dataset.path, inputEl.value);
    });
  });
}

/* ---------- helpers ---------- */

function input(label, path, model, disabled) {
  const value = getValue(model, path) ?? "";
  return `
    <input
      type="text"
      placeholder="${label}"
      value="${escapeHtml(value)}"
      data-path="${path}"
      ${disabled}
    >
  `;
}

function getValue(obj, path) {
  return path.split(".").reduce((o, k) => o?.[k], obj);
}

function setValue(obj, path, value) {
  const keys = path.split(".");
  let ref = obj;
  keys.slice(0, -1).forEach(k => ref = ref[k]);
  ref[keys.at(-1)] = value;
}

function escapeHtml(str = "") {
  return str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
