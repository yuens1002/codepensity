'use strict';

describe('Service: blog', function () {

  // load the service's module
  beforeEach(module('codepensityApp'));

  // instantiate service
  var blog;
  beforeEach(inject(function (_blog_) {
    blog = _blog_;
  }));

  it('should do something', function () {
    expect(!!blog).toBe(true);
  });

});
