let PAGINATOR = {
    data: null,
    page: 0,
    showMore: null,
    button: null,
    total: null,
    // used as a current iteretor until advansed pagination will be provided
    left: 0,
    step: 0
};

    PAGINATOR.setStep = (dataLength) => {
        PAGINATOR.step = dataLength / 10 <= 10 ? 10 : Math.floor(dataLength / 10) + 1;
    };

    PAGINATOR.create = (data, dataLength) => {

        PAGINATOR.left = 0;
        PAGINATOR.page = 0;
        PAGINATOR.data = data;
        PAGINATOR.setStep(dataLength);
        // No need until advanced pagination provided
        // PAGINATOR.left = dataLength;
        PAGINATOR.showMore = document.querySelector(".show-more");
        PAGINATOR.button = document.querySelector(".show-more>.more");
        PAGINATOR.total = document.querySelector(".total");

        PAGINATOR.total.innerHTML = dataLength;
        PAGINATOR.button.innerHTML = "show next " + PAGINATOR.step;

        PAGINATOR.addRow(PAGINATOR.data);
    };

    //TODO alter loop with uncommenting 'limit' and replacing 'step' with 'limit' and set increment to 'iterator++'
    PAGINATOR.addRow = (input) => {
        for (/*let iterator = 0, limit = Math.min(PAGINATOR.step, PAGINATOR.left);*/let limit = PAGINATOR.left + Math.min(PAGINATOR.step, (PAGINATOR.data.length - PAGINATOR.left)); PAGINATOR.left < limit /* ! */; PAGINATOR.left++) {
            // TODO make 'input[iterator]' when appropriate pagination will be done
            buildRow(input[PAGINATOR.left]);
            // TODO uncomment this line when appropriate pagination will be done
            // PAGINATOR.left--;
        }

        PAGINATOR.page++;
        // TODO replace with 'PAGINATOR.showMore.hidden = PAGINATOR.left === 0;' when advanced paginator is provided
        PAGINATOR.showMore.hidden = PAGINATOR.left >= PAGINATOR.data.length;
    };
