function editableCells() {
    let edit = document.querySelector("#edit");
    let rowCells = edit.parentElement.parentElement.cells;

    for (let i = 1, till = (rowCells.length - 1); i < till; i++) {
        rowCells[i].setAttribute("contenteditable", true);
    }
}