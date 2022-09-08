const utils = require('../src/utils');
const assert = require('assert');
const { execSync } = require('child_process');

const CAPTURED_WAPS_TEST = __dirname + '/input/sampleAccessPoints.csv';
const CAPTURED_WAPS_TMP = __dirname + '/tmp/sampleAccessPoints.csv';
const CAPTURED_WAPS_OUTPUT = __dirname + '/output/sampleAccessPoints.csv';

describe("Utilies", function () {
    describe("Deleting of clients in csv for APs", function () {
        it("Deleted clients", function () {
            execSync(`cp ${CAPTURED_WAPS_TEST} ${CAPTURED_WAPS_TMP}`);
            utils.deleteClientsFromCsv(CAPTURED_WAPS_TMP);
            const diff = execSync(`diff ${CAPTURED_WAPS_TMP} ${CAPTURED_WAPS_OUTPUT}`);
            assert.equal(diff.byteLength, 0);
        });
    });

    describe("Reading of csv file", function () {
        it("Csv file read", function () {
            const accessPoints = utils.readAccessPointsFromCsv(CAPTURED_WAPS_OUTPUT);
            console.log(accessPoints);
        });
    });
});
