/*
* Model for network interface controller.
*/

const { execSync } = require('child_process');
const errorlog = require('./logger.js').errorlog;
const successlog = require('./logger.js').successlog;

function networkInterfaceController(interface) {
    this.name = interface.name;
    this.address = interface.address;
    this.mac = interface.mac
    this.family = interface.family;
    this.internal = interface.internal;
    this.changedMac = false;

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
    }

    this.resetMac = () => {
        try {
            originalMac = execSync(`sudo ethtool -P ${this.name} | awk '{print $3}'`).toString().trim();
            this.changeMac(originalMac);
            this.mac = originalMac;
            this.changedMac = false;
        } catch (err) {
            errorlog.error(`Could not reset mac adress of ${this.name}: ${err}`);
        }
    }
}

module.exports.networkInterfaceController = networkInterfaceController