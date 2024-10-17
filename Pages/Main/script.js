/**@type {HTMLButtonElement} */
const searchButton = document.getElementById("search");
const cardsButton = document.getElementById("cards");
const decksButton = document.getElementById("decks");

searchButton.onclick = function () {
    cardsButton.disabled = true;
    decksButton.disabled = true;
    searchButton.disabled = true;
    window.load.search();

    window.location.href = "../Search/index.html";

}

cardsButton.onclick = function () {
    cardsButton.disabled = true;
    decksButton.disabled = true;
    searchButton.disabled = true;
    window.load.cards();

    window.location.href = "../Cards/index.html";
}

decksButton.onclick = function () {
    cardsButton.disabled = true;
    decksButton.disabled = true;
    searchButton.disabled = true;
    window.load.decks();

    window.location.href = "../Decls/index.html";
}