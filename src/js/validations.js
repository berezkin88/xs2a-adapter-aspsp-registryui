function validateBankName(element) {
    let target = element.textContent;
    let regex = /^[a-zA-Z0-9-\s]*$/;

    if (!(regex.test(target) || target === "")) {
        element.style.background = "rgba(255, 152, 0, 0.2)";
        element.classList.add("invalid");
        warning("Bank name should be a plain text, e.g. there shouldn't be symbols like #, @, *, %, etc.");
    } else {
        element.style.background = "none";
        element.classList.remove("invalid");
    }
}

function validateBic(element) {
    toUpper(element);
    let target = element.textContent;
    let regex = /^[A-Z0-9]*$/;
    let length = 11;

    if (!((target.length === length && regex.test(target)) || target === "")) {
        element.style.background = "rgba(255, 152, 0, 0.2)";
        element.classList.add("invalid");
        warning("BIC should be 11 characters long and consist of aA-zZ, 0-9");
    } else {
        element.style.background = "none";
        element.classList.remove("invalid");
    }
}

function validateUrl(element) {
    let target = element.textContent;
    let regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    if (!(regex.test(target) || target === "")) {
        element.style.background = "rgba(255, 152, 0, 0.2)";
        element.classList.add("invalid");
        warning("URL format is wrong, e.g. right format is https://example.test");
    } else {
        element.style.background = "none";
        element.classList.remove("invalid");
    }
}

function validateAdapterId(element) {
    let target = element.textContent;
    let regex = /^[a-zA-Z0-9-]*$/;

    if (!(regex.test(target) || target === "")) {
        element.style.background = "rgba(255, 152, 0, 0.2)";
        element.classList.add("invalid");
        warning("Adapter Id should consist of aA-zZ, 0-9 and a hyphen(-) only, e.g. 'Adapter-12345'");
    } else {
        element.style.background = "none";
        element.classList.remove("invalid");
    }
}

function validateBankCode(element) {
    let target = element.textContent;
    let regex = /^[0-9]*$/;
    let length = 8;

    if (!((target.length === length && regex.test(target)) || target === "")) {
        element.style.background = "rgba(255, 152, 0, 0.2)";
        element.classList.add("invalid");
        warning("Bank Code should consist of numbers only");
    } else {
        element.style.background = "none";
        element.classList.remove("invalid");
    }
}
