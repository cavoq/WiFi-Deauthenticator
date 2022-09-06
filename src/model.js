/* 
* Implementation of data model.
*/

const os = require('os');
const networkInterfaceController = require('./networkInterfaceController').networkInterfaceController;
const utils = require('./utils');
const { spawn } = require('child_process');
const fs = require("fs");
const { parse } = require("csv-parse")

const CAPTURED_WAPS = "./capturedwaps/capturedWAPS";
const CSV_PREFIX = "-01.csv";

function model() {
    this.networkInterfaceControllers = [];
    this.accessPoints = [];
    this.usedNetworkInterfaceController;
    this.macRandomized = false;
    this.bandFlags = [];
    this.scanProcess;

    this.getNetworkInterfaceControllers = () => {
        const interfaces = os.networkInterfaces();
        this.networkInterfaceControllers = [];
        for (const [address, interface] of Object.entries(interfaces)) {
            if (address === 'lo' || address === 'eth0') {
                continue;
            }
            for (i = 0; i < interface.length; ++i) {
                if (interface[i].family === 'IPv4' && interface[i].internal === false) {
                    interface[i].name = address;
                    let nic = new networkInterfaceController(interface[i]);
                    this.networkInterfaceControllers[address] = nic;
                }
            }
        }
        return Object.keys(this.networkInterfaceControllers);
    }

    this.updateInterfaceSelection = (_event, interface) => {
        this.usedNetworkInterfaceController = this.networkInterfaceControllers[interface];
    }

    this.updateInterfaceMac = (_event, randomized) => {
        this.macRandomized = randomized;
        if (this.macRandomized) {
            if (this.usedNetworkInterfaceController.changedMac) {
                return;
            }
            randomMac = utils.getRandomMac();
            this.usedNetworkInterfaceController.changeMac(randomMac);
        } else {
            this.usedNetworkInterfaceController.resetMac();
        }
    }

    this.updateBandSelection = (_event, bandValues) => {
        this.bandFlags = bandValues;
    }

    this.scanAccessPoints = async () => {
        this.scanProcess = spawn('sudo', ['airodump-ng', '--band', this.bandFlags.join(''), '-w',
            CAPTURED_WAPS, '--write-interval', '1', '--output-format', 'csv', this.usedNetworkInterfaceController.name]);
    }

    this.stopScanningAccessPoints = async () => {
        this.scanProcess.kill('SIGINT');
        this.readAccessPointsFromCsv();
    }

    this.readAccessPointsFromCsv = () => {
        const readStream = fs.createReadStream(CAPTURED_WAPS + CSV_PREFIX);
        readStream.pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
                console.log(row);
            })
            .on("error", function (error) {
                console.log(error.message);
            })
            .on("end", function () {
                console.log("finished");
            });
    }

    this.reset = () => {
        for (i = 0; i < this.networkInterfaceControllers.length; ++i) {
            this.networkInterfaceControllers[i].resetMac();
        }
    }
}

module.exports.model = model;