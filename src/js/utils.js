function toUpper(element) {
    element.innerText = element.innerText.toUpperCase();
}

function forceValidation() {
    let rows = document.querySelectorAll("tr");

    rows.forEach((row) => {
        for (let cell of row.cells) {
            if (cell.classList.contains("invalid")) {
                cell.classList.remove("invalid");
                cell.style.background = "none";
                console.log("Cell with content '" + cell.textContent + "' is made valid");
            }
        }
    })
}

// Manipulating cells
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

function editableCells(e) {
    let rowCells = e.parentElement.parentElement.cells;
    let approach = e.parentElement.parentElement.querySelectorAll('input');

    for (let i = 1, till = (rowCells.length - 2); i < till; i++) {
        rowCells[i].setAttribute("contenteditable", true);

    }

    approach.forEach(element => {
        element.disabled = false;
    })
}
// End of cells part

// Manipulating tables
function showTable() {
    let table = HIDDEN_ROW.parentElement.parentElement.parentElement;
    let message = document.querySelector(".welcome-message");

    table.hidden = false;
    message.hidden = true;
}

function clearTable() {
    let body = document.querySelectorAll("tbody>tr");

    if (body.length > 1) {
        body.forEach(e => { if (!e.className) { e.remove(); } })
    }
}

function clearContent() {
    clearTable();

    document.querySelectorAll(".mdl-textfield__input").forEach(element => { element.value = ""; element.parentElement.classList.remove("is-dirty") });
}
// End of table part

function onEnterPress(event) {
    if (event.keyCode === 13) {
        search();
    }
}

function addTooltips(e) {
    let editId = "edit-";
    let updateId = "update-";
    let deleteId = "delete-";
    
    if (e.className.indexOf("edit") > -1) {
        let helper = e.parentNode.childNodes[7];
        
        e.addEventListener("click", () => { editButton(e) });
        e.setAttribute("id", editId + COUNTER);
        
        helper.setAttribute("data-mdl-for", editId + COUNTER);
        helper.setAttribute("class", "mdl-tooltip mdl-tooltip--top");
    }
    
    if (e.className.indexOf("update") > -1) {
        let helper = e.parentNode.childNodes[9];
        
        e.addEventListener("click", () => { greenButton(e) });
        e.setAttribute("id", updateId + COUNTER);
        
        helper.setAttribute("data-mdl-for", updateId + COUNTER);
        helper.setAttribute("class", "mdl-tooltip mdl-tooltip--top");
    }
    
    if (e.className.indexOf("delete") > -1) {
        let helper = e.parentNode.childNodes[11];
        
        e.addEventListener("click", () => { redButton(e) });
        e.setAttribute("id", deleteId + COUNTER);
        
        helper.setAttribute("data-mdl-for", deleteId + COUNTER);
        helper.setAttribute("class", "mdl-tooltip mdl-tooltip--top");
    }
}

// Manipulating rows
function purgeRow(e) {
    let tableRow = e.parentElement.parentElement;

    tableRow.remove();
}

function assembleRowData(e) {
    let row = e.parentNode.parentNode;

    let object = {};
    object.id = row.cells[0].textContent;
    object.name = row.cells[1].textContent;
    object.bic = row.cells[2].textContent;
    object.url = row.cells[3].textContent;
    object.adapterId = row.cells[4].textContent;
    object.bankCode = row.cells[5].textContent;
    object.idpUrl = row.cells[6].textContent;
    object.scaApproaches = approachParser(row.cells[7]);

    return JSON.stringify(object);

    function approachParser(data) {
        let inputs = data.querySelectorAll("input");
        let resultString = [];

        inputs.forEach((element) => {
            if (element.checked) {
                resultString.push(element.name);
            }
        });

        return resultString;
    }
}

