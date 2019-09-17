setTimeout(function () {
    initGlobals();
    document.querySelector(".edit-cell>button.edit").addEventListener("click", function () { editButton(this) });
    document.querySelector(".edit-cell>button.update").addEventListener("click", function () { greenButton(this) });
    document.querySelector(".edit-cell>button.delete").addEventListener("click", function () { deleteButton(this) });
    document.querySelector("#add>button").addEventListener("click", addRow);
}, 0)

function initGlobals() {
    window.HIDDEN_ROW = document.querySelector("tbody>tr.hidden");
    window.COUNTER = 0;
}

function uneditableCells(e) {
    let rowCells = e.parentElement.parentElement.cells;

    for (let i = 1, till = (rowCells.length - 1); i < till; i++) {
        rowCells[i].removeAttribute("contenteditable");
    }
}

function toggleButtons(e) {
    let editButton = e.parentNode.children[0];
    let updateOrSaveButton = e.parentNode.children[1];
    let deleteButton = e.parentNode.children[2];

    if (editButton.style.display === "none") {
        editButton.style.display = "inherit";
        updateOrSaveButton.style.display = "none";
        deleteButton.style.display = "none";
        uneditableCells(e);
    } else {
        editButton.style.display = "none";
        updateOrSaveButton.style.display = "inherit";
        deleteButton.style.display = "inherit";
        editableCells(e);
    }
}

function editableCells(e) {
    let rowCells = e.parentElement.parentElement.cells;

    for (let i = 1, till = (rowCells.length - 1); i < till; i++) {
        rowCells[i].setAttribute("contenteditable", true);
    }
}

function search() {
    let data = document.querySelector(".search-form");
    let url = "http://localhost:8999/v1/aspsps/?";

    if (data[0].value !== "")
        url += "name=" + data[0].value + "&";
    
    if (data[1].value !== "")
        url += "bic=" + data[1].value + "&";

    if (data[2].value !== "")
        url += "bankCode=" + data[2].value;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
    console.log("success")
}
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
            }
    
            if (e.className.indexOf("update") > -1) {
                let helper = e.parentNode.childNodes[9];
    
                e.addEventListener("click", () => { greenButton(e) })
                e.setAttribute("id", updateId + COUNTER);
    
                helper.setAttribute("data-mdl-for", updateId + COUNTER);
            }
    
            if (e.className.indexOf("delete") > -1) {
                let helper = e.parentNode.childNodes[11];
    
                e.addEventListener("click", () => { deleteButton(e) })
                e.setAttribute("id", deleteId + COUNTER);
    
                helper.setAttribute("data-mdl-for", deleteId + COUNTER);
            }
        }
    });
    document.querySelector("table>tbody").appendChild(clone)

    COUNTER++;
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      console.log("UUID generated");
      return v.toString(16);
    });
  }

function greenButton(e) {
    let tableRow = e.parentElement.parentElement;

    if (tableRow.className) {
        saveButton(e);
        console.log("saved");
    } else {
        updateButton(e);
        console.log("updated");
    }
}
function editButton(e) {
    let editButton = e.parentNode.children[0];
    let updateOrSaveButton = e.parentNode.children[1];
    let deleteButton = e.parentNode.children[2];

    if (editButton.style.display !== "none") {
        editButton.style.display = "none";
        updateOrSaveButton.style.display = "inherit";
        deleteButton.style.display = "inherit";
        editableCells(e);
    }
}
function deleteButton(e) {
    let uuidCell = e.parentElement.parentElement.cells[0].innerText;
    let url = "http://localhost:8999/v1/aspsps/" + uuidCell;

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    if (xhr.status === 204) {
        purgeRow(e);
    } else {
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        };
    }
    xhr.send(null);
}

function updateButton(e) {
    let editButton = e.parentNode.children[0];
    let updateOrSaveButton = e.parentNode.children[1];
    let deleteButton = e.parentNode.children[2];

    //TODO add update request

    if (editButton.style.display === "none") {
        editButton.style.display = "inherit";
        updateOrSaveButton.style.display = "none";
        deleteButton.style.display = "none";
        uneditableCells(e);
    }
}
function saveButton(e) {
    let editButton = e.parentNode.children[0];
    let updateOrSaveButton = e.parentNode.children[1];
    let deleteButton = e.parentNode.children[2];

    // TODO add create request

    if (editButton.style.display === "none") {
        editButton.style.display = "inherit";
        updateOrSaveButton.style.display = "none";
        deleteButton.style.display = "none";
        uneditableCells(e);
    }
}
//# sourceMappingURL=main.js.map
