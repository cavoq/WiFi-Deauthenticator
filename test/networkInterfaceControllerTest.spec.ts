/* eslint-disable no-undef */

/*
* Test for network interface controller model.
*/

import assert from 'assert';
import NetworkInterfaceController from '../src/model/networkInterfaceController';
import Utils from '../src/utils';
import { NetworkInterfaceInfoIPv4 } from 'os';

const MOCK_INTERFACE_NAME = "wlo1";
const MOCK_INTERFACE: NetworkInterfaceInfoIPv4 =
{
  address: '192.168.2.11',
  mac: '70:1a:b8:17:e9:6d',
  family: 'IPv4',
  internal: false,
  netmask: '',
  cidr: null
};

describe('Class: NetworkInterfaceController', () => {
  const testNetworkInterfaceController = new NetworkInterfaceController(MOCK_INTERFACE, MOCK_INTERFACE_NAME);
  
  before(async () => {
    await testNetworkInterfaceController.setManagedMode();
  });

  it('Func: changeMac', async () => {
    const mac = Utils.getRandomMac();
    await testNetworkInterfaceController.changeMac(mac);
    assert.equal(testNetworkInterfaceController.mac, mac);
  });

  it('Func: resetMac', async () => {
    await testNetworkInterfaceController.resetMac();
    assert.equal(testNetworkInterfaceController.mac, MOCK_INTERFACE.mac);
  });

  it('Func: setMonitorMode', async () => {
    assert.doesNotThrow(() => testNetworkInterfaceController.setMonitorMode);
  });

  it('Func: setManagedMode', async () => {
    assert.doesNotThrow(() => testNetworkInterfaceController.setManagedMode);
  });
});
