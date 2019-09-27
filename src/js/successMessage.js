function success() {
    let success = document.querySelector(".success")

    setTimeout(() => { success.style.opacity = 1 }, 500);

    setTimeout(() => { success.style.opacity = 0 }, 8000);
}
