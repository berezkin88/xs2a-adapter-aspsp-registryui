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
