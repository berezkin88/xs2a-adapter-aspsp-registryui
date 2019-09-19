function search() {
    clearTable();

    let data = document.querySelector(".search-form");
    let url = "http://localhost:8999/v1/aspsps/?";

    if (data[0].value !== "")
        url += "name=" + data[0].value + "&";

    if (data[1].value !== "")
        url += "bic=" + data[1].value + "&";

    if (data[2].value !== "")
        url += "bankCode=" + data[2].value;

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(response => response.text())
        .then(response => JSON.parse(response).forEach((node) => buildRow(node)))
        .catch(function (error) {
            console.log(error);
        });

    if (HIDDEN_ROW.parentElement.parentElement.hidden) {
        showTable();
    }
}
