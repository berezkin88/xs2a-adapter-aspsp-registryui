setTimeout(function () {
    initGlobals();
    document.querySelector("#import>button").addEventListener("click", () => FILE_UPLOAD_FIELD.click());
    FILE_UPLOAD_FIELD.addEventListener("change", upload);
    document.querySelectorAll(".mdl-textfield__input").forEach(field => field.addEventListener('keypress', event => onEnterPress(event)));
}, 0);
