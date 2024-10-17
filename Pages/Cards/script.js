/**@type {HTMLFormElement} */
const searchField = document.getElementById("searchbar");

searchField.onsubmit = async function (event) {
    event.preventDefault();
    console.log(event.target.searchinput.value);

    
}