'use strict';

/**
 * @ngdoc function
 * @name codepensityApp.controller:UserpostsCtrl
 * @description
 * # UserpostsCtrl
 * Controller of the codepensityApp
 */
angular.module('codepensityApp')
  .controller('UserpostsCtrl', function ($scope, user, store) {                          
  
    user.posts(store.get('userID'))
      .then(function(result) {
       console.log(result);
       $scope.posts = result;
       });
});
