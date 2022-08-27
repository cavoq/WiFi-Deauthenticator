const test = require('unit.js');
const nic = require('./../src/nic.js')

network_interface_controllers = nic.get_nic()
test.assert(network_interface_controllers[0] == 'wlan1')  