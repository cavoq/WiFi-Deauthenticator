const utils = require('../src/utils');
const assert = require('assert');
const fs = require("fs");

const CAPTURED_WAPS_TEST = './inputs/sampleAccessPoints.csv';

describe("Utilies", function () {
    const readStream = fs.createReadStream(CAPTURED_WAPS_TEST);

    describe("Deleting of clients in csv for APs", function () {
        it("Deleted clients", function () {
            assert.doesNotThrow(() => testNetworkInterfaceController.changeMac(mac));
        });
    });
});
