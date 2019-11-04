function addRow() {
    let clone = HIDDEN_ROW.cloneNode(true);
    clone.removeAttribute("class");
    clone.setAttribute("class", "new");
    clone.lastElementChild.childNodes.forEach(e => {
        if (e.className) {
            addTooltips(e);
            editButton(e);
        }
    });
    document.querySelector("table>tbody").appendChild(clone);

    COUNTER++;

    if (HIDDEN_ROW.parentElement.parentElement.parentElement.hidden) {
        showTable();
    }
    // updating MDL library for making Tooltip working
    componentHandler.upgradeAllRegistered();
}

// Requests part
function saveButton(e) {
    let row = e.parentElement.parentElement;

    for (let cell of row.cells) {
        if (cell.classList.contains("invalid")) {
            warning();
            return;
        }
    }

    fetch("/v1/aspsps/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: assembleRowData(e)
    }).then((response) => {
        if (response.status !== 201) {
            throw RangeError(response.statusText);
        }
        row.removeAttribute("class");
        toggleButtons(e);
        return response.text();
    }).then(response => {
        let output = JSON.parse(response);
        row.cells[0].textContent = output.id;
    }).catch(() => {
        fail("Saving process has failed");
    });
}

function updateButton(e) {
    let row = e.parentElement.parentElement;

    for (let cell of row.cells) {
        if (cell.classList.contains("invalid")) {
            warning();
            return;
        }
    }

    fetch("/v1/aspsps/", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: assembleRowData(e)
    }).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }).then(response => {
        if (response.ok) {
            toggleButtons(e);
        }
    }).catch(() => {
        fail("Update process has failed");
    });
}

function deleteButton(e) {
    let uuidCell = e.parentElement.parentElement.cells[0].innerText;
    let url = "/v1/aspsps/" + uuidCell;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (response.status !== 204) {
            throw Error(response.statusText);
        }
        purgeRow(e);
        return response;
    }).catch(() => {
        fail("Deleting process has fialed");
    });
}

function upload() {
    let file = FILE_UPLOAD_FIELD.files[0];
    let data = new FormData();

    data.append("file", file);

    fetch("/v1/aspsps/csv/upload", {
        method: 'POST',
        body: data
    }).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        success();
    }).catch(() => {
        fail("Failed to upload the file. It looks like the file has an inappropriate format.");
    })
}

function search() {
    clearTable();

    let data = document.querySelector(".search-form");
    let url = "/v1/aspsps/?";

    if (data[0].value !== "")
        url += "name=" + data[0].value.toLowerCase() + "&";

    if (data[1].value !== "")
        url += "bic=" + data[1].value + "&";

    if (data[2].value !== "")
        url += "bankCode=" + data[2].value + "&";

    url += "size=9999";

    fetch(url).then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }).then(response => response.text()
    ).then(response => paginate(JSON.parse(response))
    ).catch(() => {
        fail("Failed to find any records. Please double check input parameters.");
    });

    if (HIDDEN_ROW.parentElement.parentElement.parentElement.hidden) {
        showTable();
    }
}

function importButton() {
    fetch("/v1/aspsps/adapter/import").then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        success();
    }).catch(() => {
        fail("Failed to import data from Adapter");
    })
}

function exportButton() {
    fetch("/v1/aspsps/adapter/export", {
        method: 'POST'
    }).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        success();
    }).catch(() => {
        fail("Failed to export data into Adapter");
    })
}

function mergeButton() {
    let file = FILE_MERGE_FIELD.files[0];
    let data = new FormData();

    data.append("file", file);

    fetch("/v1/aspsps/csv/merge", {
        method: 'POST',
        body: data
    }).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        success();
    }).catch(() => {
        fail("Failed to upload and merge the file.");
    })
}
// End of requests part

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

function greenButton(e) {
    let tableRow = e.parentElement.parentElement;

    if (tableRow.className) {
        if (window.confirm("Are you sure you want to save the new entry?")) {
            saveButton(e);
        }
    } else {
        if (window.confirm("Are you sure you want to update the aspsp?")) {
            updateButton(e);
        } else {
            toggleButtons(e);
        }
    }
}

function redButton(e) {
    let tableRow = e.parentElement.parentElement;

    if (tableRow.className) {
        purgeRow(e);
    } else {
        if (window.confirm("You you sure you want to delete this aspsp record?")) {
            deleteButton(e);
        } else {
            toggleButtons(e);
        }
    }
}

function showButton() {
    let drawer = document.querySelector(".mdl-layout__drawer");
    let icon = document.querySelector(".expand>button>i");

    drawer.classList.toggle("is-hidden");
    icon.classList.toggle("rotate");
}