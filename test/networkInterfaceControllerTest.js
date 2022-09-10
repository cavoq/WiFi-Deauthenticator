/* eslint-disable new-cap */
/* eslint-disable no-undef */
/*
* Test for network interface controller model.
*/

const assert = require('assert');
const { networkInterfaceController } = require('../src/networkInterfaceController');
const utils = require('../src/utils');

const MOCK_INTERFACE = {
  name: 'wlan1',
  address: '192.168.2.19',
  mac: '00:c0:ca:98:dd:f2',
  family: 'IPv4',
  internal: false,
};

describe('Network interface controller', () => {
  testNetworkInterfaceController = new networkInterfaceController(MOCK_INTERFACE);

  describe('Change of mac adress', () => {
    it('Changed mac adress of interface', () => {
      mac = utils.getRandomMac();
      assert.doesNotThrow(() => testNetworkInterfaceController.changeMac(mac));
    });
  });

  describe('Reset of mac adress', () => {
    it('Reset mac address of interface', () => {
      assert.doesNotThrow(() => testNetworkInterfaceController.resetMac);
    });
  });

  describe('Set interface in monitor mode', () => {
    it('Set interface into monitor mode', () => {
      assert.doesNotThrow(() => testNetworkInterfaceController.setMonitorMode);
    });
  });

  describe('Set interface in managed mode', () => {
    it('Set interface into managed mode', () => {
      assert.doesNotThrow(() => testNetworkInterfaceController.setManagedMode);
    });
  });
});
