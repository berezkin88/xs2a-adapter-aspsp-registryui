setTimeout(function() {
    const editButton = document.querySelector("[id^='edit']");
    const updateButton = document.querySelector("[id^='update']");
    const deleteButton = document.querySelector("[id^='delete']");
    
    let toggleButtons =
        function () {
    
            if (editButton.style.display === "none") {
                editButton.style.display = "inherit";
                updateButton.style.display = "none";
                deleteButton.style.display = "none";
            } else {
                editButton.style.display = "none";
                updateButton.style.display = "inherit";
                deleteButton.style.display = "inherit";
            }
        }
    
    document.querySelectorAll(".edit-cell>button").forEach(e => e.addEventListener("click", toggleButtons));
}, 1000)

// let toggleFunc = $(".edit-cell>button").click(function () {
//     $("#edit").toggle("fast");
//     $("#update").toggle("slow");
//     $("#delete").toggle("slow");
// })