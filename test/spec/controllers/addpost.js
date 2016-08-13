'use strict';

describe('Controller: AddpostCtrl', function () {

  // load the controller's module
  beforeEach(module('codepensityApp'));

  var AddpostCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddpostCtrl = $controller('AddpostCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddpostCtrl.awesomeThings.length).toBe(3);
  });
});
