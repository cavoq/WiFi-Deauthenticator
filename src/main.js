/* eslint-disable new-cap */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

/*
* Implementation of main module.
*/

const { app, BrowserWindow, ipcMain } = require('electron');
const { path } = require('path');
const { dialog } = require('electron');
const { model } = require('./model/model.js');

const createWindow = (appModel) => {
  const win = new BrowserWindow({
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
    appModel.reset();
    app.quit();
  });

  win.loadFile('src/main.html');
};

const openMessageBox = (_event, message) => {
  const options = {
    title: 'Unable to start scanning',
    message,
  };
  dialog.showMessageBox(app.win, options);
};

app.whenReady().then(() => {
  const appModel = new model();
  ipcMain.handle('initializeInterfaces', appModel.getNetworkInterfaceControllers);
  ipcMain.handle('updateInterfaceSelection', appModel.updateInterfaceSelection);
  ipcMain.handle('updateInterfaceMac', appModel.updateInterfaceMac);
  ipcMain.handle('updateBandSelection', appModel.updateBandSelection);
  ipcMain.handle('startScanning', appModel.scanAccessPoints);
  ipcMain.handle('getAccessPoints', appModel.stopScanningAccessPoints);
  ipcMain.handle('openMessageBox', openMessageBox);
  createWindow(appModel);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(appModel);
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
