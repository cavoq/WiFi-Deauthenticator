/*
* Collection of utility functions.
*/

import AccessPoint from './model/accessPoint';
import Client from './model/client';
import fs from 'fs';
import * as readline from 'node:readline';
import { execSync } from 'child_process';

const RELAVANT_ROW_INDICES: number[] = [0, 3, 5, 6, 7, 13];

class Utils {
  public static getRandomMac() {
    const hexDigits = '0123456789ABCDEF';
    let macAddress = '';
    for (let i = 0; i < 6; i += 1) {
      macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
      macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
      if (i !== 5) macAddress += ':';
    }
    return macAddress;
  }

  public static sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  public static deleteClientsFromCsv(csv: string) {
    const delimiter = 'Station MAC';
    execSync(`sed -i '/${delimiter}/Q' ${csv}`);
  }

  private static filterRow(row: string[]) {
    const filteredRow = [];
    for (let i = 0; i < RELAVANT_ROW_INDICES.length; i += 1) {
      filteredRow.push(row[RELAVANT_ROW_INDICES[i]].trim());
    }
    return filteredRow;
  }

  public static async readAccessPointsFromCsv(csv: string) {
    const accessPoints: AccessPoint[] = [];
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const wap: AccessPoint = new AccessPoint(...filteredRow);
      accessPoints[wap.bssid] = wap;
    }
    return accessPoints;
  }

  public static async readClientsFromCsv(csv: string) {
    const clients: Client[] = [];
    const readStream = fs.createReadStream(csv);
    const reader = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });
  }
}

export default Utils;
