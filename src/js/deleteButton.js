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
    }).catch(function (error) {
        console.log(error);
        operationFailed();
    });
}
