function uploadFailed() {
    let failure = document.querySelector(".upload");

    setTimeout(() => { failure.style.opacity = 1 }, 500);

    setTimeout(() => { failure.style.opacity = 0 }, 8000);
}

function searchFailed() {
    let failure = document.querySelector(".failure.search");

    setTimeout(() => { failure.style.opacity = 1 }, 500);

    setTimeout(() => { failure.style.opacity = 0 }, 8000);
}
