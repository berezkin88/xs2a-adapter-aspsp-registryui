function greenButton(e) {
    let tableRow = e.parentElement.parentElement;

    if (tableRow.className) {
        saveButton(e);
        console.log("saved");
    } else {
        updateButton(e);
        console.log("updated");
    }
}
