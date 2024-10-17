/**@type {HTMLFormElement} */
const searchField = document.getElementById("searchbar");

searchField.onsubmit = async function (event) {
    event.preventDefault();

    let cards = await window.search.cards(event.target.searchinput.value);

    console.log(cards);
}