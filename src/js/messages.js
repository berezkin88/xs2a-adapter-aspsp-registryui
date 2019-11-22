function fail(message) {
    showMessage(FAILURE, 8000, message);
}

function success(message) {
    showMessage(SUCCESS, 8000, message);
}

function warning(message) {
    showMessage(WARNING, 8000, message);
}

const showMessage = (messageType, duration, message) => {
    let messageBlock = messageType.querySelector(".message");

    messageBlock.textContent = message;

    setTimeout(() => { messageType.style.opacity = 1 }, 500);

    setTimeout(() => { messageType.style.opacity = 0 }, duration);
}
