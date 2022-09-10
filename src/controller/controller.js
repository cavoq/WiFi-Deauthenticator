/*
* Module implementing the controller.
*/

const { Utils } = require('../utils');

class Controller {
  constructor(model) {
    this.model = model;
  }

  getNetworkInterfaceControllers() {
    this.model.scanNetworkInterfaceContollers();
    return Object.keys(this.model.networkInterfaceControllers);
  }

  setInterfaceSelection(_event, iface) {
    this.model.usedNetworkInterfaceController = this.model.networkInterfaceControllers[iface];
  }

  setInterfaceMac(_event, randomized) {
    this.model.macRandomized = randomized;
    if (this.model.macRandomized) {
      if (this.model.usedNetworkInterfaceController.changedMac) {
        return;
      }
      const randomMac = Utils.getRandomMac();
      this.model.usedNetworkInterfaceController.changeMac(randomMac);
    } else {
      this.model.usedNetworkInterfaceController.resetMac();
    }
  }

  setBandSelection(_event, bandValues) {
    this.model.bandValues = bandValues;
  }
}

module.exports.Controller = Controller;
