'use strict';

/**
 * @ngdoc function
 * @name codepensityApp.controller:EditpostCtrl
 * @description
 * # EditpostCtrl
 * Controller of the codepensityApp
 */
angular.module('codepensityApp')
  .controller('EditpostCtrl', function ($scope, $routeParams, getpost, $location) {
  
    getpost.get($routeParams.postID).then(function(post) {
      $scope.post = post;
      $scope.title = post.data.data.getPost.title;
      $scope.body = post.data.data.getPost.body;
      $scope.summary = post.data.data.getPost.summary;
      console.log(post);
      });
    
    $scope.update = function () {
      var data = {};
      data.id = $routeParams.postID;
      data.title = $scope.title;
      data.summary = $scope.summary;
      data.body = $scope.body;
      getpost.update(data).then(function(post) {
      console.log(post);
    });
    };
    
  
});
