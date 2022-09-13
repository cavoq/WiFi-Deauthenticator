/*
* Model for access points
*/

import Client from "./client";
import { ChildProcess, spawn } from 'child_process';
import CSV_PREFIX from './model';
import Utils from "utils";

const CAPTURED_CLIENTS = './capturedclis/capturedCLIENTS';

class AccessPoint {
  bssid: string;
  channel: string;
  privacy: string;
  cipher: string;
  authentication: string;
  essid: string;
  clients: Client[];
  scanProcess!: ChildProcess

  constructor(bssid: string, channel: string, privacy: string, cipher: string, authentication: string, essid: string) {
    this.bssid = bssid;
    this.channel = channel;
    this.privacy = privacy;
    this.cipher = cipher;
    this.authentication = authentication;
    this.essid = essid;
    this.clients = [];
    this.scanProcess;
  }

  public display = () => `${this.essid}, ${this.bssid}`;

  public scanClients = async (networkInterface: string) => {
    this.scanProcess = spawn('sudo', ['airodump-ng', '--bssid', this.bssid, '--channel',
      this.channel, '-w', CAPTURED_CLIENTS, '--write-interval', '1', '--output-format', 'csv', networkInterface]);
  }

  public stopScanning = async () => {
    this.scanProcess.kill('SIGINT');
    //Utils.readClientsFromCsv(CAPTURED_CLIENTS + CSV_PREFIX);
  }
}

export default AccessPoint;
