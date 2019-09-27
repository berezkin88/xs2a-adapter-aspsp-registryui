function assembleRowData(e) {
    let row = e.parentNode.parentNode;

    let id = "{\"id\": \"" + row.cells[0].textContent + "\",\n";
    let bankName = "\"name\": \"" + row.cells[1].textContent + "\",\n";
    let bic = "\"bic\": \"" + row.cells[2].textContent + "\",\n";
    let url = "\"url\": \"" + row.cells[3].textContent + "\",\n";
    let adapterId = "\"adapterId\": \"" + row.cells[4].textContent + "\",\n";
    let bankCode = "\"bankCode\": \"" + row.cells[5].textContent + "\",\n";
    let idpUrl = "\"idpUrl\": \"" + row.cells[6].textContent + "\",\n";
    let approach = "\"scaApproaches\": \"" + approachParser(row.cells[7]) + "\"}";

    return id + bankName + bic + url + adapterId + bankCode + idpUrl + approach;

    function approachParser(data) {
        let inputs = data.querySelectorAll("input");
        let resultString = [];

        inputs.forEach((element) => {
            if (element.checked) {
                resultString.push(element.name);
            }
        })

        return JSON.stringify(resultString);
    }
}
