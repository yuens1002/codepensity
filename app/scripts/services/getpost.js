'use strict';

/**
 * @ngdoc service
 * @name codepensityApp.blog
 * @description
 * # blog
 * Factory in the codepensityApp.
 */
angular.module('codepensityApp')
  .factory('getpost', function ($http) {
  
  function get(id) {
      var data = {
      query: 'query getPostQuery($id_0: ID!){ getPost(id: $id_0){ comments { pageInfo { count } edges { node { modifiedAt body author { username avatar { url } } } } } createdAt modifiedAt title summary coverArt { name url mimeType } body likes keywords author { id username avatar { name url mimeType } } } }',
      variables: {"id_0": id}

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
  
  function update() {
    //...
  }
  
  function del() {
    // ...
  }
  
  return {
    get: get,
    update: update,
    del: del
  };
});