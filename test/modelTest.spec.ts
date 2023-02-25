/* eslint-disable no-undef */

/*
* Test for data model.
*/

import assert from 'assert';
import Model from '../src/model/model';

describe('Class: Model', () => {
  const testModel = new Model();

  it('Func: scanNetworkInterfaceControllers', () => {
    testModel.scanNetworkInterfaceControllers();
    const numOfInterfaces = Object.keys(testModel.networkInterfaceControllers).length;
    assert.ok(numOfInterfaces > 0);
  });
});
