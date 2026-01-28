export function showDetailView() {
  document.querySelector("table").style.display = "none";
  document.getElementById("product-detail").style.display = "block";
  document.getElementById("backToList").style.display = "inline-block";
}

export function showListView() {
  document.querySelector("table").style.display = "";
  document.getElementById("product-detail").style.display = "none";
  document.getElementById("backToList").style.display = "none";
}
