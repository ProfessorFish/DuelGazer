/**@type {HTMLFormElement} */
const searchField = document.getElementById("searchbar");

const cardContainer = document.getElementsByClassName("cardcontainer")[0];

searchField.onsubmit = async function (event) {
    event.preventDefault();

    cardContainer.innerHTML = "";

    let cards = await window.search.cards(event.target.searchinput.value);

    for (let card of cards) {
        for (let cardImage of card.card_images) {
            let card = await window.load.card(cardImage.id, 0);

            let divEle = document.createElement("div");
            divEle.innerHTML = `<img src="../../Resources/Cards/${cardImage.id}.jpg">`
            divEle.classList.add("card")
            cardContainer.appendChild(divEle)
        }
    }
}