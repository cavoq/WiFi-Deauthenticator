const test = require('unit.js');
const assert = require('unit.js/src/assert');
const nic = require('./../src/nic.js')
const utils  = require('./../src/utils.js');

function test_get_nic() {
    const nic_names = nic.get_nic();
    test.assert(nic_names[0], 'wlan1');
}

async function test_nic() {
    nic_names = nic.get_nic();
    network_interface_controller = new nic.network_interface_controller(nic_names[0]);
    await utils.sleep(100);
}

test_get_nic();
test_nic();