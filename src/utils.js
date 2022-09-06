/*
* Collection of utility functions.
*/

const { execSync } = require('child_process');
const { delimiter } = require('path');

function getRandomMac() {
    var hexDigits = "0123456789ABCDEF";
    var macAddress = "";
    for (var i = 0; i < 6; i++) {
        macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
        macAddress += hexDigits.charAt(Math.round(Math.random() * 15));
        if (i != 5) macAddress += ":";
    }
    return macAddress;
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function deleteClientsFromCsv(csv) {
    delimiter = 'Station MAC';
    csv = execSync(`sed -n '/${delimiter}/q;p' ${csv}`);
    return csv;
}

module.exports.getRandomMac = getRandomMac;
module.exports.sleep = sleep;