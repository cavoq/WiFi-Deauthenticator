/*
* Implementation of main module.
*/

import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import Model from 'model/model';
import path from 'path';
import Controller from './controller/controller';

const createWindow = (model: Model) => {
  const win: BrowserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    darkTheme: true,
    icon: 'public/wlan-signal.png',
  });

  win.on('closed', () => {
    model.reset();
    app.quit();
  });

  win.loadFile('build/public/main.html');
};

const openMessageBox = (_event: Event, message: string) => {
  const options = {
    title: 'Unable to start scanning',
    message,
  };
  //dialog.showMessageBox(app.win, options);
};

app.whenReady().then(() => {
  const model: Model = new Model();
  const controller: Controller = new Controller(model);
  ipcMain.handle('initializeInterfaces', controller.getNetworkInterfaceControllers);
  ipcMain.handle('updateInterfaceSelection', controller.setInterfaceSelection);
  ipcMain.handle('updateInterfaceMac', controller.setInterfaceMac);
  ipcMain.handle('updateBandSelection', controller.setBandSelection);
  ipcMain.handle('startScanning', controller.model.scanAccessPoints);
  ipcMain.handle('getAccessPoints', controller.model.stopScanningAccessPoints);
  ipcMain.handle('openMessageBox', openMessageBox);
  createWindow(controller.model);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(controller.model);
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
