/*
* Implementation of data model.
*/

import os from 'os';
import { ChildProcess, spawn } from 'child_process';
import NetworkInterfaceController from './networkInterfaceController';
import Utils from '../utils';
import AccessPoint from './accessPoint';

const CAPTURED_WAPS = './capturedwaps/capturedWAPS';
const CSV_PREFIX = '-01.csv';

class Model {
  networkInterfaceControllers: NetworkInterfaceController[];
  accessPoints: AccessPoint[];
  usedNetworkInterfaceController!: NetworkInterfaceController;
  macRandomized: boolean;
  bandFlags: string[];
  scanProcess!: ChildProcess;

  constructor() {
    this.networkInterfaceControllers = [];
    this.accessPoints = [];
    this.usedNetworkInterfaceController;
    this.macRandomized = false;
    this.bandFlags = [];
    this.scanProcess;
  }

  scanNetworkInterfaceControllers() {
    const interfaces: NodeJS.Dict<os.NetworkInterfaceInfo[]> = os.networkInterfaces();
    this.networkInterfaceControllers = [];
    for (const [address, iface] of Object.entries(interfaces)) {
      if (!iface) {
        return;
      }
      if (address === 'lo' || address === 'eth0') {
        continue;
      }
      for (let i = 0; i < iface.length; i += 1) {
        if (iface[i].family === 'IPv4' && iface[i].internal === false) {
          const nic = new NetworkInterfaceController(iface[i], address);
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

export default Model;
