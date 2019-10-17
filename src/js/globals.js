function initGlobals() {
    window.FILE_UPLOAD_FIELD = document.querySelector("#import-field");
    window.HIDDEN_ROW = document.querySelector("tbody>tr.hidden");
    window.WARNING = document.querySelector(".alert.warning");
    window.FAILURE = document.querySelector(".alert.failure");
    window.SUCCESS = document.querySelector(".alert.success");
    window.COUNTER = 0;
    window.DEFAULT_DATA = returnTestData();
}
