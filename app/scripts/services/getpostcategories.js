'use strict';

/**
 * @ngdoc service
 * @name codepensityApp.getPostCategories
 * @description
 * # getPostCategories
 * Factory in the codepensityApp.
 */
angular.module('codepensityApp')
  .factory('getpostcategories', function ($http) {
    
var data = {
    query: '{ viewer { allCategorys { edges { node { name } } } } } ',
    variables: ""
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
    })
});