/* eslint-disable no-undef */

/*
* Test for utils class
*/

import assert from 'assert';
import { execSync } from 'child_process';
import Utils from '../utils';

const CAPTURED_WAPS_TEST = `${__dirname}/input/sampleAccessPoints.csv`;
const CAPTURED_WAPS_TMP = `${__dirname}/tmp/sampleAccessPoints.csv`;
const CAPTURED_WAPS_OUTPUT = `${__dirname}/output/sampleAccessPoints.csv`;

const CAPTURED_CLIENTS_TEST = `${__dirname}/input/sampleClients.csv`;
const CAPTURED_CLIENTS_TMP = `${__dirname}/tmp/sampleClients.csv`;
const CAPTURED_CLIENTS_OUTPUT = `${__dirname}/output/sampleClients.csv`;

describe('Class: Utils', () => {

  it('Func: deleteClientsFromCsv', () => {
    execSync(`cp ${CAPTURED_WAPS_TEST} ${CAPTURED_WAPS_TMP}`);
    Utils.deleteClientsFromCsv(CAPTURED_WAPS_TMP);
    const diff = execSync(`diff ${CAPTURED_WAPS_TMP} ${CAPTURED_WAPS_OUTPUT}`);
    assert.equal(diff.byteLength, 0);
  });

  it('Func: deleteAccessPointsFromCsv', () => {
    execSync(`cp ${CAPTURED_CLIENTS_TEST} ${CAPTURED_CLIENTS_TMP}`);
    Utils.deleteAccessPointsFromCsv(CAPTURED_CLIENTS_TMP);
    const diff = execSync(`diff ${CAPTURED_CLIENTS_TMP} ${CAPTURED_CLIENTS_OUTPUT}`);
    assert.equal(diff.byteLength, 0);
  });

  it('Func: readAccessPointsFromCsv', async () => {
    const accessPoints = await Utils.readAccessPointsFromCsv(CAPTURED_WAPS_OUTPUT);
    assert.equal(accessPoints['98:DE:D0:E1:48:A4'].essid, 'TP-LINK_48A4');
  });

  it('Func: readClientsFromCsv', async () => {
    const clients = await Utils.readClientsFromCsv(CAPTURED_CLIENTS_OUTPUT);
    assert.equal(clients['48:5A:B6:35:D9:25'].bssid, "A8:F5:AC:5F:14:F0");
  })
});
