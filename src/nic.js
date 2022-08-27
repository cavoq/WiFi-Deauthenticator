const { spawn, execSync, spawnSync } = require('child_process');

const WLAN_CODE = /(wlan[0-9]+)/g;

get_nic = () => {
    const nic = []
    nic_process = spawnSync('iw', ['dev']);
    if (nic_process.status > 0) {
        console.log(`Child process failed with code ${nic_process.status}`);
        return
    }
    nic_res = nic_process.stdout.toString().match(WLAN_CODE);
    for (i = 0; i < nic_res.length; ++i) {
        nic.push(nic_res[i])
    }
    console.log(`Child process finished with exit code ${nic_process.status}`);
    return nic
}

module.exports.get_nic = get_nic