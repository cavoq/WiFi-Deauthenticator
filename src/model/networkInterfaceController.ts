/*
Model class for network interface controller.
*/

import { exec } from 'child_process';
import { promisify } from 'util';
import { NetworkInterfaceInfo } from 'os';
import { errorlog } from '../logger';
import { successlog } from '../logger';

class NetworkInterfaceController {
  name: string;
  address: string;
  mac: string;
  family: string;
  internal: boolean;
  changedMac: boolean;

  constructor(iface: NetworkInterfaceInfo, name: string) {
    this.name = name;
    this.address = iface.address;
    this.mac = iface.mac;
    this.family = iface.family;
    this.internal = iface.internal;
    this.changedMac = false;
  }

  public async setMonitorMode() {
    try {
      await promisify(exec)('sudo airmon-ng check kill');
      await promisify(exec)(`sudo iwconfig ${this.name} mode monitor`);
      successlog.info(`${this.name} is now in monitor mode`);
    } catch (err) {
      errorlog.error(`Could not set ${this.name} into monitor mode: ${err}`);
    }
  }

  public async setManagedMode() {
    try {
      await promisify(exec)(`sudo iwconfig ${this.name} mode managed`);
      await promisify(exec)(`sudo service NetworkManager restart`);
      successlog.info(`${this.name} is now in managed mode`);
    } catch (err) {
      errorlog.error(`Could not set ${this.name} into managed mode: ${err}`);
    }
  }

  public changeMac = async (mac: string) => {
    try {
      await promisify(exec)(`sudo ifconfig ${this.name} down`);
      await promisify(exec)(`sudo ifconfig ${this.name} hw ether ${mac}`);
      await promisify(exec)(`sudo ifconfig ${this.name} up`);
      this.changedMac = true;
      successlog.info(`Changed mac address of ${this.name} from ${this.mac} to ${mac}`);
      this.mac = mac;
    } catch (err) {
      errorlog.error(`Could not change mac adress of ${this.name}: ${err}`);
    }
  };

  public resetMac = async () => {
    try {
      const originalMac = (await promisify(exec)(`sudo ethtool -P ${this.name} | awk '{print $3}'`)).stdout.toString().trim();
      await this.changeMac(originalMac);
      this.mac = originalMac;
      this.changedMac = false;
    } catch (err) {
      errorlog.error(`Could not reset mac adress of ${this.name}: ${err}`);
    }
  };
}

export default NetworkInterfaceController;
