'use strict';

/**
 * @ngdoc service
 * @name codepensityApp.user
 * @description
 * # user
 * Factory in the codepensityApp.
 */
angular.module('codepensityApp')
  .factory('user', function ($http, store, $location) {
    
  
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
      variables: {"id_0": userID}
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
  
  function del(post) {
  
    var data = {
      query: 'mutation deletePostQuery($input_0: _DeletePostInput!){ deletePost(input: $input_0){ changedPost { id } } } ',
      variables: {"input_0": {"id":post}}
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
  
  function profile(userID) {
      console.log(userID);
    var data = {
      query: 'query getUserQuery($id_0: ID!){ getUser(id: $id_0){ id username roles { role userId isAdmin } createdAt modifiedAt lastLogin lastName avatar { name url mimeType } firstName } } ',
      variables: {"id_0": userID}
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
  
  function update(user) {
    var data = {
      query: 'mutation updateUserQuery($input_0: _UpdateUserInput!){ updateUser(input: $input_0){ changedUser { id username roles { role userId isAdmin } createdAt modifiedAt lastLogin lastName avatar { name url mimeType }  firstName } } } ',
      variables: {"input_0": {"id":user.id,"lastName":user.lastName,"firstName":user.firstName}}
    };
    
    return $http.post("https://api.scaphold.io/graphql/codepensity", 
      data).then(function() {
          $location.path('/userinfo');
      }).catch(function(err) {
          console.log("ERROR");
          console.log(err);
          throw err;
      });
  }
  
  
  
  
  
  return {
    profile: profile,
    get: get,
    del: del,
    posts: posts,
    update: update
  }; 
  });