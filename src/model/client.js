/*
* Model for clients
*/

class client {
  constructor(stationMac, bssid) {
    this.stationMac = stationMac;
    this.bssid = bssid;
  }
}

module.exports.client = client;
