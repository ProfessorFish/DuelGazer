window.addEventListener('DOMContentLoaded', () => {

    let path = window.location.pathname.split("Pages")[1].split("/")[0];
    require("./Pages/" + path + "/preload.js")
});