'use strict';

/**
 * @ngdoc function
 * @name codepensityApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the codepensityApp
 */
angular.module('codepensityApp')
  .controller('BlogCtrl', function ($scope, getposts, getpostcategories) {
    //resolves https request (promise)
  
      $scope.nextPosts = function (cursor) {
        getposts.next(cursor)
        .then(function(posts) {
        $scope.posts = posts; 
        console.log($scope.posts);
        });
      };
  
      $scope.prevPosts = function (cursor) {
        getposts.prev(cursor)
        .then(function(posts) {
        $scope.posts = posts; 
        console.log($scope.posts);
        });
      };
      
      getposts.get().then(function(posts) {
      $scope.posts = posts;
      console.log($scope.posts);
      });
  
      getpostcategories.then(function(categories) {
      $scope.categories = categories;
      console.log($scope.categories);  
      });
  
  });
