/* eslint-disable new-cap */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* eslint-disable import/extensions */
/*
* Collection of utility functions.
*/

const fs = require('fs');
const readline = require('readline');
const { execSync } = require('child_process');
const { AccessPoint } = require('./model/accessPoint.js');

const RELAVANT_ROW_INDICES = [0, 3, 5, 6, 7, 13];

class Utils {
  constructor() {
    this.getRandomMac = () => {
      const hexDigits = '0123456789ABCDEF';
      let macAddress = '';
      for (let i = 0; i < 6; i += 1) {
        macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
        macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
        if (i !== 5) macAddress += ':';
      }
      return macAddress;
    };

    this.sleep = (ms) => new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

    this.deleteClientsFromCsv = (csv) => {
      const delimiter = 'Station MAC';
      execSync(`sed -i '/${delimiter}/Q' ${csv}`);
    };

    this.filterRow = (row) => {
      const filteredRow = [];
      for (let i = 0; i < RELAVANT_ROW_INDICES.length; i += 1) {
        filteredRow.push(row[RELAVANT_ROW_INDICES[i]].trim());
      }
      return filteredRow;
    };

    this.readAccessPointsFromCsv = async (csv) => {
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
        const filteredRow = this.filterRow(row.split(','));
        const wap = new AccessPoint(...filteredRow);
        accessPoints[wap.bssid] = wap;
      }
      return accessPoints;
    };
  }
}

module.exports.Utils = new Utils();
