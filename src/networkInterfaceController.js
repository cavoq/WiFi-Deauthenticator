const { execSync } = require('child_process');

function networkInterfaceController(interface) {
    this.address = interface.address;
    this.mac = interface.mac
    this.family = interface.family;
    this.internal = interface.internal;

    this.changeMac = (addr) => {
        try {
            execSync(`ifconfig ${nic} down`);
            execSync(`ifconfig ${nic} hw ether ${addr}`);
            execSync(`ifconfig ${nic} up`);
            console.log(`Changed mac adress of ${this.nic} from ${this.addr} to ${addr}`);
            this.addr = addr;
        } catch (err) {
            console.log(err);
        }
    }

    this.resetMac = () => {
        try {
            original_mac = execSync(`ethtool -P ${this.nic}`);
            console.log(original_mac);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports.networkInterfaceController = networkInterfaceController