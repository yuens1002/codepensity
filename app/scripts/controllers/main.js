'use strict';

/**
 * @ngdoc function
 * @name codepensityApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the codepensityApp
 */

angular.module('codepensityApp').controller('MainCtrl', function($scope, $location, auth, user) {
  $scope.signin = function() {
    auth.signin({
      authParams: {
        scope: 'openid name email' // Specify the scopes you want to retrieve
      }
    }, function(profile, idToken, accessToken, state, refreshToken) {
      user.verify(idToken, profile)
      .then(function(result) {
        console.log(result);
        $location.path('/userinfo');
      });
      
    }, function(err) {
      console.log("Error :(", err);
    });
  }
});
