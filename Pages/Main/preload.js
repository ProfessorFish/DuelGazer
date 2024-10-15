const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('load', {
  cards: () => ipcRenderer.invoke("loadCards"),
  search: () => ipcRenderer.invoke("loadSearch"),
  decks: () => ipcRenderer.invoke("loadDecks")
})