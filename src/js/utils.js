const toUpper = (element) => {
    element.innerText = element.innerText.toUpperCase();
}

const forceValidation = () => {
    let rows = document.querySelectorAll("tr");
    const makeValid = (element) => {
        if (element.classList.contains("invalid")) {
            element.classList.remove("invalid");
        }
    }

    rows.forEach((row) => {
        if (!row.classList.contains("hidden")) {
            for (let cell of row.cells) {
                makeValid(cell);
            }
        }
    })

}

// Manipulating cells
const uneditableCells = (e) => {
    let rowCells = e.parentElement.parentElement.cells;
    let approach = e.parentElement.parentElement.querySelectorAll('input');

    for (let i = 1, till = (rowCells.length - 1); i < till; i++) {
        rowCells[i].removeAttribute("contenteditable");
    }

    approach.forEach(element => {
        element.disabled = true;
    })
}

const editableCells = (e) => {
    let rowCells = e.parentElement.parentElement.cells;
    let approach = e.parentElement.parentElement.querySelectorAll('input');

    for (let i = 1, till = (rowCells.length - 2); i < till; i++) {
        rowCells[i].setAttribute("contenteditable", true);
    }

    approach.forEach(element => {
        element.disabled = false;
    })
}
// End of cells part

// Manipulating tables
const showTable = () => {
    let table = HIDDEN_ROW.parentElement.parentElement.parentElement;
    let message = document.querySelector(".welcome-message");

    table.hidden = false;
    message.hidden = true;
}

const clearTable = () => {
    let body = document.querySelectorAll("tbody>tr");

    if (body.length > 1) {
        body.forEach(e => { if (!e.className) { e.remove(); } })
    }
}

const checkMorePart = () => {
    let showMore = document.querySelector(".show-more");

    if (!showMore.hidden) {
        showMore.hidden = true;
    }
}

const clearContent = () => {
    clearTable();
    checkMorePart();

    document.querySelectorAll(".mdl-textfield__input").forEach(element => { element.value = ""; element.parentElement.classList.remove("is-dirty") });
}
// End of table part

const onEnterPress = (event) => {
    if (event.keyCode === 13) {
        searchButton();
    }
}

const addTooltips = (e) => {
    let editId = "edit-";
    let updateId = "update-";
    let deleteId = "delete-";
    
    if (e.className.indexOf("edit") > -1) {
        let helper = e.parentNode.childNodes[7];
        
        e.addEventListener("click", () => { editButton(e) });
        e.setAttribute("id", editId + COUNTER);
        
        helper.setAttribute("data-mdl-for", editId + COUNTER);
        helper.setAttribute("class", "mdl-tooltip mdl-tooltip--top");
    }
    
    if (e.className.indexOf("update") > -1) {
        let helper = e.parentNode.childNodes[9];
        
        e.addEventListener("click", () => { greenButton(e) });
        e.setAttribute("id", updateId + COUNTER);
        
        helper.setAttribute("data-mdl-for", updateId + COUNTER);
        helper.setAttribute("class", "mdl-tooltip mdl-tooltip--top");
    }
    
    if (e.className.indexOf("delete") > -1) {
        let helper = e.parentNode.childNodes[11];
        
        e.addEventListener("click", () => { redButton(e) });
        e.setAttribute("id", deleteId + COUNTER);
        
        helper.setAttribute("data-mdl-for", deleteId + COUNTER);
        helper.setAttribute("class", "mdl-tooltip mdl-tooltip--top");
    }
}

// Manipulating rows
const purgeRow = (e) => {
    let tableRow = e.parentElement.parentElement;

    tableRow.remove();
}

const assembleRowData = (e) => {
    let row = e.parentNode.parentNode;

    let object = {};
    object.id = row.cells[0].textContent;
    object.name = row.cells[1].textContent;
    object.bic = row.cells[2].textContent;
    object.url = row.cells[3].textContent;
    object.adapterId = row.cells[4].textContent;
    object.bankCode = row.cells[5].textContent;
    object.idpUrl = row.cells[6].textContent;
    object.scaApproaches = approachParser(row.cells[7]);

    return JSON.stringify(object);

    function approachParser (data) {
        let inputs = data.querySelectorAll("input");
        let resultString = [];

        inputs.forEach((element) => {
            if (element.checked) {
                resultString.push(element.name);
            }
        });

        return resultString;
    }
}

const buildRow = (data) => {
    let clone = HIDDEN_ROW.cloneNode(true);
    clone.removeAttribute("class");

    clone.cells[0].textContent = data.id;
    clone.cells[1].textContent = data.name;
    clone.cells[2].textContent = data.bic;
    clone.cells[3].textContent = data.url;
    clone.cells[4].textContent = data.adapterId;
    clone.cells[5].textContent = data.bankCode;
    clone.cells[6].textContent = data.idpUrl;
    approachParser(data.scaApproaches, clone.cells[7]);

    clone.lastElementChild.childNodes.forEach(e => {
        if (e.className) {
            addTooltips(e)
        }
    });
    document.querySelector("table>tbody").appendChild(clone);

    COUNTER++;

    // updating MDL library for making Tooltip working
    componentHandler.upgradeAllRegistered();

    function approachParser(data, cell) {
        if (!data) {
            return;
        }

        let inputs = cell.querySelectorAll("input");

        data.forEach(element => {
            switch (element) {
                case "EMBEDDED":
                    inputs[0].checked = true;
                    break;
                case "REDIRECT":
                    inputs[1].checked = true;
                    break;
                case "DECOUPLED":
                    inputs[2].checked = true;
                    break;
                case "OAUTH":
                    inputs[3].checked = true;
                    break;
            }
        })
    }
}
// End of row part

const toggleModal = () => {
    const modal = document.querySelector(".validation-layout");
    
    modal.classList.toggle("hidden");

    showSpinner();
}

const showSpinner = () => {
    const spinner = document.querySelector(".spinner");
    const verdict = document.querySelector(".verdict");
    const verdictReport = document.querySelector(".validation-report");
    const merge = document.querySelector(".merge-request");
    const upload = document.querySelector(".upload-request");

    verdict.classList.add("hidden");
    verdictReport.classList.add("hidden");
    merge.classList.add("hidden");
    upload.classList.add("hidden");

    spinner.classList.remove("hidden");
}

const createFile = (data, fileName, fileFormat) => {

    let virtualUrl = null;
    let temp = null;

    if (fileFormat === "json") {
        temp = new Blob([JSON.stringify(data)]);
        virtualUrl = URL.createObjectURL(temp); 
    } else {
        temp = new Blob([data], {type: 'text/csv;charset=utf-8;'});
        virtualUrl = URL.createObjectURL(temp);
    }

    const virtualLink = document.createElement("a");
     
    virtualLink.href = virtualUrl;
    virtualLink.download = fileName + "." + fileFormat;
    virtualLink.click();
}