'use strict';

describe('Service: getPosts', function () {

  // load the service's module
  beforeEach(module('codepensityApp'));

  // instantiate service
  var getPosts;
  beforeEach(inject(function (_getPosts_) {
    getPosts = _getPosts_;
  }));

  it('should do something', function () {
    expect(!!getPosts).toBe(true);
  });

});
