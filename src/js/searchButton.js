function search() {
    let data = document.querySelector(".search-form");
    let url = "http://localhost:8999/v1/aspsps/?";

    if (data[0].value !== "")
        url += "name=" + data[0].value + "&";
    
    if (data[1].value !== "")
        url += "bic=" + data[1].value + "&";

    if (data[2].value !== "")
        url += "bankCode=" + data[2].value;

    // let output = fetch(url).then(response => response.json());
    // output.forEach((node) => buildRow(node));

    let mockRawData = '[{"id":"40885a41-339e-4c92-a43f-77264bc6059c","name":"Sparkasse Burbach-Neunkirchen","bic":"WELADED1BUB","bankCode":"46051240","url":"https://xs2a-sandbox.f-i-apim.de:8444/fixs2a-env/xs2a-api/12345678","adapterId":"sparkasse-adapter","paginationId":"0:1.0"},{"id":"1edbdcff-ce4a-42ad-a0a5-dd4767ae0443","name":"Sparkasse Vorpommern","bic":"NOLADE21GRW","bankCode":"15050500","url":"https://xs2a-sandbox.f-i-apim.de:8444/fixs2a-env/xs2a-api/12345678","adapterId":"sparkasse-adapter","paginationId":"1:1.0"},{"id":"4d18ff59-fd1e-4e1d-adbc-d2f58a757df7","name":"VB B.Drib.-Brakel-Steinh.e","bic":"GENODEM1BOT","bankCode":"47267216","url":"https://xs2a-test.fiduciagad.de/xs2a","adapterId":"fiducia-adapter","paginationId":"2:1.0"},{"id":"872fe1c4-dff7-4e8a-84f1-cf2b07640d1e","name":"Landessparkasse zu Oldenburg","bic":"SLZODE22XXX","bankCode":"28050100","url":"https://xs2a-sandbox.f-i-apim.de:8444/fixs2a-env/xs2a-api/12345678","adapterId":"sparkasse-adapter","paginationId":"3:1.0"},{"id":"5f3a66d6-175b-457b-a81c-e533160848b6","name":"Volksbank Schwarzwald Baar Hegau","bic":"GENODE61VS1","bankCode":"69490000","url":"https://xs2a-test.fiduciagad.de/xs2a","adapterId":"fiducia-adapter","paginationId":"4:1.0"},{"id":"457089d0-f926-4786-b345-92b7e16cafda","name":"VR PLUS Altmark-Wendland eG","bic":"GENODEF1LCH","bankCode":"","url":"https://xs2a-test.fiduciagad.de/xs2a","adapterId":"fiducia-adapter","paginationId":"5:1.0"},{"id":"64a7c636-6a85-4a2d-af35-e46cc8bc0b10","name":"Volksbank Sauerland eG","bic":"GENODEM1SRL","bankCode":"46461126","url":"https://xs2a-test.fiduciagad.de/xs2a","adapterId":"fiducia-adapter","paginationId":"6:1.0"},{"id":"7234d7b1-88d2-46ae-af3f-4f0cc13b5a38","name":"Kreissparkasse Gelnhausen","bic":"HELADEF1GEL","bankCode":"50750094","url":"https://xs2a-sandbox.f-i-apim.de:8444/fixs2a-env/xs2a-api/12345678","adapterId":"sparkasse-adapter","paginationId":"7:1.0"},{"id":"398f9231-8f25-49cd-95ba-f9977803a295","name":"Sparkasse Gera-Greiz","bic":"HELADEF1GER","bankCode":"83050000","url":"https://xs2a-sandbox.f-i-apim.de:8444/fixs2a-env/xs2a-api/12345678","adapterId":"sparkasse-adapter","paginationId":"8:1.0"},{"id":"0b876747-a443-40f3-b7a1-4eda85b04a0d","name":"VR-Bank Gerolzhofen","bic":"GENODEF1GZH","bankCode":"79362081","url":"https://xs2a-test.fiduciagad.de/xs2a","adapterId":"fiducia-adapter","paginationId":"9:1.0"}]';

    let mockJson = JSON.parse(mockRawData);

    mockJson.forEach((node) => buildRow(node));

    if (HIDDEN_ROW.parentElement.parentElement.hidden) {
        showTable();
    }
}