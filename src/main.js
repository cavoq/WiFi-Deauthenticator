const { app, BrowserWindow, ipcMain } = require('electron');
const model = require('./model.js');
const os = require('os')
const path = require('path');
const { networkInterfaceController } = require('./networkInterfaceController.js');
const utils = require('./utils');


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
  ipcMain.handle('initializeInterfaces', getNetworkInterfaceControllers);
  ipcMain.handle('updateInterfaceSelection', updateInterfaceSelection);
  ipcMain.handle('updateInterfaceMac', updateInterfaceMac);
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

function getNetworkInterfaceControllers() {
  const interfaces = os.networkInterfaces();
  model.networkInterfaceControllers = [];
  for (const [address, interface] of Object.entries(interfaces)) {
    if (address === 'lo') {
      continue;
    }
    for (i = 0; i < interface.length; ++i) {
      if (interface[i].family === 'IPv4' && interface[i].internal === false) {
        interface[i].name = address;
        let nic = new networkInterfaceController(interface[i]);
        model.networkInterfaceControllers[address] = nic;
      }
    }
  }
  return Object.keys(model.networkInterfaceControllers);
}

function updateInterfaceSelection(_event, interface) {
  model.usedNetworkInterfaceController = model.networkInterfaceControllers[interface];
}

function updateInterfaceMac(_event, randomized) {
  model.macRandomized = randomized;
  if (model.macRandomized) {
    if (model.usedNetworkInterfaceController.changedMac) {
      return;
    }
    randomMac = utils.getRandomMac();
    model.usedNetworkInterfaceController.changeMac(randomMac);
  } else {
    model.usedNetworkInterfaceController.resetMac();
  }
  console.log(model.usedNetworkInterfaceController);
}
