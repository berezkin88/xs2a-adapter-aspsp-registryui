function upload() {
    let file = FILE_UPLOAD_FIELD.files[0];
    let data = new FormData();

    data.append("file", file);

    fetch("/v1/aspsps/import", {
        method: 'POST',
        body: data
    }).catch(error => console.log(error))
}
