/**@type {HTMLButtonElement} */
const searchButton = document.getElementById("search");
const cardsButton = document.getElementById("cards");
const decksButton = document.getElementById("decks");

searchButton.onclick = function () {
    cardsButton.disabled = true;
    decksButton.disabled = true;
    searchButton.disabled = true;
    window.load.search();
}

cardsButton.onclick = function () {
    cardsButton.disabled = true;
    decksButton.disabled = true;
    searchButton.disabled = true;
    window.load.cards();
}

decksButton.onclick = function () {
    cardsButton.disabled = true;
    decksButton.disabled = true;
    searchButton.disabled = true;
    window.load.decks();
}