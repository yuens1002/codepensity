'use strict';

/**
 * @ngdoc function
 * @name codepensityApp.controller:AddpostCtrl
 * @description
 * # AddpostCtrl
 * Controller of the codepensityApp
 */
angular.module('codepensityApp')
  .controller('AddpostCtrl', function ($scope, getpost) {
     
    
  
    $scope.addPost = function () {
        
        var data = {};
        data.catNames = $scope.category.val();
        data.title = $scope.title;
        data.summary = $scope.summary;
        data.body = $scope.body;
        data.keywords = $scope.body;
        getpost.add(data).then(function(post) {
        console.log(post);
        });
      };
  });
