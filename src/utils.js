/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable new-cap */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
/*
* Collection of utility functions.
*/

const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');
const { accessPoint } = require('./accessPoint.js');

const RELAVANT_ROW_INDICES = [0, 3, 5, 6, 7, 13];

function getRandomMac() {
  const hexDigits = '0123456789ABCDEF';
  let macAddress = '';
  for (let i = 0; i < 6; i += 1) {
    macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
    macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
    if (i !== 5) macAddress += ':';
  }
  return macAddress;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function deleteClientsFromCsv(csv) {
  const delimiter = 'Station MAC';
  execSync(`sed -i '/${delimiter}/Q' ${csv}`);
}

async function readAccessPointsFromCsv(csv) {
  const accessPoints = [];
  const readStream = fs.createReadStream(csv);
  const reader = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });
  for await (const row of reader) {
    if (row.trim() === '' || row.includes('BSSID')) {
      continue;
    }
    const filteredRow = filterRow(row.split(','));
    const wap = new accessPoint(...filteredRow);
    accessPoints[wap.bssid] = wap;
  }
  return accessPoints;
}

function filterRow(row) {
  const filteredRow = [];
  for (let i = 0; i < RELAVANT_ROW_INDICES.length; i += 1) {
    filteredRow.push(row[RELAVANT_ROW_INDICES[i]].trim());
  }
  return filteredRow;
}

module.exports.getRandomMac = getRandomMac;
module.exports.readAccessPointsFromCsv = readAccessPointsFromCsv;
module.exports.deleteClientsFromCsv = deleteClientsFromCsv;
module.exports.sleep = sleep;
