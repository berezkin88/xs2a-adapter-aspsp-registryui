function uneditableCells() {
    let edit = document.querySelector("#edit");
    let rowCells = edit.parentElement.parentElement.cells;

    for (let i = 1, till = (rowCells.length - 1); i < till; i++) {
        rowCells[i].removeAttribute("contenteditable");
    }
}
function toggleButtons() {
    let editButton = document.querySelector("[id^='edit']");
    let updateButton = document.querySelector("[id^='update']");
    let deleteButton = document.querySelector("[id^='delete']");

    if (editButton.style.display === "none") {
        editButton.style.display = "inherit";
        updateButton.style.display = "none";
        deleteButton.style.display = "none";
        uneditableCells();
    } else {
        editButton.style.display = "none";
        updateButton.style.display = "inherit";
        deleteButton.style.display = "inherit";
        editableCells();
    }
}
function editableCells() {
    let edit = document.querySelector("#edit");
    let rowCells = edit.parentElement.parentElement.cells;

    for (let i = 1, till = (rowCells.length - 1); i < till; i++) {
        rowCells[i].setAttribute("contenteditable", true);
    }
}
setTimeout(function () {
  document.querySelectorAll(".edit-cell>button").forEach(e => e.addEventListener("click", toggleButtons));
}, 1000);
//# sourceMappingURL=main.js.map
