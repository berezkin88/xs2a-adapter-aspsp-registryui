function paginate(data, dataLength, url) {
    let size = (dataLength - 10) / 10 <= 10 ? 10 : Math.floor((dataLength - 10) / 10);
    let left = dataLength;
    let page = 0;
    let showMore = document.querySelector(".show-more");
    let button = document.querySelector(".show-more>.more");
    let total = document.querySelector(".total");

    addPage(data);
    total.innerHTML = dataLength;
    button.innerHTML = "show next " + size;

    function addPage(input) {
        for (let iterator = 0, limit = Math.min(size, left); iterator < limit; iterator++) {
            buildRow(input[iterator]);
            left--;
        }

        showMore.hidden = left === 0;
    }

    button.addEventListener('click', delegate);

    function delegate() {
        innerSearch(url + "&page=" + (++page) + "&size=" + size)
    }

    function innerSearch(URI) {
        fetch(URI).then(response => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response;
        }).then(response => response.text()
        ).then(response => addPage(JSON.parse(response))
        ).catch(() => {
            fail("Failed to retrieve more search results... Please retry later");
            page--;
        });
    }
}
