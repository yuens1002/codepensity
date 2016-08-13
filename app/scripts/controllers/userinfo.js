'use strict';

angular.module('codepensityApp')
  .controller('UserinfoCtrl', function ($scope, user, store) {
    
  var token = store.get('id_token');
  var profile = store.get('profile');
  
  user.get(token, profile)
      .then(function(result) {
       $scope.profile = result;
      });
});
