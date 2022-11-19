/* eslint-disable no-undef */

/*
* Test for data model.
*/

import assert from 'assert';
import Model from '../model/model';

describe('Class: Model', () => {
  const testModel = new Model();

  it('Func: scanNetworkInterfaceControllers', () => {
    testModel.scanNetworkInterfaceControllers();
    assert.equal(1, 1);
  });

  it('Func: scanAccessPoints', () => {
    testModel.scanAccessPoints();
    assert.equal(1, 1);
  });

  it('Func: stopScanningAccessPoints', () => {
    testModel.stopScanningAccessPoints();
    assert.equal(1, 1);
  });
});
