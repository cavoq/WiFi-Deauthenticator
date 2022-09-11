/*
* Model for access points
*/

import Client from "./client";

class AccessPoint {
  bssid: string;
  channel: string;
  privacy: string;
  cipher: string;
  authentication: string;
  essid: string;
  clients: Client[];

  constructor(bssid: string, channel: string, privacy: string, cipher: string, authentication: string, essid: string) {
    this.bssid = bssid;
    this.channel = channel;
    this.privacy = privacy;
    this.cipher = cipher;
    this.authentication = authentication;
    this.essid = essid;
    this.clients = [];
  }

  public display = () => `${this.essid}, ${this.bssid}`;
}

export default AccessPoint;
