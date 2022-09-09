/* eslint-disable no-use-before-define */
/*
* Collection of utility functions.
*/

const { execSync } = require('child_process');
const fs = require('fs');
const readline = require('readline');

const RELAVANT_ROW_INDICES = [0, 3, 5, 6, 7, 14];

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

function readAccessPointsFromCsv(csv) {
  const accessPoints = [];
  const readStream = fs.createReadStream(csv);
  const reader = readline.createInterface({ input: readStream });
  let rowCount = 0;
  reader.on('line', (row) => {
    if (row === '' || rowCount === 0) {
      rowCount += 1;
      return;
    }
    const filteredRow = filterRow(row.split(','));
    accessPoints.push(...filteredRow);
    rowCount += 1;
  });
  return accessPoints;
}

function filterRow(row) {
  const filteredRow = [];
  for (let i = 0; i < RELAVANT_ROW_INDICES.length; i += 1) {
    filteredRow.push(row[RELAVANT_ROW_INDICES[i]]);
  }
  return filterRow;
}

module.exports.getRandomMac = getRandomMac;
module.exports.readAccessPointsFromCsv = readAccessPointsFromCsv;
module.exports.deleteClientsFromCsv = deleteClientsFromCsv;
module.exports.sleep = sleep;
