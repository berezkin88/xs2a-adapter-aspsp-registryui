setTimeout(function () {
    initGlobals();
    document.querySelector("#upload>button").addEventListener("click", () => FILE_UPLOAD_FIELD.click());
    FILE_UPLOAD_FIELD.addEventListener("change", validate);
    document.querySelector("#merge>button").addEventListener("click", () => FILE_MERGE_FIELD.click());
    FILE_MERGE_FIELD.addEventListener("change", merge);
    document.querySelectorAll(".mdl-textfield__input").forEach(field => field.addEventListener('keypress', event => onEnterPress(event)));
}, 0);
