'use strict';

/**
 * @ngdoc function
 * @name codepensityApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the codepensityApp
 */
angular.module('codepensityApp')
  .controller('MainCtrl', function ($scope, getposts, getpostcategories) {
      //resolves https request (promise)
      getposts.then(function(posts) {
      $scope.posts = posts;
      console.log($scope.posts);
      });
      getpostcategories.then(function(categories) {
      $scope.categories = categories;
      console.log($scope.categories);  
      });
});
