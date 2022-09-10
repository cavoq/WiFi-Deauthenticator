/* eslint-disable no-undef */
const assert = require('assert');
const { execSync } = require('child_process');
const { utils } = require('../src/utils');

const CAPTURED_WAPS_TEST = `${__dirname}/input/sampleAccessPoints.csv`;
const CAPTURED_WAPS_TMP = `${__dirname}/tmp/sampleAccessPoints.csv`;
const CAPTURED_WAPS_OUTPUT = `${__dirname}/output/sampleAccessPoints.csv`;

describe('Class: Utils', () => {
  it('Func: deleteClientsFromCsv', () => {
    execSync(`cp ${CAPTURED_WAPS_TEST} ${CAPTURED_WAPS_TMP}`);
    utils.deleteClientsFromCsv(CAPTURED_WAPS_TMP);
    const diff = execSync(`diff ${CAPTURED_WAPS_TMP} ${CAPTURED_WAPS_OUTPUT}`);
    assert.equal(diff.byteLength, 0);
  });

  it('Func: readAccessPointsFromCsv', async () => {
    const accessPoints = await utils.readAccessPointsFromCsv(CAPTURED_WAPS_OUTPUT);
    assert.equal(accessPoints['98:DE:D0:E1:48:A4'].essid, 'TP-LINK_48A4');
  });
});
