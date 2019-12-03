const bankName = (element) => {
    let target = element.textContent;

    if (target === "") {
        element.classList.add("invalid");
        warning("Bank name should not be empty");
    } else {
        element.classList.remove("invalid");
    }
}

const bic = (element) => {
    toUpper(element);
    let target = element.textContent;
    let regex = /^[A-Z]{6}([A-Z0-9]{2})?([A-Z0-9]{5})?$/;

    if (!regex.test(target)) {
        element.classList.add("invalid");
        if (!element.parentElement.cells[5].classList.contains("invalid")) {
            validateBankCode(element.parentElement.cells[5]);
            return;
        }
        warning("BIC should be 6, 8 or 11 characters long and consist of word characters and numbers only and not empty");
    } else {
        element.parentElement.cells[5].classList.remove("invalid");
        element.classList.remove("invalid");
    }
}

const url = (element) => {
    let target = element.textContent;
    let regex = /(https|http):\/\/[\w\-]+\.[^\n\r]+$/;

    if (!regex.test(target) && !(target === "" && element.classList.contains("idp-url"))) {
        element.classList.add("invalid");
        warning("URL format is wrong, e.g. right format is https://example.test, or field is empty");
    } else {
        element.classList.remove("invalid");
    }
}

const adapterId = (element) => {
    let target = element.textContent;
    let regex = /^\w+-adapter$/;

    if (!regex.test(target)) {
        element.classList.add("invalid");
        warning("Adapter Id should consist of a-z, A-Z, 0-9, a hyphen(-) only and ends with '...-adapter', e.g. '12345-adapter', and should not be emoty");
    } else {
        element.classList.remove("invalid");
    }
}

const bankCode = (element) => {
    let target = element.textContent;
    let regex = /^\d{8}$/;

    if (!regex.test(target)) {
        element.classList.add("invalid");
        if (!element.parentElement.cells[2].classList.contains("invalid")) {
            validateBic(element.parentElement.cells[2]);
            return;
        }
        warning("Bank Code should be 8 digits long and consist of numbers only and not empty");
    } else {
        element.parentElement.cells[2].classList.remove("invalid");
        element.classList.remove("invalid");
    }
}

const validate = (rule, target) => {
    rule(target);
}
