'use strict';

describe('Service: getPostCategories', function () {

  // load the service's module
  beforeEach(module('codepensityApp'));

  // instantiate service
  var getPostCategories;
  beforeEach(inject(function (_getPostCategories_) {
    getPostCategories = _getPostCategories_;
  }));

  it('should do something', function () {
    expect(!!getPostCategories).toBe(true);
  });

});
