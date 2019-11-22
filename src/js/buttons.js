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

const proceedButton = () => {
    if (HIT_BUTTON === "UPLOAD") {
        upload();
    } else if (HIT_BUTTON === "MERGE") {
        merge();
    }

    toggleModal();
}

const reportButton = () => {
    createReport(VALIDATOR.data);
} 

const rejectButton = () => {
    toggleModal();
}