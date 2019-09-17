function redButton(e) {
    let tableRow = e.parentElement.parentElement;

    if (tableRow.className) {
        purgeRow(e);
        console.log("row purged off");
    } else {
        deleteButton(e);
        console.log("data deleted");
    }
}
