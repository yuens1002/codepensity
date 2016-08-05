'use strict';

angular.module('codepensityApp')
  .controller('UserinfoCtrl', function ($scope, auth) {
    // Using a promise
  /* auth.profilePromise.then(function(profile) {
    $scope.profile = profile;
  }); */
  // Or using the object
  $scope.profile = auth.profile;
});
