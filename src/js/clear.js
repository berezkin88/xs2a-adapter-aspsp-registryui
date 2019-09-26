function clearContent() {
    clearTable();

    document.querySelectorAll(".mdl-textfield__input").forEach(element => {element.value = ""; element.parentElement.classList.remove("is-dirty")});
}
