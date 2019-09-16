setTimeout(function () {
    initGlobals();
    document.querySelectorAll(".edit-cell>button").forEach(e => e.addEventListener("click", toggleButtons));
}, 0)

function initGlobals() {
    Window.editButton = document.querySelector("[id^='edit']");
    Window.updateButton = document.querySelector("[id^='update']");
    Window.deleteButton = document.querySelector("[id^='delete']");
}

function uneditableCells() {
    let rowCells = Window.editButton.parentElement.parentElement.cells;

    for (let i = 1, till = (rowCells.length - 1); i < till; i++) {
        rowCells[i].removeAttribute("contenteditable");
    }
}

function toggleButtons() {
    if (Window.editButton.style.display === "none") {
        Window.editButton.style.display = "inherit";
        Window.updateButton.style.display = "none";
        Window.deleteButton.style.display = "none";
        uneditableCells();
    } else {
        Window.editButton.style.display = "none";
        Window.updateButton.style.display = "inherit";
        Window.deleteButton.style.display = "inherit";
        editableCells();
    }
}

function editableCells() {
    let rowCells = Window.editButton.parentElement.parentElement.cells;

    for (let i = 1, till = (rowCells.length - 1); i < till; i++) {
        rowCells[i].setAttribute("contenteditable", true);
    }
}

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
//# sourceMappingURL=main.js.map
