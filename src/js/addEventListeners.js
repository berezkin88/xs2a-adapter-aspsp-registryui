setTimeout(function () {
    initGlobals();
    document.querySelector("#add>button").addEventListener("click", addRow);
    document.querySelector("#import>button").addEventListener("click", () => FILE_UPLOAD_FIELD.click());
    FILE_UPLOAD_FIELD.addEventListener("change", upload);
}, 0)
