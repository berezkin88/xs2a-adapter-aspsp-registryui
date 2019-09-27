function uneditableCells(e) {
    let rowCells = e.parentElement.parentElement.cells;
    let approach = e.parentElement.parentElement.querySelectorAll('input');

    for (let i = 1, till = (rowCells.length - 1); i < till; i++) {
        rowCells[i].removeAttribute("contenteditable");
    }

    approach.forEach(element => {
        element.disabled = true;
    })
}
