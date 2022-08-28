const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getNic: () => ipcRenderer.invoke('nicSelectInit')
})
