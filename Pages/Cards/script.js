/**@type {HTMLFormElement} */
const searchField = document.getElementById("searchbar");

searchField.onsubmit = async function (event) {
    event.preventDefault();

    let cards = await window.search.cards(event.target.searchinput.value);

    for (let card of cards) {
        for(let cardImage of card.card_images) {
            let card = await window.load.card(cardImage.id);
        }   
    }
}