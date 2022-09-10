/* eslint-disable no-undef */

/*
* Test for network interface controller model.
*/

const assert = require('assert');
const { NetworkInterfaceController } = require('../src/model/networkInterfaceController');
const { Utils } = require('../src/utils');

const MOCK_INTERFACE = {
  name: 'wlan1',
  address: '192.168.2.19',
  mac: '00:c0:ca:98:dd:f2',
  family: 'IPv4',
  internal: false,
};

describe('Class: NetworkInterfaceController', () => {
  const testNetworkInterfaceController = new NetworkInterfaceController(MOCK_INTERFACE);

  it('Func: changeMac', () => {
    const mac = Utils.getRandomMac();
    assert.doesNotThrow(() => testNetworkInterfaceController.changeMac(mac));
  });
  it('Func: resetMac', () => {
    assert.doesNotThrow(() => testNetworkInterfaceController.resetMac);
  });

  it('Func: setMonitorMode', () => {
    assert.doesNotThrow(() => testNetworkInterfaceController.setMonitorMode);
  });

  it('Func: setManagedMode', () => {
    assert.doesNotThrow(() => testNetworkInterfaceController.setManagedMode);
  });
});
