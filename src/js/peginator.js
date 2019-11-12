let PAGINATOR = {
    data: null,
    page: 0,
    showMore: null,
    button: null,
    total: null,
    left: 0,
    size: 0
};

    // size is calculated with the consideration to have a user clicking on SHOW NEXT button
    // at most 10 times. E.g. if the total element quantity in the result set is 300, the size for
    // the next page request will be 30 and there can be only 10 requests ( 30 * 10 = 300 )
    PAGINATOR.setSize = (dataLength) => {
        PAGINATOR.size = (dataLength - 10) / 10 <= 10 ? Math.min(10, dataLength) : Math.floor((dataLength - 10) / 10) + 1;
    };

    PAGINATOR.create = (data, dataLength) => {

        PAGINATOR.page = 0;
        PAGINATOR.data = data;
        PAGINATOR.setSize(dataLength);
        PAGINATOR.left = dataLength;
        PAGINATOR.showMore = document.querySelector(".show-more");
        PAGINATOR.button = document.querySelector(".show-more>.more");
        PAGINATOR.total = document.querySelector(".total");

        PAGINATOR.total.innerHTML = dataLength;

        PAGINATOR.addRow(PAGINATOR.data);
    };

    PAGINATOR.addRow = (input) => {
        for (let iterator = 0, limit = input.length; iterator < limit; iterator++) {
            buildRow(input[iterator]);
            PAGINATOR.left--;
        }

        PAGINATOR.button.innerHTML = "show next " + Math.min(PAGINATOR.size, PAGINATOR.left);
        PAGINATOR.page++;
        PAGINATOR.showMore.hidden = PAGINATOR.left === 0;
    };
