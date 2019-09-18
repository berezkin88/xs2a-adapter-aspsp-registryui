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
    }).then((response) => {
        if (response.status !== 201) {
            throw Error(response.statusText);
        }
        return response;
    }).then(response => {
        if (response.statusText === 201) {
            if (editButton.style.display === "none") {
                editButton.style.display = "inherit";
                updateOrSaveButton.style.display = "none";
                deleteButton.style.display = "none";
                uneditableCells(e);
            }
        }
    }).catch(function (error) {
        console.log(error);
    });
}
