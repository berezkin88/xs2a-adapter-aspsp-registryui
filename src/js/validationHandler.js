
const VALIDATOR = {
    data: null
}

const validationResponseHandler = (data) => {
    VALIDATOR.data = data;
    
    if (!data) {
        fail("Oops... something went wrong. Please try again to validate");
        toggleModal();
        return;
    }

    let isValid = data.fileValidationReport.validationResult === "VALID";

    const spinner = document.querySelector(".spinner");
    const verdict = document.querySelector("#verdict");
    const report = document.querySelector(".validation-report");
    const duplicatesReport = document.querySelector(".duplicates-report");
    const amountNotValid = document.querySelector("#records-amount");
    const example = document.querySelector(".display");
    const amountDuplicates = document.querySelector("#entries-amount");
    const exampleDuplicates = document.querySelector(".display-duplicates");
    
    verdict.textContent = data.fileValidationReport.validationResult;
    spinner.classList.add("hidden");

    if (!isValid) {
        verdict.classList.add("valid", "not-valid");
        verdict.parentElement.classList.remove("hidden");
        
        if (data.fileValidationReport.aspspValidationErrorReports) {
            report.classList.remove("hidden");
            amountNotValid.textContent = data.fileValidationReport.totalNotValidRecords;
            example.textContent = buildString(data.fileValidationReport.aspspValidationErrorReports);
        }

        if (data.fileValidationReport.aspspEquivalentsReports) {
            duplicatesReport.classList.remove("hidden");
            amountDuplicates.textContent = data.fileValidationReport.equivalentRecords;
            exampleDuplicates.textContent = buildStringForDuplicates(data.fileValidationReport.aspspEquivalentsReports);
        }

        mergeOrUpload(data);
    } else {
        verdict.classList.replace("not-valid", "valid");
        verdict.parentElement.classList.remove("hidden");

        mergeOrUpload(data);
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

const buildStringForDuplicates = (input) => {
    let result = "";

    for (let i = 0, limit = Math.min(2, input.length); i < limit; i++) {
        let entity = input[i].aspsp;
        result += "Entities similar to this: \n";

        for (let field in entity) {
            result += "\t" + field + ": " + entity[field] + "\n";
        }

        result += "occur on lines: ";

        input[i].linesWithSimilarEntities.forEach(element => {
            result += " " + element + ",";
        });

        result = result.substr(0, result.length - 1) + "\n";
        result += "\n";
    }

    if (input[2]) {
        result += "\n... ";
    }

    return result;
}

const mergeOrUpload = (input) => {
    const merge = document.querySelector(".merge-request");
    const newRecords = document.querySelector("#new-records");
    const altered = document.querySelector("#altered");

    const upload = document.querySelector(".upload-request");
    const csvRecords = document.querySelector("#csv-quantity");
    const bdSize = document.querySelector("#db-size");

    if (HIT_BUTTON === "MERGE") {
        merge.classList.remove("hidden");

        newRecords.textContent = input.numberOfNewRecords;
        altered.textContent = `${input.difference.length} (${(input.difference.length / COUNTUP.endVal) * 100}%)`;
    } else if (HIT_BUTTON === "UPLOAD") {
        upload.classList.remove("hidden");

        csvRecords.textContent = input.csvFileRecordsNumber;
        bdSize.textContent = input.dbRecordsNumber;
    }
}
