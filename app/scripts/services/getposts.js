'use strict';

/**
 * @ngdoc service
 * @name codepensityApp.getPosts
 * @description
 * # getPosts
 * Factory in the codepensityApp.
 */
angular.module('codepensityApp')
  .factory('getposts', function ($http) {  
  
  function get() {
  
    var data = {
        query: '{ viewer { allPosts (last: 10) { edges { cursor node { id title summary likes createdAt author { username firstName } } } pageInfo { count hasNextPage hasPreviousPage } } } }'
    };

    return $http.post("https://api.scaphold.io/graphql/codepensity", 
        data).then(function(result) {
            console.log("SUCCESS");
            console.log(result);
            return result;
        }).catch(function(err) {
            console.log("ERROR");
            console.log(err);
            throw err;
        });
  }
  
  function next(cursor) {
  
    var data = {
        query: '{ viewer { allPosts (last: 10, after: "' + cursor + '") { edges { cursor node { id title summary likes createdAt author { username firstName } coverArt { url } } } pageInfo { count hasNextPage hasPreviousPage } } } }'
    };

    return $http.post("https://api.scaphold.io/graphql/codepensity", 
        data).then(function(result) {
            console.log("SUCCESS");
            console.log(result);
            return result;
        }).catch(function(err) {
            console.log("ERROR");
            console.log(err);
            throw err;
        });
  }
  
  
  function prev(cursor) {
  
    var data = {
        query: '{ viewer { allPosts (last: 10, before:"' + cursor + '") { edges { cursor node { id title summary likes createdAt author { username firstName } coverArt { url } } } pageInfo { count hasNextPage hasPreviousPage } } } }'
    };

    return $http.post("https://api.scaphold.io/graphql/codepensity", 
        data).then(function(result) {
            console.log("SUCCESS");
            console.log(result);
            return result;
        }).catch(function(err) {
            console.log("ERROR");
            console.log(err);
            throw err;
        });
  }
  return {
    get: get,
    next: next,
    prev: prev,
  };
  
});
  
           
           
           
           
           

