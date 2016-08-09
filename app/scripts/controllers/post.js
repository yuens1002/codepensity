'use strict';

/**
 * @ngdoc function
 * @name codepensityApp.controller:PostCtrl
 * @description
 * # PostCtrl
 * Controller of the codepensityApp
 */
angular.module('codepensityApp')
  .controller('PostCtrl', function ($scope, $routeParams, getpost) {
  
  
  
  getpost.get($routeParams.postID).then(function(post) {
      $scope.post = post;
      console.log($scope.post);
      });
  });
