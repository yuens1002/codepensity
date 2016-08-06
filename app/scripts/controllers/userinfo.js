'use strict';

angular.module('codepensityApp')
  .controller('UserinfoCtrl', function ($scope, user, store) {
    // Using a promise
  /* auth.profilePromise.then(function(profile) {
    $scope.profile = profile; 
  }); */
  // Or using the object
  var token = store.get('id_token');
  var profile = store.get('profile');
  
  user.verify(token, profile)
      .then(function(result) {
       $scope.profile = result;
       console.log($scope.profile);
      });
});
