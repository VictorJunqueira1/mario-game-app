const yesButton = document.querySelector("#yes-auth");
const noButton = document.querySelector("#no-auth");

yesButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isInvisible = document.querySelector(".container-auth:nth-child(2)").classList.contains("hidden");
    if (isInvisible) {
        document.querySelector(".container-auth:nth-child(2)").classList.remove("hidden");
        document.querySelector(".container-auth:nth-child(3)").classList.add("hidden");
    }
});


noButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isInvisible = document.querySelector(".container-auth:nth-child(3)").classList.contains("hidden");
    if (isInvisible) {
        document.querySelector(".container-auth:nth-child(3)").classList.remove("hidden");
        document.querySelector(".container-auth:nth-child(2)").classList.add("hidden");
    }
});