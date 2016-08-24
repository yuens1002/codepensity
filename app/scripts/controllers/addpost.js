'use strict';

/**
 * @ngdoc function
 * @name codepensityApp.controller:AddpostCtrl
 * @description
 * # AddpostCtrl
 * Controller of the codepensityApp
 */
angular.module('codepensityApp')
  .controller('AddpostCtrl', function ($scope, getpost, store) {
     
    
  
    $scope.addPost = function () {
        
        var data = {};
        data.coverArtURL = $scope.coverArtURL;
        data.author = store.get('userID');
        data.catNames = $scope.category;
        data.title = $scope.title;
        data.summary = $scope.summary;
        data.body = $scope.body;
        data.keywords = $scope.keywords;
        getpost.add(data).then(function(post) {
        console.log(post);
        });
      };
  });
