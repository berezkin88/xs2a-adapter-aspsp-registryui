function greenButton(e) {
    let tableRow = e.parentElement.parentElement;

    if (tableRow.className) {
        if (window.confirm("Are you sure to save the new entry?")) {
            saveButton(e);
        }
    } else {
        if (window.confirm("Are you sure you want to update the aspsp?")) {
            updateButton(e);
        } else {
            toggleButtons(e);
        }
    }
}