function buildRow(data) {
    let clone = HIDDEN_ROW.cloneNode(true);
    clone.removeAttribute("class");

    clone.cells[0].textContent = data.id;
    clone.cells[1].textContent = data.name;
    clone.cells[2].textContent = data.bic;
    clone.cells[3].textContent = data.url;
    clone.cells[4].textContent = data.adapterId;
    clone.cells[5].textContent = data.bankCode;
    clone.cells[6].textContent = data.idpUrl;
    approachParser(data.scaApproaches, clone.cells[7]);

    clone.lastElementChild.childNodes.forEach(e => {
        if (e.className) {
            addTooltips(e)
        }
    });
    document.querySelector("table>tbody").appendChild(clone);

    COUNTER++;

    // updating MDL library for making Tooltip working
    componentHandler.upgradeAllRegistered();

    function approachParser(data, cell) {
        if (!data) {
            return;
        }

        let inputs = cell.querySelectorAll("input");

        data.forEach(element => {
            switch (element) {
                case "EMBEDDED":
                    inputs[0].checked = true;
                    break;
                case "REDIRECT":
                    inputs[1].checked = true;
                    break;
                case "DECOUPLED":
                    inputs[2].checked = true;
                    break;
                case "OAUTH":
                    inputs[3].checked = true;
                    break;
            }
        })
    }
}
// End of row part
function returnTestData() {
    let sample = '[ { "id" : "3d949fee-81ec-4329-ba2f-971705e9ac2e", "name" : "VR-Bank Bonn eG", "bic" : "GENODED1HBO", "bankCode" : "38160220", "url" : "https://xs2a-test.fiduciagad.de/xs2a", "adapterId" : "fiducia-adapter", "paginationId" : "226:1.0675461" }, { "id" : "33b2f39c-1519-4592-8db4-f2591682db2b", "name" : "VR-Bank Bonn eG", "bic" : "GENODED1BGK", "bankCode" : "", "url" : "https://xs2a-test.fiduciagad.de/xs2a", "adapterId" : "fiducia-adapter", "paginationId" : "712:1.0675461" }, { "id" : "5f5db2fd-a862-43de-8fbb-893198f92aa4", "name" : "VR Bank München Land", "bic" : "GENODEF1OHC", "bankCode" : "70166486", "url" : "https://xs2a-test.fiduciagad.de/xs2a", "adapterId" : "fiducia-adapter", "paginationId" : "715:1.0675461" }, { "id" : "1c8ddd14-e05c-4995-b672-03723a40b8ca", "name" : "LIGA Bank", "bic" : "GENODEF1M05", "bankCode" : "75090300", "url" : "https://xs2a-test.fiduciagad.de/xs2a", "adapterId" : "fiducia-adapter", "paginationId" : "623:0.9450702" }, { "id" : "7c5272a1-bcbd-42b7-b020-c28d73d08d01", "name" : "Münchner Bank", "bic" : "GENODEF1M02", "bankCode" : "70160300", "url" : "https://xs2a-test.fiduciagad.de/xs2a", "adapterId" : "fiducia-adapter", "paginationId" : "627:0.9450702" }, { "id" : "274cdfbf-e50c-47b1-8e2f-119eec2fc443", "name" : "Münchner Bank", "bic" : "GENODEF1M01", "bankCode" : "70190000", "url" : "https://xs2a-test.fiduciagad.de/xs2a", "adapterId" : "fiducia-adapter", "paginationId" : "628:0.9450702" }, { "id" : "fc4f7e7d-c095-4a26-a41f-7c5c8a77ba37", "name" : "Merkur Bank", "bic" : "GENODEF1M06", "bankCode" : "70130800", "url" : "https://xs2a-test.fiduciagad.de/xs2a", "adapterId" : "fiducia-adapter", "paginationId" : "631:0.9450702" }, { "id" : "3c872dbd-2d38-4c09-aead-5e7612251b71", "name" : "Waldecker Bank", "bic" : "GENODEF1KBW", "bankCode" : "52360059", "url" : "https://xs2a-test.fiduciagad.de/xs2a", "adapterId" : "fiducia-adapter", "paginationId" : "662:0.9450702" }, { "id" : "0dd3397e-b09b-4c2d-a01e-754e3f202f21", "name" : "VR Bank", "bic" : "GENODE51BEC", "bankCode" : "55362071", "url" : "https://xs2a-test.fiduciagad.de/xs2a", "adapterId" : "fiducia-adapter", "paginationId" : "665:0.9450702" }, { "id" : "4a33bfc4-6711-4dd3-a077-6e2c2d9a48dc", "name" : "GRENKE BANK", "bic" : "GREBDEH1XXX", "bankCode" : "20130400", "url" : "https://xs2a-test.fiduciagad.de/xs2a", "adapterId" : "fiducia-adapter", "paginationId" : "682:0.9450702" }, { "id" : "094c849d-1af3-479a-870d-79600389ae76", "name" : "BRANDENBURGER BANK", "bic" : "GENODEF1BRB", "bankCode" : "16062073", "url" : "https://xs2a-test.fiduciagad.de/xs2a", "adapterId" : "fiducia-adapter", "paginationId" : "759:0.9450702" }, { "id" : "2245bc2d-dc83-47e8-b517-34efe63fc1e5", "name" : "Münchner Bank", "bic" : "GENODEF1OBS", "bankCode" : "70169493", "url" : "https://xs2a-test.fiduciagad.de/xs2a", "adapterId" : "fiducia-adapter", "paginationId" : "790:0.9450702" }, { "id" : "149ac3bb-e508-41e8-bf32-20b1ff085243", "name" : "Westerwald Bank", "bic" : "GENODE51WW1", "bankCode" : "57391800", "url" : "https://xs2a-test.fiduciagad.de/xs2a", "adapterId" : "fiducia-adapter", "paginationId" : "806:0.9450702" }, { "id" : "14ba28f9-2d10-47c8-9eb9-97e3c68b919a", "name" : "Schrobenhausener Bank", "bic" : "GENODEF1SHV", "bankCode" : "", "url" : "https://xs2a-test.fiduciagad.de/xs2a", "adapterId" : "fiducia-adapter", "paginationId" : "824:0.9450702" }, { "id" : "e990080e-a292-487b-931d-9dd179fa55fe", "name" : "Olb Bank", "bic" : "OLBODEH2XXX", "bankCode" : "25621327", "url" : "https://xs2a-int.olb.de/xs2a", "adapterId" : "olb-adapter", "paginationId" : "826:0.9450702" }, { "id" : "597836f9-054d-4e34-beec-2e16af9e2671", "name" : "Olb Bank", "bic" : "OLBODEH2XXX", "bankCode" : "26520017", "url" : "https://xs2a-int.olb.de/xs2a", "adapterId" : "olb-adapter", "paginationId" : "827:0.9450702" }, { "id" : "0560761b-fda4-4b2f-b4bc-b391e947332a", "name" : "Olb Bank", "bic" : "OLBODEH2XXX", "bankCode" : "26521703", "url" : "https://xs2a-int.olb.de/xs2a", "adapterId" : "olb-adapter", "paginationId" : "828:0.9450702" }, { "id" : "50ed12d4-c717-4fb6-bcd4-6cacbff772f9", "name" : "Olb Bank", "bic" : "OLBODEH2XXX", "bankCode" : "26522319", "url" : "https://xs2a-int.olb.de/xs2a", "adapterId" : "olb-adapter", "paginationId" : "829:0.9450702" }, { "id" : "0dadfd89-2e57-4573-8ae1-3b35d0e51357", "name" : "Olb Bank", "bic" : "OLBODEH2XXX", "bankCode" : "26620010", "url" : "https://xs2a-int.olb.de/xs2a", "adapterId" : "olb-adapter", "paginationId" : "830:0.9450702" }, { "id" : "888be9a6-6f3e-409f-9b89-4e6094d59775", "name" : "Olb Bank", "bic" : "OLBODEH2XXX", "bankCode" : "26621413", "url" : "https://xs2a-int.olb.de/xs2a", "adapterId" : "olb-adapter", "paginationId" : "831:0.9450702" } ]';

    return JSON.parse(sample);
}
