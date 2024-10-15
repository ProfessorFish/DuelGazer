process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

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

  ipcMain.handle("downloadCards", async () => {
    let req = await fetch("https://www.google.com");
    let json = await req.json();
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})