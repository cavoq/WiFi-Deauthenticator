const { app, BrowserWindow, ipcMain } = require('electron');
const model = require('./model.js');
const path = require('path');
const { nativeTheme } = require('electron/main');
const { dialog } = require('electron')


const createWindow = (appModel) => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.on('closed', () => {
    appModel.reset();
    app.quit();
  });

  win.loadFile('src/main.html');
};

app.whenReady().then(() => {
  const appModel = new model.model();
  ipcMain.handle('initializeInterfaces', appModel.getNetworkInterfaceControllers);
  ipcMain.handle('updateInterfaceSelection', appModel.updateInterfaceSelection);
  ipcMain.handle('updateInterfaceMac', appModel.updateInterfaceMac);
  ipcMain.handle('updateBandSelection', appModel.updateBandSelection);
  ipcMain.handle('getAccessPoints', appModel.scanAccessPoints);
  ipcMain.handle('openMessageBox', openMessageBox);
  createWindow(appModel);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(appModel);
      nativeTheme.themeSource = 'dark'
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

openMessageBox = (_event, message) => {
  const options = {
    message: message,
  }
  dialog.showMessageBox(app.win, options);
}