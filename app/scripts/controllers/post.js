'use strict';

/**
 * @ngdoc function
 * @name codepensityApp.controller:PostCtrl
 * @description
 * # PostCtrl
 * Controller of the codepensityApp
 */
angular.module('codepensityApp')
  .controller('PostCtrl', function ($scope, $routeParams, getpost, store) {
    
    $scope.publish = function(post) {
      var comment = {};
      comment.author = store.userID;
      console.log(comment.author);
      comment.body = $scope.comment;
      comment.post = post;
      getpost.comment(comment)
      .then(function() {
        getpost.get($routeParams.postID).then(function(post) {
          $scope.post = post;
          console.log($scope.post);
        });
      });
    };
  
  getpost.get($routeParams.postID).then(function(post) {
      $scope.post = post;
      console.log($scope.post);
      });
  });
