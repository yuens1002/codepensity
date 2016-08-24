'use strict';

angular.module('codepensityApp')
  .controller('UserinfoCtrl', function ($scope, user, store) {
    
  var token = store.get('id_token');
  var profile = store.get('profile');
  
  // grabs/displays the profile from the matching id given by auth0
  user.get(token, profile)
      .then(function(result) {
       user.profile(result.data.data.loginUserWithAuth0Lock.user.id)
       .then(function(result) {
         $scope.firstname = result.data.data.getUser.firstName;
         $scope.lastname = result.data.data.getUser.lastName;
         $scope.profile = result;
       });
      });
  
  $scope.edit = function (id) {
    var input = {};
    input.lastName = $scope.lastname;
    input.firstName = $scope.firstname;
    input.id = id;
    input.avatarURL = $scope.avatarURL;
    user.update(input);
  };
  
});
