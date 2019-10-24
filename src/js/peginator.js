function paginate(data) {
    let dataLength = data.length;
    let step = 10;
    let current = 0;
    let button = document.querySelector(".show-more");
    let total = document.querySelector(".total");

    addPage();
    total.innerHTML = dataLength;

    function addPage() {
        for (let limit = current + Math.min(step, dataLength); current < limit; current++) {
            buildRow(data[current]);
        }
        button.hidden = current >= dataLength;
    }

    button.addEventListener('click', addPage);
}
