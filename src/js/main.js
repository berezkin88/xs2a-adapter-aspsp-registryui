//=require uneditableCells.js
//=require toggleButtons.js
//=require editableCells.js

setTimeout(function () {
    document.querySelectorAll(".edit-cell>button").forEach(e => e.addEventListener("click", toggleButtons));
}, 1000)