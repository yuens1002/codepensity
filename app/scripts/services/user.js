'use strict';

/**
 * @ngdoc service
 * @name codepensityApp.user
 * @description
 * # user
 * Factory in the codepensityApp.
 */
angular.module('codepensityApp')
  .factory('user', function ($http, store) {
    
  
  function get(idToken, profile) {
  
    var data = {
      query: 'mutation loginUserWithAuth0LockQuery($input_0: _LoginUserWithAuth0LockInput!){ loginUserWithAuth0Lock(input: $input_0){ id_token user { id username firstName lastName } } }',
    variables: {"input_0": {"token" : idToken, "identity" : profile.identities[0]}}
  };
    
    var options = {};
    if (store.get('idToken')) {
      options.headers = {
        Authorization: "Bearer " + store.get('idToken')
      }
    }
    
    return $http.post("https://api.scaphold.io/graphql/codepensity", 
      data, options).then(function(result) {
          console.log("SUCCESS");
          console.log(result);
          store.set('userID', result.data.data.loginUserWithAuth0Lock.user.id);
          store.set('idToken', result.data.data.loginUserWithAuth0Lock.id_token);
          return result;
      }).catch(function(err) {
          console.log("ERROR");
          console.log(err);
          throw err;
      });
  }
  
  function posts(userID) {
  
    var data = {
      query: 'query getUserQuery($id_0: ID!){ getUser(id: $id_0){ posts { pageInfo { count } edges { node { id title summary } } } } }',
    variables: {"id_0": 'NThjYzFiZDYtNjU0MS00NjJhLWI3YjEtZjA0ZTUzMGY5MjM3Ojg1YmQ3YzUwLTJjOWItNDExYS1iNjQ4LTQ0MDU0MjEzZjFjOA=='}
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
    posts: posts,
  }; 
  });