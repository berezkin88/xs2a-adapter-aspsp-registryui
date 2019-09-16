function search() {
    let data = document.querySelector(".search-form");
    let url = "http://localhost:8999/v1/aspsps/?";

    if (data[0].value !== "")
        url += "name=" + data[0].value + "&";
    
    if (data[1].value !== "")
        url += "bic=" + data[1].value + "&";

    if (data[2].value !== "")
        url += "bankCode=" + data[2].value;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);
    console.log("success")
}