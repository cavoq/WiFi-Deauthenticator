/* eslint-disable no-undef */

/*
* Test for network interface controller model.
*/

import assert from 'assert';
import NetworkInterfaceController from '../src/model/networkInterfaceController';
import Utils from '../src/utils';
import { NetworkInterfaceInfoIPv4 } from 'os';

const MOCK_INTERFACE_NAME = "wlan1";
const MOCK_INTERFACE: NetworkInterfaceInfoIPv4 =
{
  address: '192.168.2.19',
  mac: '00:c0:ca:98:dd:f2',
  family: 'IPv4',
  internal: false,
  netmask: '',
  cidr: null
};

describe('Class: NetworkInterfaceController', () => {
  const testNetworkInterfaceController = new NetworkInterfaceController(MOCK_INTERFACE, MOCK_INTERFACE_NAME);

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
