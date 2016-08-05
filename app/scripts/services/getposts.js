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
    
var
  data = {
    query: '{ viewer { allPosts { edges { cursor node { id title summary likes createdAt author { username } coverArt { url } } } pageInfo { count hasNextPage hasPreviousPage } } } }'
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
});