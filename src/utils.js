/*
* Collection of utility functions.
*/

const { execSync } = require('child_process');

function getRandomMac() {
    let hexDigits = "0123456789ABCDEF";
    let macAddress = "";
    for (i = 0; i < 6; i++) {
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
    const delimiter = 'Station MAC';
    execSync(`sed -i '/${delimiter}/Q' ${csv}`);
}

module.exports.getRandomMac = getRandomMac;
module.exports.deleteClientsFromCsv = deleteClientsFromCsv;
module.exports.sleep = sleep;