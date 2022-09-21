/*
* Model for access points
*/

import Client from "./client";
import { ChildProcess, spawn } from 'child_process';
import Utils from "../utils";

const CAPTURED_CLIENTS = './capturedclis/capturedCLIENTS';
const CSV_PREFIX = '-01.csv';

class AccessPoint {
  bssid: string;
  channel: string;
  privacy: string;
  cipher: string;
  authentication: string;
  essid: string;
  clients: Client[];
  targets: string[];
  scanProcess!: ChildProcess;

  constructor(bssid: string, channel: string, privacy: string, cipher: string, authentication: string, essid: string) {
    this.bssid = bssid;
    this.channel = channel;
    this.privacy = privacy;
    this.cipher = cipher;
    this.authentication = authentication;
    this.essid = essid;
    this.clients = [];
    this.targets = [];
  }

  public display = () => `${this.essid}, ${this.bssid}`;

  public scanClients = async (networkInterface: string) => {
    this.clients = [];
    Utils.deleteCaptures();
    this.scanProcess = spawn('sudo', ['airodump-ng', '--bssid', this.bssid, '--channel',
      this.channel, '-w', CAPTURED_CLIENTS, '--write-interval', '1', '--output-format', 'csv', networkInterface]);
  }

  public stopScanning = async () => {
    this.scanProcess.kill('SIGINT');
    Utils.deleteAccessPointsFromCsv(CAPTURED_CLIENTS + CSV_PREFIX);
    this.clients = await Utils.readClientsFromCsv(CAPTURED_CLIENTS + CSV_PREFIX);
  }

  public setTargetSelection = (targets: string[]) => {
    this.targets = targets;
  }
}

export default AccessPoint;
