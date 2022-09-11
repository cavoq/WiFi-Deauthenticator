/*
* Module implementing the controller.
*/

import Utils from '../utils';
import Model from '../model/model';

class Controller {
  model: Model = new Model;

  constructor(model: Model = new Model()) {
    this.model = model;
  }

  getNetworkInterfaceControllers() {
    this.model.scanNetworkInterfaceControllers();
    return Object.keys(this.model.networkInterfaceControllers);
  }

  getAccessPoints() {
    this.model.stopScanningAccessPoints();
    return Object.keys(this.model.accessPoints);
  }

  setInterfaceSelection(_event: Event, iface: string) {
    this.model.usedNetworkInterfaceController = this.model.networkInterfaceControllers[iface];
  }

  setInterfaceMac(_event: Event, randomized: boolean) {
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

  setBandSelection(_event: Event, bandValues: string []) {
    this.model.bandFlags = bandValues;
  }
}

export default Controller;
