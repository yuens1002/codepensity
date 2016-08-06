'use strict';

/**
 * @ngdoc function
 * @name codepensityApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the codepensityApp
 */

angular.module('codepensityApp').controller('MainCtrl', function($scope, $location, auth, store) {
  
  
  $scope.signin = function() {
    auth.signin({
      authParams: {
        scope: 'openid name email' // Specify the scopes you want to retrieve
      }
    }, function(profile, idToken, accessToken, state, refreshToken) {
        store.set('profile', profile);
        store.set('id_token', idToken);
        
        $location.path('/userinfo');
        $scope.login = function () {return false};
      
    }, function(err) {
      console.log("Error :(", err);
    });
  }
  
  $scope.signout = function() {
    store.remove('profile');
    store.remove('id_token');
    auth.signout();
    $location.path('/');
    $scope.login = function () {return true};
  }
  
});
