/*
* Model for access points
*/

function accessPoints(bssid, channel, privacy, cipher, authentication, essid) {
    this.bssid = bssid;
    this.channel = channel;
    this.privacy = privacy;
    this.cipher = cipher;
    this.authentication = authentication;
    this.essid = essid;
    this.clients = [];

    this.scanClients = () => {
        return;
    }
}