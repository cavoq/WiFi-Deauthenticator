/*
* Module implementing the controller.
*/

const { utils } = require('../utils');

class controller {
  constructor(model) {
    this.model = model;

    this.getNetworkInterfaceControllers = () => {
      this.model.scanNetworkInterfaceContollers();
      return Object.keys(this.model.networkInterfaceControllers);
    };

    this.setInterfaceSelection = (_event, iface) => {
      this.model.usedNetworkInterfaceController = this.model.networkInterfaceControllers[iface];
    };

    this.setInterfaceMac = (_event, randomized) => {
      this.model.macRandomized = randomized;
      if (this.model.macRandomized) {
        if (this.model.usedNetworkInterfaceController.changedMac) {
          return;
        }
        const randomMac = utils.getRandomMac();
        this.model.usedNetworkInterfaceController.changeMac(randomMac);
      } else {
        this.model.usedNetworkInterfaceController.resetMac();
      }
    };

    this.setBandSelection = (_event, bandValues) => {
      this.model.bandValues = bandValues;
    };
  }
}

module.exports.controller = controller;
