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
      preload: path.join(__dirname, './Pages/Main/preload.js')
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
    await downloadCards();
  })

  ipcMain.handle("loadSearch", async () => {
    //TODO: Load the search user screen
  })

  ipcMain.handle("loadCards", async () => {
    //TODO: Load the decks screen
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

async function downloadCards() {
  if (!fs.existsSync("./Data")) fs.mkdirSync("./Data");
  let fileExists = fs.existsSync("./Data/cards.json");
  let req = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
  let json = await req.json();

  let formattedCardData = formatCardData(json.data)
  let stringedJson = JSON.stringify(formattedCardData);

  if (!fileExists) {
    fs.writeFileSync("./Data/cards.json", stringedJson);
    return true;
  }

  let fileContents = fs.readFileSync("./Data/cards.json").toString();

  if (fileContents !== stringedJson) {
    fs.writeFileSync("./Data/cards.json", stringedJson);
  }

  return true;
}

function formatCardData(data) {
  let out = {};

  for (let card of data) {
    delete card.card_prices;
    for (let cardId of card.card_images) {
      if (cardId.id !== card.id) out[cardId.id] = card.id;
      else out[cardId.id] = card;
    }
  }
  return out;
}