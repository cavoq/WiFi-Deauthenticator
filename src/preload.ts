/*
* Preload file that exposes APIs for the backend communication.
*/

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('API', {
  getNetworkInterfaceControllers: () => ipcRenderer.invoke('getNetworkInterfaceControllers'),
  updateInterfaceSelection: (iface: string) => ipcRenderer.invoke('updateInterfaceSelection', iface),
  updateInterfaceMac: (randomized: boolean) => ipcRenderer.invoke('updateInterfaceMac', randomized),
  updateBandSelection: (bandValues: string[]) => ipcRenderer.invoke('updateBandSelection', bandValues),
  startScanning: () => ipcRenderer.invoke('startScanning'),
  getAccessPoints: () => ipcRenderer.invoke('getAccessPoints'),
});

contextBridge.exposeInMainWorld('MSG', {
  openMessageBox: (message: string) => ipcRenderer.invoke('openMessageBox', message),
});
