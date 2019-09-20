function saveButton(e) {
    let row = e.parentElement.parentElement;

    fetch("/v1/aspsps/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: assembleRowData(e)
    }).then((response) => {
        if (response.status !== 201) {
            throw Error(response.statusText);
        }
        row.removeAttribute("class");
        return response;
    }).then(response => {
        if (response.status === 201) {
            toggleButtons(e);
        }
    }).catch(function (error) {
        console.log(error);
    });
}
