/*
* Model for access points
*/

// eslint-disable-next-line no-unused-vars
class accessPoint {
  constructor(bssid, channel, privacy, cipher, authentication, essid) {
    this.bssid = bssid;
    this.channel = channel;
    this.privacy = privacy;
    this.cipher = cipher;
    this.authentication = authentication;
    this.essid = essid;
    this.clients = [];

    this.display = () => `${this.essid}, ${this.bssid}`;

    this.scanClients = () => {
    };
  }
}

module.exports.accessPoint = accessPoint;
