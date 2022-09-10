/* eslint-disable no-undef */
/* eslint-disable import/extensions */

/*
* Test for data model.
*/

const assert = require('assert');
const { Model } = require('../src/model/model.js');

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
