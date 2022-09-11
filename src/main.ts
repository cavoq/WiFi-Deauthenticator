/*
* Implementation of main module.
*/

import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import Model from './model/model';
import path from 'path';
import Controller from './controller/controller';

class Main {
  controller: Controller;
  mainWindow: BrowserWindow | undefined;
  application: Electron.App;

  constructor(application: Electron.App, controller: Controller) {
    this.controller = controller;
    this.application = application;
  }

  openMessageBox(_event: Event, message: string) {
    const options = {
      title: 'Unable to start scanning',
      message,
    };
    if (!this.mainWindow) {
      return;
    }
    dialog.showMessageBox(this.mainWindow, options);
  }

  addHandlers() {
    ipcMain.handle('getNetworkInterfaceControllers', this.controller.getNetworkInterfaceControllers);
    ipcMain.handle('setInterfaceSelection', this.controller.setInterfaceSelection);
    ipcMain.handle('setInterfaceMac', this.controller.setInterfaceMac);
    ipcMain.handle('setBandSelection', this.controller.setBandSelection);
    ipcMain.handle('startScanning', this.controller.model.scanAccessPoints);
    ipcMain.handle('getAccessPoints', this.controller.getAccessPoints);
    ipcMain.handle('openMessageBox', this.openMessageBox);
  }

  createWindow() {
    this.mainWindow = new BrowserWindow(
      {
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true,
          preload: path.join(__dirname, 'preload.js'),
        },
        darkTheme: true,
        icon: 'public/wlan-signal.png',
      })
    this.mainWindow.on('closed', () => {
      this.controller.model.reset();
      this.application.quit();
    });
    this.mainWindow.loadFile('public/main.html');
  }

  initialize() {
    this.application.whenReady().then(() => {
      this.createWindow();
      this.addHandlers();
    });
    this.application.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.createWindow();
      }
    });
    this.application.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        this.application.quit();
      }
    });
  }
}

function run(){
  const model: Model = new Model();
  const controller: Controller = new Controller(model);
  const main = new Main(app, controller);
  main.initialize();
}

run();
