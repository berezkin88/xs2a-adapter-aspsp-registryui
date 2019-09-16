setTimeout(function () {
    initGlobals();
    document.querySelectorAll(".edit-cell>button").forEach(e => e.addEventListener("click", toggleButtons));
}, 0)
