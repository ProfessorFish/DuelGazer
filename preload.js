const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('load', {
    cards: () => ipcRenderer.invoke("loadCards"),
    search: () => ipcRenderer.invoke("loadSearch"),
    decks: () => ipcRenderer.invoke("loadDecks"),
})

contextBridge.exposeInMainWorld('search', {
    cards: (searchTerm) => ipcRenderer.invoke("searchCards", searchTerm)
})