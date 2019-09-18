function greenButton(e) {
    let tableRow = e.parentElement.parentElement;

    if (tableRow.className) {
        if (window.confirm("Are you sure an aspsp is built right?")) {
            saveButton(e);
            console.log("saved");
        } else {
            return;
        }
    } else {
        if (window.confirm("Are you sure you want to update the aspsp?")) {
            updateButton(e);
            console.log("updated");
        } else {
            toggleButtons(e);
        }
    }
}
