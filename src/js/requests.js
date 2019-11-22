const saveButton = (e) => {
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
        let output = JSON.parse(response);
        row.cells[0].textContent = output.id;
        COUNTUP.update(COUNTUP.endVal + 1);
    }).catch(() => {
        fail("Saving process has failed");
    });
}

const updateButton = (e) => {
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

const deleteButton = (e) => {
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

const upload = () => {
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

const merge = () => {
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

const search = async (URI) => {
    let output = {};

    let response = await fetch(URI);
    output.headers = await response.headers.get("X-Total-Elements");
    output.data = JSON.parse(await response.text());

    return output;
}

const validateUpload = () => {
    let file = FILE_UPLOAD_FIELD.files[0];
    let data = new FormData();

    data.append("file", file);

    toggleModal();

    fetch(BASE + "/csv/validate/upload", {
        method: 'POST',
        body: data
    }).then(response => {
        if (response.status === 403) {
            warning("It looks like you don't have enough permissions to perform this action");
            return;
        } else if (!response.ok && response.status !== 400) {
            throw Error(response.statusText);
        }
        return response.text()
    }).then(response => {
        validationResponseHandler(JSON.parse(response));
    }).catch(() => {
        fail("Validation process failed, please check if you provided an appropriately formatted CSV file");
    })
}

const validateMerge = () => {
    let file = FILE_MERGE_FIELD.files[0];
    let data = new FormData();

    data.append("file", file);

    toggleModal();

    fetch(BASE + "/csv/validate/merge", {
        method: 'POST',
        body: data
    }).then(response => {
        if (response.status === 403) {
            warning("It looks like you don't have enough permissions to perform this action");
            return;
        } else if (!response.ok && response.status !== 400) {
            throw Error(response.statusText);
        }
        return response.text()
    }).then(response => {
        validationResponseHandler(JSON.parse(response));
    }).catch(() => {
        fail("Validation process failed, please check if you provided an appropriately formatted CSV file");
    })
}
