function fail(message) {
    let messageBlock = FAILURE.querySelector(".message");
    messageBlock.textContent = message;
    
    setTimeout(() => { FAILURE.style.opacity = 1 }, 500);

    setTimeout(() => { FAILURE.style.opacity = 0 }, 8000);
}

function success() {
    setTimeout(() => { SUCCESS.style.opacity = 1 }, 500);

    setTimeout(() => { SUCCESS.style.opacity = 0 }, 8000);
}

function warning(message) {
    let messageBlock = WARNING.querySelector(".message");

    if (message) {
        messageBlock.textContent = message;
    }

    setTimeout(() => { WARNING.style.opacity = 1 }, 500);

    setTimeout(() => { WARNING.style.opacity = 0 }, 8000);
}
