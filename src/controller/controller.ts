/*
* Module implementing the controller.
*/

import Utils from '../utils';
import Model from '../model/model';

class Controller {
  model: Model;
  
  constructor(model: Model) {
    this.model = model;
  }

  getNetworkInterfaceControllers() {
    this.model.scanNetworkInterfaceControllers();
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
    this.model.bandFlags = bandValues;
  }
}

export default Controller;
