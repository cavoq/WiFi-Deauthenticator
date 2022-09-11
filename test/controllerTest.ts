/* eslint-disable no-undef */

/*
* Test for controller.
*/

import assert from 'assert';
import Model from '../src/model/model';
import Controller from '../src/controller/controller';

const MOCK_INTERFACE = 'wlan1';
// eslint-disable-next-line @typescript-eslint/no-empty-function
const MOCK_EVENT = function callable() { };

describe('Class: Controller', () => {
  const testModel = new Model();
  const testController = new Controller(testModel);

  it('Func: getNetworkInterfaceControllers', () => {
    const nics = testController.getNetworkInterfaceControllers();
    assert.equal(nics[1], MOCK_INTERFACE);
  });

  it('Func: setInterfaceSelection', () => {
    testController.setInterfaceSelection(MOCK_EVENT, MOCK_INTERFACE);
    assert.equal(
      testController.model.usedNetworkInterfaceController,
      testController.model.networkInterfaceControllers[MOCK_INTERFACE],
    );
  });

  it('Func: setInterfaceMac', () => {
    testController.setInterfaceMac(MOCK_EVENT, true);
    assert.equal(testController.model.usedNetworkInterfaceController.changedMac, true);
    assert.equal(testController.model.macRandomized, true);
    testController.setInterfaceMac(MOCK_EVENT, false);
    assert.equal(testController.model.usedNetworkInterfaceController.changedMac, false);
    assert.equal(testController.model.macRandomized, false);
  });

  it('Func: setBandSelection', () => {
    testController.setBandSelection(MOCK_EVENT, ['a', 'b']);
    assert.equal(testController.model.bandFlags[0], 'a');
    assert.equal(testController.model.bandFlags[1], 'b');
  });
});
