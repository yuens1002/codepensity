'use strict';

/**
 * @ngdoc function
 * @name codepensityApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the codepensityApp
 */

angular.module('codepensityApp').controller('MainCtrl', function($scope, $location, auth, store, $route) {
  
  $scope.$route = $route;
  
  $scope.signin = function() {
    auth.signin({
      authParams: {
        scope: 'openid name email' // Specify the scopes you want to retrieve
      }
    }, function(profile, idToken, accessToken, state, refreshToken) {
      
        console.log("PROFILE");
        console.log(profile);
        console.log("IDTOKEN");
        console.log(idToken);
      
        store.set('profile', profile);
        store.set('id_token', idToken);
        store.set('email', profile.email);
        store.set('nickname', profile.nickname);
        store.set('picture', profile.picture);
        $scope.status = auth.isAuthenticated; 
        $location.path('/userinfo');
      
    }, function(err) {
        console.log("Error :(", err);
    });
  }
  
  $scope.signout = function() {
    store.remove('profile');
    store.remove('id_token');
    auth.signout();
    $scope.status = auth.isAuthenticated;
    $location.path('/');
    
  }
  
});
