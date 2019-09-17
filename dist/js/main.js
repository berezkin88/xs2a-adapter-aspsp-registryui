setTimeout(function () {
    initGlobals();
    document.querySelector(".edit-cell>button.edit").addEventListener("click", function () { editButton(this) });
    document.querySelector(".edit-cell>button.update").addEventListener("click", function () { greenButton(this) });
    document.querySelector(".edit-cell>button.delete").addEventListener("click", function () { redButton(this) });
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

    let output = fetch(url).then(response => response.json());

    // TODO build table
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

function redButton(e) {
    let tableRow = e.parentElement.parentElement;

    if (tableRow.className) {
        purgeRow(e);
        console.log("row purged off");
    } else {
        deleteButton(e);
        console.log("data deleted");
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

    let row = e.parentNode.parentNode;

    let uri = "http://localhost:8999/v1/aspsps/";

    let id = "{\"id\": \"" + row.cells[0].textContent + "\",\n";
    let bankName = "\"name\": \"" + row.cells[1].textContent + "\",\n";
    let bic = "\"bic\": \"" + row.cells[2].textContent + "\",\n";
    let url = "\"url\": \"" + row.cells[3].textContent + "\",\n";
    let adapterId = "\"adapterId\": \"" + row.cells[4].textContent + "\",\n";
    let bankCode = "\"bankCode\": \"" + row.cells[5].textContent + "\"}";

    let rawData = id + bankName + bic + url + adapterId + bankCode;

    console.log(rawData);

    let data = JSON.parse(rawData);

    fetch(uri, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    }).then(response => {
        if (response.statusText === 200) {
            if (editButton.style.display === "none") {
                editButton.style.display = "inherit";
                updateOrSaveButton.style.display = "none";
                deleteButton.style.display = "none";
                uneditableCells(e);
            }
        }
    });
}
function saveButton(e) {
    let editButton = e.parentNode.children[0];
    let updateOrSaveButton = e.parentNode.children[1];
    let deleteButton = e.parentNode.children[2];

    let row = e.parentNode.parentNode;

    let uri = "http://localhost:8999/v1/aspsps/";

    let id = "{\"id\": \"" + row.cells[0].textContent + "\",\n";
    let bankName = "\"name\": \"" + row.cells[1].textContent + "\",\n";
    let bic = "\"bic\": \"" + row.cells[2].textContent + "\",\n";
    let url = "\"url\": \"" + row.cells[3].textContent + "\",\n";
    let adapterId = "\"adapterId\": \"" + row.cells[4].textContent + "\",\n";
    let bankCode = "\"bankCode\": \"" + row.cells[5].textContent + "\"}";

    let rawData = id + bankName + bic + url + adapterId + bankCode;

    console.log(rawData);

    let data = JSON.parse(rawData);

    fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    }).then(response => {
        if (response.statusText === 200) {
            if (editButton.style.display === "none") {
                editButton.style.display = "inherit";
                updateOrSaveButton.style.display = "none";
                deleteButton.style.display = "none";
                uneditableCells(e);
            }
        }
    });
}

function purgeRow(e) {
    let tableRow = e.parentElement.parentElement;

    tableRow.remove();
}

//# sourceMappingURL=main.js.map
