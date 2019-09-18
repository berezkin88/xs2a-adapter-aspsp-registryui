function addRow() {
    let editId = "edit-";
    let updateId = "update-";
    let deleteId = "delete-";

    let clone = HIDDEN_ROW.cloneNode(true);
    clone.cells[0].textContent = uuid();
    clone.removeAttribute("class");
    clone.setAttribute("class", "new");
    clone.lastElementChild.childNodes.forEach(e => {
        if (e.className) {
            if (e.className.indexOf("edit") > -1) {
                let helper = e.parentNode.childNodes[7];
    
                e.addEventListener("click", () => { editButton(e) })
                e.setAttribute("id", editId + COUNTER);
    
                helper.setAttribute("data-mdl-for", editId + COUNTER);
                editButton(e);
            }
    
            if (e.className.indexOf("update") > -1) {
                let helper = e.parentNode.childNodes[9];
    
                e.addEventListener("click", () => { greenButton(e) })
                e.setAttribute("id", updateId + COUNTER);
    
                helper.setAttribute("data-mdl-for", updateId + COUNTER);
            }
    
            if (e.className.indexOf("delete") > -1) {
                let helper = e.parentNode.childNodes[11];
    
                e.addEventListener("click", () => { redButton(e) })
                e.setAttribute("id", deleteId + COUNTER);
    
                helper.setAttribute("data-mdl-for", deleteId + COUNTER);
            }
        }
    });
    document.querySelector("table>tbody").appendChild(clone)

    COUNTER++;

    if (HIDDEN_ROW.parentElement.parentElement.hidden) {
        showTable();
    }
}
