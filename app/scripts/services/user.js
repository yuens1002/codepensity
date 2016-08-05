'use strict';

/**
 * @ngdoc service
 * @name codepensityApp.user
 * @description
 * # user
 * Factory in the codepensityApp.
 */
angular.module('codepensityApp')
  .factory('user', function ($http) {
    
  
  function verify(idToken, profile) {
  
  var data = {
    query: 'mutation loginUserWithAuth0LockQuery($input_0: _LoginUserWithAuth0LockInput!){ loginUserWithAuth0Lock(input: $input_0){ id_token user { id username } } }',
    variables: {"input_0": {"token" : idToken, "identity" : profile.identities[0]}}
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
    verify: verify,
  }; 
  });