/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* eslint-disable no-unused-expressions */

/*
* Implementation of data model.
*/

const os = require('os');
const { spawn } = require('child_process');
const { NetworkInterfaceController } = require('./networkInterfaceController');
const { Utils } = require('../utils');

const CAPTURED_WAPS = './capturedwaps/capturedWAPS';
const CSV_PREFIX = '-01.csv';

class Model {
  constructor() {
    this.networkInterfaceControllers = [];
    this.accessPoints = [];
    this.usedNetworkInterfaceController;
    this.macRandomized = false;
    this.bandFlags = [];
    this.scanProcess;
  }

  scanNetworkInterfaceControllers() {
    const interfaces = os.networkInterfaces();
    this.networkInterfaceControllers = [];
    for (const [address, iface] of Object.entries(interfaces)) {
      if (address === 'lo' || address === 'eth0') {
        continue;
      }
      for (let i = 0; i < iface.length; i += 1) {
        if (iface[i].family === 'IPv4' && iface[i].internal === false) {
          iface[i].name = address;
          const nic = new NetworkInterfaceController(iface[i]);
          this.networkInterfaceControllers[address] = nic;
        }
      }
    }
  }

  async scanAccessPoints() {
    this.scanProcess = spawn('sudo', ['airodump-ng', '--band', this.bandFlags.join(''), '-w',
      CAPTURED_WAPS, '--write-interval', '1', '--output-format', 'csv', this.usedNetworkInterfaceController.name]);
  }

  async stopScanningAccessPoints() {
    this.scanProcess.kill('SIGINT');
    Utils.deleteClientsFromCsv(CAPTURED_WAPS + CSV_PREFIX);
    this.accessPoints = await Utils.readAccessPointsFromCsv(CAPTURED_WAPS + CSV_PREFIX);
  }

  reset() {
    for (let i = 0; i < this.networkInterfaceControllers.length; i += 1) {
      this.networkInterfaceControllers[i].resetMac();
    }
  }
}

module.exports.Model = Model;
