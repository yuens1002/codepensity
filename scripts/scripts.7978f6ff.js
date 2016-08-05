"use strict";angular.module("codepensityApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","auth0","angular-storage","angular-jwt"]).config(["$routeProvider","authProvider",function(a,b){b.init({domain:"codepensity.auth0.com",clientID:"t35QGpPHzCk8WwqsxLgEFOrYccjRUwNG",loginUrl:"/login"}),a.when("/",{templateUrl:"views/blog.html",controller:"BlogCtrl",controllerAs:"blog"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/post/:postID",{templateUrl:"views/post.html",controller:"PostCtrl",controllerAs:"post"}).when("/userinfo",{templateUrl:"views/userinfo.html",controller:"UserinfoCtrl",controllerAs:"userinfo"}).otherwise({redirectTo:"/"})}]).run(["auth",function(a){a.hookEvents()}]),angular.module("codepensityApp").controller("MainCtrl",["$scope","$location","auth","user",function(a,b,c,d){a.signin=function(){c.signin({authParams:{scope:"openid name email"}},function(a,c,e,f,g){d.verify(c,a).then(function(a){console.log(a),b.path("/userinfo")})},function(a){console.log("Error :(",a)})}}]),angular.module("codepensityApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("codepensityApp").factory("getposts",["$http",function(a){var b={query:"{ viewer { allPosts { edges { cursor node { id title summary likes createdAt author { username } coverArt { url } } } pageInfo { count hasNextPage hasPreviousPage } } } }"};return a.post("https://api.scaphold.io/graphql/codepensity",b).then(function(a){return console.log("SUCCESS"),console.log(a),a})["catch"](function(a){throw console.log("ERROR"),console.log(a),a})}]),angular.module("codepensityApp").factory("getpostcategories",["$http",function(a){var b={query:"{ viewer { allCategorys { edges { node { name } } } } } "};return a.post("https://api.scaphold.io/graphql/codepensity",b).then(function(a){return console.log("SUCCESS"),console.log(a),a})["catch"](function(a){throw console.log("ERROR"),console.log(a),a})}]),angular.module("codepensityApp").controller("PostCtrl",["$scope","$routeParams","getpost",function(a,b,c){c.get(b.postID).then(function(b){a.post=b,console.log(a.post)})}]),angular.module("codepensityApp").factory("getpost",["$http",function(a){function b(b){var c={query:"query getPostQuery($id_0: ID!){ getPost(id: $id_0){ comments { pageInfo { count } edges { node { modifiedAt body author { username avatar { url } } } } } createdAt modifiedAt title summary coverArt { name url mimeType } body likes keywords author { id username avatar { name url mimeType } } } }",variables:{id_0:b}};return a.post("https://api.scaphold.io/graphql/codepensity",c).then(function(a){return console.log("SUCCESS"),console.log(a),a})["catch"](function(a){throw console.log("ERROR"),console.log(a),a})}function c(){}function d(){}return{get:b,update:c,del:d}}]),angular.module("codepensityApp").controller("BlogCtrl",["$scope","getposts","getpostcategories",function(a,b,c){b.then(function(b){a.posts=b,console.log(a.posts)}),c.then(function(b){a.categories=b,console.log(a.categories)})}]),angular.module("codepensityApp").controller("UserinfoCtrl",["$scope","auth",function(a,b){a.profile=b.profile}]),angular.module("codepensityApp").factory("user",["$http",function(a){function b(b,c){var d={query:"mutation loginUserWithAuth0LockQuery($input_0: _LoginUserWithAuth0LockInput!){ loginUserWithAuth0Lock(input: $input_0){ id_token user { id username } } }",variables:{input_0:{token:b,identity:c.identities[0]}}};return a.post("https://api.scaphold.io/graphql/codepensity",d).then(function(a){return console.log("SUCCESS"),console.log(a),a})["catch"](function(a){throw console.log("ERROR"),console.log(a),a})}return{verify:b}}]),angular.module("codepensityApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/blog.html",'<!-- Page Header --><!-- Set your background image for this header on the line below. --> <header class="intro-header" style="background-image: url(\'images/home-bg.jpg\')"> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div class="site-heading"> <h1>Random Blog</h1> <hr class="small"> <span class="subheading">Summary of the random blog would show up here</span> </div> </div> </div> </div> </header> <!-- Main Content --> <div data-ng-if="posts" class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div> <ul class="list-inline"> <li><strong>Categories:</strong></li> <li><span class="badge selected">All</span></li> <li data-ng-repeat="cat in categories.data.data.viewer.allCategorys.edges"><span class="badge">{{cat.node.name}}</span></li> </ul> </div> <hr> <div data-ng-repeat="post in posts.data.data.viewer.allPosts.edges" class="post-preview"> <a href data-ng-href="#/post/{{post.node.id}}"> <h2 class="post-title"> {{post.node.title}} </h2> <h3 class="post-subtitle"> {{post.node.summary}} </h3> </a> <p class="post-meta">Posted by <a href data-ng-href="#">{{post.node.author.username}}</a> on {{post.node.createdAt | date: \'MMMM dd, yyyy\'}}</p> </div> <hr> <!-- Pager --> <ul data-ng-if="posts.data.data.viewer.allPosts.pageInfo.hasNextPage" class="pager"> <li class="next"> <a href="#">Older Posts &rarr;</a> </li> </ul> </div> </div> </div>'),a.put("views/main.html",'<!-- Page Header --><!-- Set your background image for this header on the line below. --> <header class="intro-header" style="background-image: url(\'images/home-bg.jpg\')"> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div class="site-heading"> <h1>Random Blog</h1> <hr class="small"> <span class="subheading">Summary of the random blog would show up here</span> </div> </div> </div> </div> </header>'),a.put("views/post.html",'<!-- Page Header --><!-- Set your background image for this header on the line below. --> <header class="intro-header" style="background-image: url(\'images/post-bg.jpg\')"> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div class="post-heading"> <h1>{{post.data.data.getPost.title}}</h1> <h2 class="subheading">{{post.data.data.getPost.summary}}</h2> <span class="meta">Posted by <a href="#">{{post.data.data.getPost.author.username}}</a> on {{post.data.data.getPost.createdAt | date: \'MMMM dd, yyyy\'}} <i class="fa fa-heart-o" aria-hidden="true"></i> {{post.data.data.getPost.likes}} <i class="fa fa-comment-o" aria-hidden="true"></i> {{post.data.data.getPost.comments.pageInfo.count}}</span> </div> </div> </div> </div> </header> <!-- Post Content --> <article> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <p>{{post.data.data.getPost.body}}</p> </div> </div> </div> </article> <article data-ng-if="post.data.data.getPost.comments.pageInfo.count>0"> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <h2>Comments</h2> <div data-ng-repeat="comment in post.data.data.getPost.comments.edges"> <p class="text-muted small">by {{comment.node.author.username}} on {{comment.node.modifiedAt | date: \'MMMM dd, yyyy\'}}</p> <p>{{comment.node.body}}</p> </div> </div> </div> </div> </article>'),a.put("views/user.html","<p>This is the user view.</p>"),a.put("views/userinfo.html","<p>This is the userinfo view.</p>")}]);