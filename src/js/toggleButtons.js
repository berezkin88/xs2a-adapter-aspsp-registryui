function toggleButtons() {
    let editButton = document.querySelector("[id^='edit']");
    let updateButton = document.querySelector("[id^='update']");
    let deleteButton = document.querySelector("[id^='delete']");

    if (editButton.style.display === "none") {
        editButton.style.display = "inherit";
        updateButton.style.display = "none";
        deleteButton.style.display = "none";
        uneditableCells();
    } else {
        editButton.style.display = "none";
        updateButton.style.display = "inherit";
        deleteButton.style.display = "inherit";
        editableCells();
    }
}