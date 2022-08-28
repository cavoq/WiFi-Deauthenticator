const { app, BrowserWindow, ipcMain } = require('electron');
const model = require('./model.js')
const os = require('os')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('src/main.html');
};

app.whenReady().then(() => {
  ipcMain.handle('nicSelectInit', getNic);
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function getNic() {
  const interfaces = os.networkInterfaces();
  for (i = 0; i < interfaces.length; ++i) {
    console.log(interfaces[i]);
    model.networkInterfaceControllers.push(interfaces[i]);
  }
  return model.networkInterfaceControllers;
}