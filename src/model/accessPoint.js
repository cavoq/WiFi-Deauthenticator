/*
* Model for access points
*/

// eslint-disable-next-line no-unused-vars
class AccessPoint {
  constructor(bssid, channel, privacy, cipher, authentication, essid) {
    this.bssid = bssid;
    this.channel = channel;
    this.privacy = privacy;
    this.cipher = cipher;
    this.authentication = authentication;
    this.essid = essid;
    this.clients = [];
  }

  display = () => `${this.essid}, ${this.bssid}`;
}

module.exports.AccessPoint = AccessPoint;
