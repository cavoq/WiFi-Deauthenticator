/*
* Model for clients
*/

class Client {
  constructor(stationMac, bssid) {
    this.stationMac = stationMac;
    this.bssid = bssid;
  }
}

module.exports.Client = Client;
