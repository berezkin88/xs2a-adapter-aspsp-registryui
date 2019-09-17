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
