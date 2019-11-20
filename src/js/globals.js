function initGlobals() {
    window.FILE_UPLOAD_FIELD = document.querySelector("#import-field");
    window.FILE_MERGE_FIELD = document.querySelector("#merge-field");
    window.HIDDEN_ROW = document.querySelector("tbody>tr.hidden");
    window.WARNING = document.querySelector(".alert.warning");
    window.FAILURE = document.querySelector(".alert.failure");
    window.SUCCESS = document.querySelector(".alert.success");
    window.COUNTER = 0;
    window.BASE = "/v1/aspsps";
    window.BASE_URL = "";
    window.HIT_BUTTON = "NONE";
}
