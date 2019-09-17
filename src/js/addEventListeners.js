setTimeout(function () {
    initGlobals();
    document.querySelector(".edit-cell>button.edit").addEventListener("click", function () { editButton(this) });
    document.querySelector(".edit-cell>button.update").addEventListener("click", function () { greenButton(this) });
    document.querySelector(".edit-cell>button.delete").addEventListener("click", function () { redButton(this) });
    document.querySelector("#add>button").addEventListener("click", addRow);
}, 0)
