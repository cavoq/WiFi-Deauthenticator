/* eslint-disable import/extensions */
/*
* Model for network interface controller.
*/

const { execSync } = require('child_process');
const { errorlog } = require('../logger.js');
const { successlog } = require('../logger.js');

class networkInterfaceController {
  constructor(iface) {
    this.name = iface.name;
    this.address = iface.address;
    this.mac = iface.mac;
    this.family = iface.family;
    this.internal = iface.internal;
    this.changedMac = false;

    this.setMonitorMode = () => {
      try {
        execSync('airmon-ng check kill');
        execSync(`airmon-ng start ${this.name}`);
        successlog.info(`${this.name} is now in monitor mode`);
      } catch (err) {
        errorlog.error(`Could not set ${this.name} into monitor mode: ${err}`);
      }
    };

    this.setManagedMode = () => {
      try {
        execSync(`airmon-ng stop ${this.name}`);
        execSync('service NetworkManager restart');
        successlog.info(`${this.name} is now in managed mode`);
      } catch (err) {
        errorlog.error(`Could not set ${this.name} into managed mode: ${err}`);
      }
    };

    this.changeMac = (mac) => {
      try {
        execSync(`sudo ifconfig ${this.name} down`);
        execSync(`sudo ifconfig ${this.name} hw ether ${mac}`);
        execSync(`sudo ifconfig ${this.name} up`);
        this.changedMac = true;
        successlog.info(`Changed mac address of ${this.name} from ${this.mac} to ${mac}`);
        this.mac = mac;
      } catch (err) {
        errorlog.error(`Could not change mac adress of ${this.name}: ${err}`);
      }
    };

    this.resetMac = () => {
      try {
        const originalMac = execSync(`sudo ethtool -P ${this.name} | awk '{print $3}'`).toString().trim();
        this.changeMac(originalMac);
        this.mac = originalMac;
        this.changedMac = false;
      } catch (err) {
        errorlog.error(`Could not reset mac adress of ${this.name}: ${err}`);
      }
    };
  }
}

module.exports.networkInterfaceController = networkInterfaceController;
