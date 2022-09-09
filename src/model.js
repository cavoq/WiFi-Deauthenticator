/* eslint-disable no-continue */
/* eslint-disable new-cap */
/* eslint-disable no-unused-expressions */
/*
* Implementation of data model.
*/

const os = require('os');
const { spawn } = require('child_process');
const { networkInterfaceController } = require('./networkInterfaceController');
const utils = require('./utils');

const CAPTURED_WAPS = './capturedwaps/capturedWAPS';
const CSV_PREFIX = '-01.csv';

class model {
  constructor() {
    this.networkInterfaceControllers = [];
    this.accessPoints = [];
    this.usedNetworkInterfaceController;
    this.macRandomized = false;
    this.bandFlags = [];
    this.scanProcess;

    this.getNetworkInterfaceControllers = () => {
      const interfaces = os.networkInterfaces();
      this.networkInterfaceControllers = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const [address, iface] of Object.entries(interfaces)) {
        if (address === 'lo' || address === 'eth0') {
          continue;
        }
        for (let i = 0; i < iface.length; i += 1) {
          if (iface[i].family === 'IPv4' && iface[i].internal === false) {
            iface[i].name = address;
            const nic = new networkInterfaceController(iface[i]);
            this.networkInterfaceControllers[address] = nic;
          }
        }
      }
      return Object.keys(this.networkInterfaceControllers);
    };

    this.updateInterfaceSelection = (_event, iface) => {
      this.usedNetworkInterfaceController = this.networkInterfaceControllers[iface];
    };

    this.updateInterfaceMac = (_event, randomized) => {
      this.macRandomized = randomized;
      if (this.macRandomized) {
        if (this.usedNetworkInterfaceController.changedMac) {
          return;
        }
        const randomMac = utils.getRandomMac();
        this.usedNetworkInterfaceController.changeMac(randomMac);
      } else {
        this.usedNetworkInterfaceController.resetMac();
      }
    };

    this.updateBandSelection = (_event, bandValues) => {
      this.bandFlags = bandValues;
    };

    this.scanAccessPoints = async () => {
      this.scanProcess = spawn('sudo', ['airodump-ng', '--band', this.bandFlags.join(''), '-w',
        CAPTURED_WAPS, '--write-interval', '1', '--output-format', 'csv', this.usedNetworkInterfaceController.name]);
    };

    this.stopScanningAccessPoints = async () => {
      this.scanProcess.kill('SIGINT');
      utils.deleteClientsFromCsv(CAPTURED_WAPS + CSV_PREFIX);
      utils.readAccessPointsFromCsv(CAPTURED_WAPS + CSV_PREFIX);
    };

    this.reset = () => {
      for (let i = 0; i < this.networkInterfaceControllers.length; i += 1) {
        this.networkInterfaceControllers[i].resetMac();
      }
    };
  }
}

module.exports.model = model;
