/**@type {HTMLFormElement} */
const searchField = document.getElementById("searchbar");

const cardContainer = document.getElementsByClassName("cardcontainer")[0];

let searchTerm = "";

const options = {
    rootMargin: "0px",
    threshold: 0,
};
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(async (entry) => {
        if (entry.intersectionRatio) {
            page++;
            await loadCards(searchTerm, page)
        }
    });
}, options);

let loadButton;
let page = 0;
let pages = Infinity;


searchField.onsubmit = async function (event) {
    event.preventDefault();

    cardContainer.innerHTML = "";
    searchTerm = event.target.searchinput.value;
    page = 0;

    await loadCards(event.target.searchinput.value, page)
}

async function loadCards(searchTerm, page) {
    if (loadButton) observer.unobserve(loadButton);
    if (page >= pages) return;

    let [cards, totalCards, totalPages] = await window.search.cards(searchTerm, page);
    pages = totalPages;
    for (let card of cards) {
        for (let cardImage of card.card_images) {
            let card = await window.load.card(cardImage.id, 0);

            let divEle = document.createElement("div");
            divEle.innerHTML = `<img src="../../Resources/Cards/${cardImage.id}.jpg">`
            divEle.classList.add("card")
            cardContainer.appendChild(divEle)
        }
    }
    loadButton = cardContainer.lastChild
    observer.observe(loadButton);
}