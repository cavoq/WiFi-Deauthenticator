const { spawnSync, execSync } = require('child_process');
const macaddress = require('macaddress');

const WLAN_CODE = /(wlan[0-9]+)/g;

function network_interface_controller(nic) {
    this.nic = nic;
    this.addr = macaddress.one(this.nic).then((mac) => {
        this.addr = mac;
    });

    function change_mac(addr) {
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

    function reset_mac() {
        try {
            original_mac = execSync(`ethtool -P ${this.nic}`);
            console.log(original_mac);
        } catch (err) {
            console.log(err);
        }
    }
}

function get_nic() {
    const nic = [];
    nic_process = spawnSync('iw', ['dev']);
    if (nic_process.status > 0) {
        console.log(`Child process failed with code ${nic_process.status}`);
        return
    }
    nic_res = nic_process.stdout.toString().match(WLAN_CODE)
    for (i = 0; i < nic_res.length; ++i) {
        nic.push(nic_res[i]);
    }
    console.log(`Child process finished with exit code ${nic_process.status}`);
    return nic;
}

module.exports.network_interface_controller = network_interface_controller
module.exports.get_nic = get_nic