const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('API', {
  getNetworkInterfaceControllers: () => ipcRenderer.invoke('initializeInterfaces'),
  updateInterfaceSelection: (interface) => ipcRenderer.invoke('updateInterfaceSelection', interface)
})
