/*
* Test for network interface controller model.
*/

const assert = require('assert');
const networkInterfaceController = require('../src/networkInterfaceController').networkInterfaceController;
const utils = require('../src/utils');

const MOCK_INTERFACE = {
    name: "wlan1",
    address: "192.168.2.19",
    mac: "00:c0:ca:98:dd:f2",
    family: "IPv4",
    internal: false
};

describe("Network interface controller", function () {
    testNetworkInterfaceController = new networkInterfaceController(MOCK_INTERFACE);

    describe("Change of mac adress", function () {
        it("Changed mac adress of interface", function () {
            mac = utils.getRandomMac();
            assert.doesNotThrow(() => testNetworkInterfaceController.changeMac(mac));
        });
    });

    describe("Reset of mac adress", function () {
        it("Reset mac adress of interface", function () {
            assert.doesNotThrow(() => testNetworkInterfaceController.resetMac);
        });
    });
});
