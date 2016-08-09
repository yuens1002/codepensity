'use strict';

describe('Service: editpost', function () {

  // load the service's module
  beforeEach(module('codepensityApp'));

  // instantiate service
  var editpost;
  beforeEach(inject(function (_editpost_) {
    editpost = _editpost_;
  }));

  it('should do something', function () {
    expect(!!editpost).toBe(true);
  });

});
