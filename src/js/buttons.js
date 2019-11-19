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

    warning("Bank Name, URL, Adapter Id, Bank Code or BIC must not be empty");
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

    fetch(BASE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: assembleRowData(e)
    }).then((response) => {
        if (response.status === 403) {
            warning("It looks like you don't have enough permissions to perform this action");
            return;
        } else if (!response.ok) {
            throw Error(response.statusText);
        }
        row.removeAttribute("class");
        toggleButtons(e);
        return response.text();
    }).then(response => {
        if (!response) { return; }
        let output = JSON.parse(response);
        row.cells[0].textContent = output.id;
        COUNTUP.update(COUNTUP.endVal + 1);
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

    fetch(BASE, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: assembleRowData(e)
    }).then((response) => {
        if (response.status === 403) {
            warning("It looks like you don't have enough permissions to perform this action");
            toggleButtons(e);
            return;
        } else if (!response.ok) {
            throw Error(response.statusText);
        }
        toggleButtons(e);
        return response;
    }).catch(() => {
        fail("Update process has failed");
    });
}

function deleteButton(e) {
    let uuidCell = e.parentElement.parentElement.cells[0].innerText;
    let url = BASE + "/" + uuidCell;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        if (response.status === 403) {
            warning("It looks like you don't have enough permissions to perform this action");
            toggleButtons(e);
            return;
        } else if (!response.ok) {
            throw Error(response.statusText);
        }
        purgeRow(e);
        COUNTUP.update(COUNTUP.endVal - 1);
    }).catch(() => {
        fail("Deleting process has failed");
    });
}

function upload() {
    let file = FILE_UPLOAD_FIELD.files[0];
    let data = new FormData();

    data.append("file", file);

    fetch(BASE + "/csv/upload", {
        method: 'POST',
        body: data
    }).then(response => {
        if (response.status === 403) {
            warning("It looks like you don't have enough permissions to perform this action");
            return;
        } else if (!response.ok) {
            throw Error(response.statusText);
        }
        success();
        (async () => { COUNTUP.update(await getTotal()); })()
    }).catch(() => {
        fail("Failed to upload the file. It looks like the file has an inappropriate format.");
    })
}

async function searchButton() {
    clearTable();

    let response;

    BASE_URL = BASE + "/?";

    let data = document.querySelector(".search-form");

    if (data[0].value !== "")
        BASE_URL += "name=" + data[0].value.toLowerCase() + "&";

    if (data[1].value !== "")
        BASE_URL += "bic=" + data[1].value + "&";

    if (data[2].value !== "")
        BASE_URL += "bankCode=" + data[2].value + "&";

    try {
        response = await search(BASE_URL);

        if (response.data.length === 0) {
            warning("Failed to find any records. Please double check the search conditions");
            return;
        }

        PAGINATOR.create(response.data, response.headers);
    } catch (error) {
        fail("Oops... Something went wrong");
        return;
    }

    if (HIDDEN_ROW.parentElement.parentElement.parentElement.hidden) {
        showTable();
    }

    forceValidation();
}

function mergeButton() {
    let file = FILE_MERGE_FIELD.files[0];
    let data = new FormData();

    data.append("file", file);

    fetch(BASE + "/csv/merge", {
        method: 'POST',
        body: data
    }).then(response => {
        if (response.status === 403) {
            warning("It looks like you don't have enough permissions to perform this action");
            return;
        } else if (!response.ok) {
            throw Error(response.statusText);
        }
        success();
        (async () => { COUNTUP.update(await getTotal()); })()
    }).catch(() => {
        fail("Failed to upload and merge the file.");
    })
}

async function search(URI) {
    let output = {};

    let response = await fetch(URI);
    output.headers = await response.headers.get("X-Total-Elements");
    output.data = JSON.parse(await response.text());

    return output;
}
// End of requests part

async function showMore() {

    let pagination = "&page=" + PAGINATOR.page + "&size=" + PAGINATOR.size;

    let nextPageUrl = BASE_URL + pagination;

    let output = await search(nextPageUrl);

    PAGINATOR.addRow(output.data);

    forceValidation();
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
