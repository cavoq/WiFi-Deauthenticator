/*
* Test for data model.
*/

const assert = require('assert');
const model = require('../src/model.js');

const MOCK_INTERFACE = 'wlan1';
const MOCK_EVENT = function callable() { };

describe("Model", function () {
    const appModel = new model.model();

    describe("Get network interface controllers", function () {
        it("Got correct network interface controllers", function () {
            nics = appModel.getNetworkInterfaceControllers();
            assert.equal(nics[1], MOCK_INTERFACE);
        });
    });

    describe("Update network interface selection", function () {
        it("Updated used network interface controller", function () {
            appModel.updateInterfaceSelection(MOCK_EVENT, MOCK_INTERFACE);
            assert.equal(appModel.usedNetworkInterfaceController, appModel.networkInterfaceControllers[MOCK_INTERFACE])
        });
    });

    describe("Update interface mac", function () {
        it("Updated randomized mac adress", function () {
            appModel.updateInterfaceMac(MOCK_EVENT, true);
            assert.equal(appModel.usedNetworkInterfaceController.changedMac, true)
            assert.equal(appModel.macRandomized, true);
            appModel.updateInterfaceMac(MOCK_EVENT, false);
            assert.equal(appModel.usedNetworkInterfaceController.changedMac, false)
            assert.equal(appModel.macRandomized, false);
        });
    });

    describe("Update network band selection", function () {
        it("Updated used bands for scanning", function () {
            appModel.updateBandSelection(MOCK_EVENT, ['a', 'b'])
            assert.equal(appModel.bandFlags[0], 'a');
            assert.equal(appModel.bandFlags[1], 'b');
        });
    });
});