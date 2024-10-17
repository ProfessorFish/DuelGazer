const { app, BrowserWindow, ipcMain } = require('electron/main');
const fs = require("node:fs");
const fetch = require("node-fetch");
const path = require('node:path');

function createWindow() {
  const win = new BrowserWindow({
    width: 550,
    height: 400,
    icon: "./Resources/Application/DuelGazer.png",
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: "#090909",
      symbolColor: "#FFF",
      height: 30
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./Pages/Main/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  ipcMain.handle("loadCards", async () => {
    return true;
    //await downloadCards();
  })

  ipcMain.handle("loadSearch", async () => {
    //TODO: Load the search user screen
  })

  ipcMain.handle("loadDecks", async () => {
    //TODO: Load the decks screen
  })

  ipcMain.handle("searchCards", async (event, searchTerm) => {
    let cards = JSON.parse(fs.readFileSync("./Data/cards.json"));
    let map = JSON.parse(fs.readFileSync("./Data/names.json"))
    let names = Object.keys(map);
    let ids = Object.values(map);

    return names.filter(
      k => k.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(
      k => cards[map[k]]
    ).concat(ids.filter(
      k => k.toString().includes(searchTerm)
    ).map(k => fetchCard(k, cards)));
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function fetchCard(id, cards) {
  let cardData = cards[id];

  while (typeof cardData === "number") {
    cardData = cards[cardData];
  }

  return cardData;
}

async function downloadCards() {
  if (!fs.existsSync("./Data")) fs.mkdirSync("./Data");

  let req = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
  let json = await req.json();

  let [formattedCardData, formattedNameData] = formatCardData(json.data)
  let stringedCards = JSON.stringify(formattedCardData);
  let stringedNames = JSON.stringify(formattedNameData);

  fs.writeFileSync("./Data/cards.json", stringedCards);
  fs.writeFileSync("./Data/names.json", stringedNames);


  return true;
}

function formatCardData(data) {
  let cardOut = {};
  let nameOut = {};

  for (let card of data) {
    delete card.card_prices;
    nameOut[card.name] = card.id;
    for (let cardId of card.card_images) {
      if (cardId.id !== card.id) cardOut[cardId.id] = card.id;
      else cardOut[cardId.id] = card;
    }
  }
  return [cardOut, nameOut];
}