function editableCells(e) {
    let rowCells = e.parentElement.parentElement.cells;

    for (let i = 1, till = (rowCells.length - 1); i < till; i++) {
        rowCells[i].setAttribute("contenteditable", true);
    }
}
