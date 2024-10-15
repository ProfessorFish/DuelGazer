const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('load', {
  cards: ipcRenderer.invoke("downloadCards")
})