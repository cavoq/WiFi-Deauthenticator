/*
* Preload file that exposes APIs for the backend communication.
*/

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('API', {
  getNetworkInterfaceControllers: () => ipcRenderer.invoke('getNetworkInterfaceControllers'),
  updateInterfaceSelection: (iface: string) => ipcRenderer.invoke('setInterfaceSelection', iface),
  updateInterfaceMac: (randomized: boolean) => ipcRenderer.invoke('setInterfaceMac', randomized),
  updateBandSelection: (bandValues: string[]) => ipcRenderer.invoke('setBandSelection', bandValues),
  startScanning: () => ipcRenderer.invoke('startScanning'),
  getAccessPoints: () => ipcRenderer.invoke('getAccessPoints'),
});

contextBridge.exposeInMainWorld('MSG', {
  openMessageBox: (message: string) => ipcRenderer.invoke('openMessageBox', message),
});
