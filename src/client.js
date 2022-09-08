/*
* Model for clients
*/

function client(stationMac, bssid) {
    this.stationMac = stationMac;
    this.bssid = bssid;
}

module.exports.client = client;