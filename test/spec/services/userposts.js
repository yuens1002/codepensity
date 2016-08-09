'use strict';

describe('Service: userposts', function () {

  // load the service's module
  beforeEach(module('codepensityApp'));

  // instantiate service
  var userposts;
  beforeEach(inject(function (_userposts_) {
    userposts = _userposts_;
  }));

  it('should do something', function () {
    expect(!!userposts).toBe(true);
  });

});
