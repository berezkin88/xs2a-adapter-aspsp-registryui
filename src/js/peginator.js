function paginate(data) {
    let dataLength = data.length;
    let step = 10;
    let current = 0;
    let button = document.querySelector(".show-more");
    let total = document.querySelector(".total");

    addPage();
    total.innerHTML = dataLength;

    function addPage() {
        for (limit = current + (step > dataLength ? dataLength : step); current < limit; current++) {
            buildRow(data[current]);
        }
        current < dataLength ? button.hidden = false : button.hidden = true;
    }

    button.addEventListener('click', addPage);
}
