'use strict';

/**
 * @ngdoc service
 * @name codepensityApp.blog
 * @description
 * # blog
 * Factory in the codepensityApp.
 */
angular.module('codepensityApp')
  .factory('getpost', function ($http, $location) {
  
  function get(id) {
      var data = {
      query: 'query getPostQuery($id_0: ID!){ getPost(id: $id_0){ id comments { pageInfo { count } edges { node { modifiedAt body author { username firstName avatar { url } } } } } createdAt modifiedAt title summary body likes keywords author { id username firstName avatar { name url mimeType } } } }',
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
  
  function add(post) {
    var data = {
      query: 'mutation createPostQuery($input_0: _CreatePostInput!){ createPost(input: $input_0){ changedPost { id createdAt modifiedAt title summary body likes keywords author { id username roles { role userId isAdmin } createdAt modifiedAt lastLogin lastName avatar { name url mimeType } } } } } ',
    variables: {"input_0": {"title":post.title,"summary":post.summary,"body":post.body,"likes":0,"keywords":post.keywords,"authorId":post.author}
  }};
    
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
  
  function update(post) {
    var data = {
    query: 'mutation updatePostQuery($input_0: _UpdatePostInput!){ updatePost(input: $input_0){ changedPost { id createdAt modifiedAt title summary body keywords } } } ',
    variables: {"input_0": {"id" : post.id, "title" : post.title, "body" : post.body, "summary" : post.summary}}
    };

  return $http.post("https://api.scaphold.io/graphql/codepensity", 
      data).then(function(result) {
          console.log("SUCCESS");
          console.log(result);
          $location.path("/post/" + result.data.data.updatePost.changedPost.id);
      }).catch(function(err)  {
          console.log("ERROR");
          console.log(err);
          throw err;
      });

  }
           
  function comment(comment) {
    var data = {
    query: 'mutation createCommentQuery($input_0: _CreateCommentInput!){ createComment(input: $input_0){ changedComment { id } } } ',
    variables: {"input_0": {"postId" : comment.post,"body": comment.body,"authorId": comment.author}}
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
    add: add,
    update: update,
    comment: comment
  };
});
