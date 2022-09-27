/*
* Preload file that exposes APIs for the backend communication.
*/

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('API', {
  getNetworkInterfaceControllers: () => ipcRenderer.invoke('getNetworkInterfaceControllers'),
  setInterfaceSelection: (iface: string) => ipcRenderer.invoke('setInterfaceSelection', iface),
  setInterfaceMac: (randomized: boolean) => ipcRenderer.invoke('setInterfaceMac', randomized),
  setBandSelection: (bandValues: string[]) => ipcRenderer.invoke('setBandSelection', bandValues),
  startScanning: () => ipcRenderer.invoke('startScanning'),
  getAccessPoints: () => ipcRenderer.invoke('getAccessPoints'),
  setAccessPointSelection: (accessPoint: string) => ipcRenderer.invoke('setAccessPointSelection', accessPoint),
  startScanningClients: () => ipcRenderer.invoke('startScanningClients'),
  getClients: () => ipcRenderer.invoke('getClients'),
  setTargetSelection: (targets: string[]) => ipcRenderer.invoke('setTargetSelection', targets),
  startAttack: () => ipcRenderer.invoke('startAttack'),
  stopAttack: () => ipcRenderer.invoke('stopAttack'),
  validatePassword: (password: string) => ipcRenderer.invoke('validatePassword', password),
  grantAccess: (password: string) => ipcRenderer.invoke('grantAccess', password),
  handleTerminalStream: (callback: EventListener) => ipcRenderer.on('terminal-stream', callback),
});

contextBridge.exposeInMainWorld('MSG', {
  openMessageBox: (message: string) => ipcRenderer.invoke('openMessageBox', message),
});
