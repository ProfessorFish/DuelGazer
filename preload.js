const { contextBridge, ipcRenderer } = require('electron')

module.exports = function () {
  contextBridge.exposeInMainWorld('load', {
    cards: () => ipcRenderer.invoke("loadCards"),
    search: () => ipcRenderer.invoke("loadSearch"),
    decks: () => ipcRenderer.invoke("loadDecks")
  })
}