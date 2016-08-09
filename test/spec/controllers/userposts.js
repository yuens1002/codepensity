'use strict';

describe('Controller: UserpostsCtrl', function () {

  // load the controller's module
  beforeEach(module('codepensityApp'));

  var UserpostsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserpostsCtrl = $controller('UserpostsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UserpostsCtrl.awesomeThings.length).toBe(3);
  });
});
