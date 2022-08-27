function get_random_mac() {
    var hex_digits = "0123456789ABCDEF";
    var mac_address = "";
    for (var i = 0; i < 6; i++) {
        mac_address += hex_digits.charAt(Math.round(Math.random() * 15));
        mac_address += hex_digits.charAt(Math.round(Math.random() * 15));
        if (i != 5) mac_address += ":";
    }
    return mac_address;
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports.get_random_mac = get_random_mac;
module.exports.sleep = sleep;