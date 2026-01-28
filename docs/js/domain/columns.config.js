export const COLUMN_GROUPS = {
  IDENTITE: {
    label: "Identité",
    columns: [
      { key: "EAN", label: "EAN" },
      { key: "LIBELLE", label: "Libellé" },
      { key: "CODE_S", label: "Code S" }
    ]
  },
  NOMENCLATURE_MONOPRIX: {
    label: "Nomenclature Monoprix",
    columns: [
      { key: "RAY_MON", label: "Rayon MON" },
      { key: "UG_MON", label: "UG MON" }
    ]
  },
  NOMENCLATURE_FRANPRIX: {
    label: "Nomenclature Franprix",
    columns: [
      { key: "UNIVERS_FPX", label: "Univers FPX" },
      { key: "RAY_FPX", label: "Rayon FPX" },
      { key: "SS_GROUPE_FPX", label: "Sous-groupe FPX" }
    ]
  },
  NOMENCLATURE_CASINO: {
    label: "Nomenclature Casino",
    columns: [
      { key: "UE_CASINO", label: "UE Casino" },
      { key: "FAMILLE_CASINO", label: "Famille Casino" }
    ]
  }
};
