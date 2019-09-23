function assembleRowData(e) {
    let row = e.parentNode.parentNode;

    let id = "{\"id\": \"" + row.cells[0].textContent + "\",\n";
    let bankName = "\"name\": \"" + row.cells[1].textContent + "\",\n";
    let bic = "\"bic\": \"" + row.cells[2].textContent + "\",\n";
    let url = "\"url\": \"" + row.cells[3].textContent + "\",\n";
    let adapterId = "\"adapterId\": \"" + row.cells[4].textContent + "\",\n";
    let bankCode = "\"bankCode\": \"" + row.cells[5].textContent + "\"}";

    return id + bankName + bic + url + adapterId + bankCode;
}
