function persist() {
    fetch("v1/aspsps/persist", {
        method: "POST"
    })
        .then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            success();
        })
        .catch(error => {
            console.log(error);
            operationFailed(); 
        })
}
