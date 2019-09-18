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

    // let output = fetch(url).then(response => response.json());
    // output.forEach((node) => buildRow(node));

    let mockRawData = '[{"id":"40885a41-339e-4c92-a43f-77264bc6059c","name":"Sparkasse Burbach-Neunkirchen","bic":"WELADED1BUB","bankCode":"46051240","url":"https://xs2a-sandbox.f-i-apim.de:8444/fixs2a-env/xs2a-api/12345678","adapterId":"sparkasse-adapter","paginationId":"0:1.0"},{"id":"1edbdcff-ce4a-42ad-a0a5-dd4767ae0443","name":"Sparkasse Vorpommern","bic":"NOLADE21GRW","bankCode":"15050500","url":"https://xs2a-sandbox.f-i-apim.de:8444/fixs2a-env/xs2a-api/12345678","adapterId":"sparkasse-adapter","paginationId":"1:1.0"},{"id":"4d18ff59-fd1e-4e1d-adbc-d2f58a757df7","name":"VB B.Drib.-Brakel-Steinh.e","bic":"GENODEM1BOT","bankCode":"47267216","url":"https://xs2a-test.fiduciagad.de/xs2a","adapterId":"fiducia-adapter","paginationId":"2:1.0"},{"id":"872fe1c4-dff7-4e8a-84f1-cf2b07640d1e","name":"Landessparkasse zu Oldenburg","bic":"SLZODE22XXX","bankCode":"28050100","url":"https://xs2a-sandbox.f-i-apim.de:8444/fixs2a-env/xs2a-api/12345678","adapterId":"sparkasse-adapter","paginationId":"3:1.0"},{"id":"5f3a66d6-175b-457b-a81c-e533160848b6","name":"Volksbank Schwarzwald Baar Hegau","bic":"GENODE61VS1","bankCode":"69490000","url":"https://xs2a-test.fiduciagad.de/xs2a","adapterId":"fiducia-adapter","paginationId":"4:1.0"},{"id":"457089d0-f926-4786-b345-92b7e16cafda","name":"VR PLUS Altmark-Wendland eG","bic":"GENODEF1LCH","bankCode":"","url":"https://xs2a-test.fiduciagad.de/xs2a","adapterId":"fiducia-adapter","paginationId":"5:1.0"},{"id":"64a7c636-6a85-4a2d-af35-e46cc8bc0b10","name":"Volksbank Sauerland eG","bic":"GENODEM1SRL","bankCode":"46461126","url":"https://xs2a-test.fiduciagad.de/xs2a","adapterId":"fiducia-adapter","paginationId":"6:1.0"},{"id":"7234d7b1-88d2-46ae-af3f-4f0cc13b5a38","name":"Kreissparkasse Gelnhausen","bic":"HELADEF1GEL","bankCode":"50750094","url":"https://xs2a-sandbox.f-i-apim.de:8444/fixs2a-env/xs2a-api/12345678","adapterId":"sparkasse-adapter","paginationId":"7:1.0"},{"id":"398f9231-8f25-49cd-95ba-f9977803a295","name":"Sparkasse Gera-Greiz","bic":"HELADEF1GER","bankCode":"83050000","url":"https://xs2a-sandbox.f-i-apim.de:8444/fixs2a-env/xs2a-api/12345678","adapterId":"sparkasse-adapter","paginationId":"8:1.0"},{"id":"0b876747-a443-40f3-b7a1-4eda85b04a0d","name":"VR-Bank Gerolzhofen","bic":"GENODEF1GZH","bankCode":"79362081","url":"https://xs2a-test.fiduciagad.de/xs2a","adapterId":"fiducia-adapter","paginationId":"9:1.0"}]';

    let mockJson = JSON.parse(mockRawData);

    mockJson.forEach((node) => buildRow(node));

    if (HIDDEN_ROW.parentElement.parentElement.hidden) {
        showTable();
    }
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

    if (HIDDEN_ROW.parentElement.parentElement.hidden) {
        showTable();
    }
}

function uuid() {
  console.log("generating uuid...");
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

function greenButton(e) {
    let tableRow = e.parentElement.parentElement;

    if (tableRow.className) {
        if (window.confirm("Are you sure an aspsp has built right?")) {
            saveButton(e);
            console.log("saved");
        } else {
            return;
        }
    } else {
        if (window.confirm("Are you sure you want to update the aspsp?")) {
            updateButton(e);
            console.log("updated");
        } else {
            toggleButtons(e);
        }
    }
}

function redButton(e) {
    let tableRow = e.parentElement.parentElement;

    if (tableRow.className) {
        purgeRow(e);
        console.log("row purged off");
    } else {
        if (window.confirm("You you sure you want to delete this aspsp record?")) {
            deleteButton(e);
            console.log("data deleted");
        } else {
            toggleButtons(e);
        }
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

function buildRow(data) {
    let editId = "edit-";
    let updateId = "update-";
    let deleteId = "delete-";

    let clone = HIDDEN_ROW.cloneNode(true);
    clone.removeAttribute("class");
    
    clone.cells[0].textContent = data.id;
    clone.cells[1].textContent = data.name;
    clone.cells[2].textContent = data.bic;
    clone.cells[3].textContent = data.url;
    clone.cells[4].textContent = data.adapterId;
    clone.cells[5].textContent = data.bankCode;

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
    
                e.addEventListener("click", () => { redButton(e) })
                e.setAttribute("id", deleteId + COUNTER);
    
                helper.setAttribute("data-mdl-for", deleteId + COUNTER);
            }
        }
    });
    document.querySelector("table>tbody").appendChild(clone)

    COUNTER++;
}

function showTable() {
    let table = HIDDEN_ROW.parentElement.parentElement;
    let message = document.querySelector(".welcome-message");

    table.hidden = false;
    message.hidden = true;
}
//# sourceMappingURL=main.js.map
