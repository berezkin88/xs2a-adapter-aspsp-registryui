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

async function showMore() {

    let pagination = "page=" + PAGINATOR.page + "&size=" + PAGINATOR.size;

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

    let isDuplicate; 
    checkForDuplicates(e)
    .then(response => isDuplicate = response)
    .finally(() => {
        if (tableRow.className) {
            if (window.confirm(resolveResponseJson(isDuplicate))) {
                saveButton(e);
            }
        } else {
            if (window.confirm(resolveResponseJson(isDuplicate))) {
                updateButton(e);
            } else {
                toggleButtons(e);
            }
        }
    });
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

const searchButton = async () => {
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

    if (data[3].value !== "")
        BASE_URL += "adapterId=" + data[3].value + "&";

    try {
        response = await search(BASE_URL.slice(0, -1));

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

function showButton() {
    let drawer = document.querySelector(".mdl-layout__drawer");
    let icon = document.querySelector(".expand>button>i");

    drawer.classList.toggle("is-hidden");
    icon.classList.toggle("rotate");
}

const proceedButton = () => {

    upload();

    showSpinner();
}

const confirmButton = () => {

    merge();

    showSpinner();
}

const reportButton = () => {
    createFile(VALIDATOR.data, "report", "json");
}

const downloadButton = () => {
    download();
}

const rejectCancelButton = () => {
    toggleModal();
}