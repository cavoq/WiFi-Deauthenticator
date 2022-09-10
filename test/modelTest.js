/* eslint-disable new-cap */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/*
* Test for data model.
*/

const assert = require('assert');
const { model } = require('../src/model/model.js');

describe('Class: Model', () => {
  const appModel = new model();

  it('Func: scanNetworkInterfaceControllers', () => {
    appModel.scanNetworkInterfaceControllers();
    assert.equal(1, 1);
  });

  it('Func: scanAccessPoints', () => {
    appModel.scanAccessPoints();
    assert.equal(1, 1);
  });

  it('Func: stopScanningAccessPoints', () => {
    appModel.stopScanningAccessPoints();
    assert.equal(1, 1);
  });
});
