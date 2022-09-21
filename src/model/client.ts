/*
* Model for clients
*/

class Client {
  stationMac: string;
  bssid: string;

  constructor(stationMac: string, bssid: string) {
    this.stationMac = stationMac;
    this.bssid = bssid;
  }
}

export default Client;
