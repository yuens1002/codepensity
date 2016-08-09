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
  
  user.get(token, profile)
      .then(function(result) {
       // store.set('profile', result.user.id);
       console.log()
       $scope.profile = result;
       
       
      });
});
