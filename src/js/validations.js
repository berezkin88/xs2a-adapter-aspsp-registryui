function validateBankName(element) {
    let target = element.textContent;
    let regex = /^[\w\s\WäöüÄÖÜß]+$/;

    if (!regex.test(target)) {
        element.classList.add("invalid");
        warning("Bank name should be a plain text, e.g. there shouldn't be symbols like #, @, *, %, etc.");
    } else {
        element.classList.remove("invalid");
    }
}

function validateBic(element) {
    toUpper(element);
    let target = element.textContent;
    let regex = /^[A-Z]{6}([A-Z0-9]{2})?([A-Z0-9]{5})?$/;

    if (!regex.test(target)) {
        element.classList.add("invalid");
        if (!element.parentElement.cells[5].classList.contains("invalid")) {
            validateBankCode(element.parentElement.cells[5]);
            return;
        }
        warning("BIC should be 6, 8 or 11 characters long and consist of word characters and numbers only");
    } else {
        element.parentElement.cells[5].classList.remove("invalid");
        element.classList.remove("invalid");
    }
}

function validateUrl(element) {
    let target = element.textContent;
    let regex = /(https|http):\/\/[\w\-]+\.[^\n\r]+$/;

    if (!regex.test(target) && !(target === "" && element.classList.contains("idp-url"))) {
        element.classList.add("invalid");
        warning("URL format is wrong, e.g. right format is https://example.test");
    } else {
        element.classList.remove("invalid");
    }
}

function validateAdapterId(element) {
    let target = element.textContent;
    let regex = /^\w+-adapter$/;

    if (!regex.test(target)) {
        element.classList.add("invalid");
        warning("Adapter Id should consist of aA-zZ, 0-9 and a hyphen(-) only, e.g. 'Adapter-12345'");
    } else {
        element.classList.remove("invalid");
    }
}

function validateBankCode(element) {
    let target = element.textContent;
    let regex = /^\d{8}$/;

    if (!regex.test(target)) {
        element.classList.add("invalid");
        if (!element.parentElement.cells[2].classList.contains("invalid")) {
            validateBic(element.parentElement.cells[2]);
            return;
        }
        warning("Bank Code should be 8 digits long and consist of numbers only");
    } else {
        element.parentElement.cells[2].classList.remove("invalid");
        element.classList.remove("invalid");
    }
}
