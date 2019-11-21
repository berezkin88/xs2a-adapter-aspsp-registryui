
const VALIDATOR = {
    data: null
}

const validationResponseHandler = (data) => {
    VALIDATOR.data = data;

    let isValid = data.validationResult === "VALID";

    const verdict = document.querySelector("#verdict");
    const amount = document.querySelector("#records-amount");
    const example = document.querySelector(".display");
    const spinner = document.querySelector(".spinner");

    if (!data) {
        fail("Oops... something went wrong. Please try again to validate");
        toggleModal();
        return;
    }
    
    verdict.textContent = data.validationResult;
    spinner.classList.add("hidden");

    if (!isValid) {
        verdict.classList.add("not-valid");
        verdict.parentElement.classList.remove("hidden");
        amount.parentElement.classList.remove("hidden");
        example.classList.remove("hidden");
        document.querySelector(".example").classList.remove("hidden");
        amount.textContent = data.totalNotValidRecords;

        example.textContent = buildString(data.aspspValidationErrorReports);
    } else {
        verdict.classList.add("valid");
        verdict.parentElement.classList.remove("hidden");
        amount.parentElement.classList.add("hidden");
        example.classList.add("hidden");
        document.querySelector(".example").classList.add("hidden");
    }

}

const buildString = (input) => {
    let result = "";

    for (let i = 0, limit = Math.min(3, input.length); i < limit; i++) {
        result += "line number: " + input[i].lineNumberInCsv + "\n"
            + "validation errors: \n";

        input[i].validationErrors.forEach(element => {
            result += "\t" + element + "\n";
        });

        result += "\n";
    }

    if (input[3]) {
        result += "\n... ";
    }

    return result;
}