const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('load', {
    cards: () => ipcRenderer.invoke("loadCards"),
    search: () => ipcRenderer.invoke("loadSearch"),
    decks: () => ipcRenderer.invoke("loadDecks"),
    card: (cardId) => ipcRenderer.invoke("loadCard", cardId)
})

contextBridge.exposeInMainWorld('search', {
    cards: (searchTerm) => ipcRenderer.invoke("searchCards", searchTerm)
})