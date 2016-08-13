"use strict";angular.module("codepensityApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","auth0","angular-storage","angular-jwt","ngAutosize"]).config(["$routeProvider","authProvider",function(a,b){b.init({domain:"codepensity.auth0.com",clientID:"t35QGpPHzCk8WwqsxLgEFOrYccjRUwNG",loginUrl:"/login"}),a.when("/",{templateUrl:"views/blog.html",controller:"BlogCtrl",controllerAs:"blog"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/post/:postID",{templateUrl:"views/post.html",controller:"PostCtrl",controllerAs:"post",activetab:"post"}).when("/userinfo",{templateUrl:"views/userinfo.html",controller:"UserinfoCtrl",controllerAs:"userinfo",activetab:"profile"}).when("/userposts",{templateUrl:"views/userposts.html",controller:"UserpostsCtrl",controllerAs:"userposts",activetab:"post"}).when("/editpost/:postID",{templateUrl:"views/editpost.html",controller:"EditpostCtrl",controllerAs:"editpost",activetab:"post"}).when("/addpost",{templateUrl:"views/addpost.html",controller:"AddpostCtrl",controllerAs:"addpost"}).otherwise({redirectTo:"/"})}]).run(["auth",function(a){a.hookEvents()}]),angular.module("codepensityApp").controller("MainCtrl",["$scope","$location","auth","store","$route",function(a,b,c,d,e){a.$route=e,a.signin=function(){c.signin({authParams:{scope:"openid name email"}},function(e,f,g,h,i){console.log("PROFILE"),console.log(e),console.log("IDTOKEN"),console.log(f),d.set("profile",e),d.set("id_token",f),console.log(c.isAuthenticated),a.status=c.isAuthenticated,b.path("/userinfo")},function(a){console.log("Error :(",a)})},a.signout=function(){d.remove("profile"),d.remove("id_token"),c.signout(),a.status=c.isAuthenticated,b.path("/")}}]),angular.module("codepensityApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("codepensityApp").factory("getposts",["$http",function(a){function b(){var b={query:"{ viewer { allPosts (last: 10) { edges { cursor node { id title summary likes createdAt author { username } coverArt { url } } } pageInfo { count hasNextPage hasPreviousPage } } } }"};return a.post("https://api.scaphold.io/graphql/codepensity",b).then(function(a){return console.log("SUCCESS"),console.log(a),a})["catch"](function(a){throw console.log("ERROR"),console.log(a),a})}function c(b){var c={query:'{ viewer { allPosts (last: 10, after: "'+b+'") { edges { cursor node { id title summary likes createdAt author { username } coverArt { url } } } pageInfo { count hasNextPage hasPreviousPage } } } }'};return a.post("https://api.scaphold.io/graphql/codepensity",c).then(function(a){return console.log("SUCCESS"),console.log(a),a})["catch"](function(a){throw console.log("ERROR"),console.log(a),a})}function d(b){var c={query:'{ viewer { allPosts (last: 10, before:"'+b+'") { edges { cursor node { id title summary likes createdAt author { username } coverArt { url } } } pageInfo { count hasNextPage hasPreviousPage } } } }'};return a.post("https://api.scaphold.io/graphql/codepensity",c).then(function(a){return console.log("SUCCESS"),console.log(a),a})["catch"](function(a){throw console.log("ERROR"),console.log(a),a})}return{get:b,next:c,prev:d}}]),angular.module("codepensityApp").factory("getpostcategories",["$http",function(a){var b={query:"{ viewer { allCategorys { edges { node { name } } } } } "};return a.post("https://api.scaphold.io/graphql/codepensity",b).then(function(a){return console.log("SUCCESS"),console.log(a),a})["catch"](function(a){throw console.log("ERROR"),console.log(a),a})}]),angular.module("codepensityApp").controller("PostCtrl",["$scope","$routeParams","getpost",function(a,b,c){c.get(b.postID).then(function(b){a.post=b,console.log(a.post)})}]),angular.module("codepensityApp").factory("getpost",["$http",function(a){function b(b){var c={query:"query getPostQuery($id_0: ID!){ getPost(id: $id_0){ comments { pageInfo { count } edges { node { modifiedAt body author { username avatar { url } } } } } createdAt modifiedAt title summary coverArt { name url mimeType } body likes keywords author { id username avatar { name url mimeType } } } }",variables:{id_0:b}};return a.post("https://api.scaphold.io/graphql/codepensity",c).then(function(a){return console.log("SUCCESS"),console.log(a),a})["catch"](function(a){throw console.log("ERROR"),console.log(a),a})}function c(b){var c={query:"mutation createPostQuery($input_0: _CreatePostInput!){ createPost(input: $input_0){ changedPost { id createdAt modifiedAt title summary coverArt { name url mimeType } body likes keywords author { id username roles { role userId isAdmin } createdAt modifiedAt lastLogin lastName avatar { name url mimeType } } } } } ",variables:{input_0:{title:b.title,summary:b.summary,body:b.body,likes:0,keywords:b.keywords,authorId:b.userID,coverArt:{url:b.coverArt.url}}}};return a.post("https://api.scaphold.io/graphql/codepensity",c).then(function(a){return console.log("SUCCESS"),console.log(a),a})["catch"](function(a){throw console.log("ERROR"),console.log(a),a})}function d(b){var c={query:"mutation updatePostQuery($input_0: _UpdatePostInput!){ updatePost(input: $input_0){ changedPost { id createdAt modifiedAt title summary coverArt { name url mimeType } body keywords } } } ",variables:{input_0:{id:b.id,title:b.title,body:b.body,summary:b.summary}}};return a.post("https://api.scaphold.io/graphql/codepensity",c).then(function(a){return console.log("SUCCESS"),console.log(a),a})["catch"](function(a){throw console.log("ERROR"),console.log(a),a})}function e(){}return{get:b,add:c,update:d,del:e}}]),angular.module("codepensityApp").controller("BlogCtrl",["$scope","getposts","getpostcategories",function(a,b,c){a.nextPosts=function(c){b.next(c).then(function(b){a.posts=b,console.log(a.posts)})},a.prevPosts=function(c){b.prev(c).then(function(b){a.posts=b,console.log(a.posts)})},b.get().then(function(b){a.posts=b,console.log(a.posts)}),c.then(function(b){a.categories=b,console.log(a.categories)})}]),angular.module("codepensityApp").controller("UserinfoCtrl",["$scope","user","store",function(a,b,c){var d=c.get("id_token"),e=c.get("profile");b.get(d,e).then(function(b){a.profile=b})}]),angular.module("codepensityApp").factory("user",["$http","store",function(a,b){function c(c,d){var e={query:"mutation loginUserWithAuth0LockQuery($input_0: _LoginUserWithAuth0LockInput!){ loginUserWithAuth0Lock(input: $input_0){ id_token user { id username firstName lastName } } }",variables:{input_0:{token:c,identity:d.identities[0]}}},f={};return b.get("idToken")&&(f.headers={Authorization:"Bearer "+b.get("idToken")}),a.post("https://api.scaphold.io/graphql/codepensity",e,f).then(function(a){return console.log("SUCCESS"),console.log(a),b.set("userID",a.data.data.loginUserWithAuth0Lock.user.id),b.set("idToken",a.data.data.loginUserWithAuth0Lock.id_token),a})["catch"](function(a){throw console.log("ERROR"),console.log(a),a})}function d(b){var c={query:"query getUserQuery($id_0: ID!){ getUser(id: $id_0){ posts { pageInfo { count } edges { node { id title summary } } } } }",variables:{id_0:"NThjYzFiZDYtNjU0MS00NjJhLWI3YjEtZjA0ZTUzMGY5MjM3Ojg1YmQ3YzUwLTJjOWItNDExYS1iNjQ4LTQ0MDU0MjEzZjFjOA=="}};return a.post("https://api.scaphold.io/graphql/codepensity",c).then(function(a){return console.log("SUCCESS"),console.log(a),a})["catch"](function(a){throw console.log("ERROR"),console.log(a),a})}return{get:c,posts:d}}]),angular.module("codepensityApp").controller("UserpostsCtrl",["$scope","user","store",function(a,b,c){b.posts(c.get("userID")).then(function(b){console.log(b),a.posts=b})}]),angular.module("codepensityApp").controller("EditpostCtrl",["$scope","$routeParams","getpost","$location",function(a,b,c,d){c.get(b.postID).then(function(b){a.post=b,a.title=b.data.data.getPost.title,a.body=b.data.data.getPost.body,a.summary=b.data.data.getPost.summary,console.log(b)}),a.update=function(){var d={};d.id=b.postID,d.title=a.title,d.summary=a.summary,d.body=a.body,c.update(d).then(function(a){console.log(a)})}}]),angular.module("codepensityApp").controller("AddpostCtrl",["$scope","getpost",function(a,b){a.addPost=function(){var c={};c.catNames=a.category.val(),c.title=a.title,c.summary=a.summary,c.body=a.body,c.keywords=a.body,b.add(c).then(function(a){console.log(a)})}}]),angular.module("codepensityApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/addpost.html",'<!-- Page Header --><!-- Set your background image for this header on the line below. --> <form> <header class="intro-header" style="background-image: url(\'images/post-bg.jpg\')"> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div class="post-heading"> <h1>{{title}}</h1> <h2 class="subheading">{{summary}}</h2> <span class="meta">Last Updated on {{post.data.data.getPost.modifiedAt | date: \'MMMM dd, yyyy\'}} <i class="fa fa-heart-o" aria-hidden="true"></i> {{post.data.data.getPost.likes}} <i class="fa fa-comment-o" aria-hidden="true"></i> {{post.data.data.getPost.comments.pageInfo.count}}</span> </div> </div> </div> </div> </header> <!-- Post Content --> <article> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div class="form-group"> <label for="title" class="post-heading">Title</label> <input class="form-control" id="Title" data-ng-model="title"> </div> <div class="form-group post-heading"> <label for="summary" class="post-heading">Summary</label> <input class="form-control" id="Title" data-ng-model="summary"></div> <div class="form-group post-heading"> <label for="body">Body</label> <textarea class="form-control" rows="10" id="body" data-ng-model="body" data-ng-autosize></textarea> </div> <div class="form-group"> <label for="exampleInputFile">Upload an Image</label> <input type="file" id="fileURL"> <p class="small help-block">jpg, png, pdf, and gif formats are supported</p> </div> <div class="text-right"> <a href="" data-ng-click="update()" class="btn btn-default">Update</a> </div> </div> </div> </div> </article> </form>'),a.put("views/blog.html",'<!-- Page Header --><!-- Set your background image for this header on the line below. --> <header class="intro-header" style="background-image: url(\'images/home-bg.jpg\')"> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div class="site-heading"> <h1>Random Blog</h1> <hr class="small"> <span class="subheading">Summary of the random blog would show up here</span> </div> </div> </div> </div> </header> <!-- Main Content --> <div data-ng-if="posts" class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div> <ul class="list-inline"> <li><strong>Categories:</strong></li> <li><span class="badge">All</span></li> <li data-ng-repeat="cat in categories.data.data.viewer.allCategorys.edges"><span class="badge">{{cat.node.name}}</span></li> </ul> </div> <hr> <div data-ng-repeat="post in posts.data.data.viewer.allPosts.edges" class="post-preview"> <a href data-ng-href="#/post/{{post.node.id}}"> <h2 class="post-title"> {{post.node.title}} </h2> <h3 class="post-subtitle"> {{post.node.summary}} </h3> </a> <p class="post-meta">Posted by <a href data-ng-href="#">{{post.node.author.username}}</a> on {{post.node.createdAt | date: \'MMMM dd, yyyy\'}}</p> </div> <!-- Pager --> <div> <ul class="pager"> <li data-ng-if="posts.data.data.viewer.allPosts.pageInfo.hasPreviousPage" class="previous"> <a href="" data-ng-click="prevPosts(posts.data.data.viewer.allPosts.edges[0].cursor)"><span aria-hidden="true">&larr;</span> Newer Posts</a> </li> <li data-ng-if="posts.data.data.viewer.allPosts.pageInfo.hasNextPage" class="next"> <a href="" data-ng-click="nextPosts(posts.data.data.viewer.allPosts.edges[posts.data.data.viewer.allPosts.edges.length-1].cursor)">Older Posts <span aria-hidden="true">&rarr;</span></a> </li> </ul> </div> <div><p></p></div> </div> </div> </div>'),a.put("views/editpost.html",'<!-- Page Header --><!-- Set your background image for this header on the line below. --> <form> <header class="intro-header" style="background-image: url(\'images/post-bg.jpg\')"> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div class="post-heading"> <h1>{{title}}</h1> <h2 class="subheading">{{summary}}</h2> <span class="meta">Last Updated on {{post.data.data.getPost.modifiedAt | date: \'MMMM dd, yyyy\'}} <i class="fa fa-heart-o" aria-hidden="true"></i> {{post.data.data.getPost.likes}} <i class="fa fa-comment-o" aria-hidden="true"></i> {{post.data.data.getPost.comments.pageInfo.count}}</span> </div> </div> </div> </div> </header> <!-- Post Content --> <article> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div class="form-group"> <label for="title" class="post-heading">Title</label> <input class="form-control" id="Title" data-ng-model="title"> </div> <div class="form-group post-heading"> <label for="summary" class="post-heading">Summary</label> <input class="form-control" id="Title" data-ng-model="summary"></div> <div class="form-group post-heading"> <label for="body">Body</label> <textarea class="form-control" rows="10" id="body" data-ng-model="body" data-ng-autosize></textarea> </div> <div class="form-group"> <label for="exampleInputFile">Upload an Image</label> <input type="file" id="fileURL"> <p class="small help-block">jpg, png, pdf, and gif formats are supported</p> </div> <div class="text-right"> <a href="" data-ng-click="update()" class="btn btn-default">Update</a> </div> </div> </div> </div> </article> </form>'),a.put("views/main.html",'<!-- Page Header --><!-- Set your background image for this header on the line below. --> <header class="intro-header" style="background-image: url(\'images/home-bg.jpg\')"> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div class="site-heading"> <h1>Random Blog</h1> <hr class="small"> <span class="subheading">Summary of the random blog would show up here</span> </div> </div> </div> </div> </header>'),a.put("views/post.html",'<!-- Page Header --><!-- Set your background image for this header on the line below. --> <header class="intro-header" style="background-image: url(\'images/post-bg.jpg\')"> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div class="post-heading"> <h1>{{post.data.data.getPost.title}}</h1> <h2 class="subheading">{{post.data.data.getPost.summary}}</h2> <span class="meta">Posted by <a href="#">{{post.data.data.getPost.author.username}}</a> on {{post.data.data.getPost.createdAt | date: \'MMMM dd, yyyy\'}} <i class="fa fa-heart-o" aria-hidden="true"></i> {{post.data.data.getPost.likes}} <i class="fa fa-comment-o" aria-hidden="true"></i> {{post.data.data.getPost.comments.pageInfo.count}}</span> </div> </div> </div> </div> </header> <!-- Post Content --> <article> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <p>{{post.data.data.getPost.body}}</p> </div> </div> </div> </article> <article data-ng-if="post.data.data.getPost.comments.pageInfo.count>0"> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <h2>Comments</h2> <div data-ng-repeat="comment in post.data.data.getPost.comments.edges"> <p class="text-muted small">by {{comment.node.author.username}} on {{comment.node.modifiedAt | date: \'MMMM dd, yyyy\'}}</p> <p>{{comment.node.body}}</p> </div> </div> </div> </div> </article>'),a.put("views/userinfo.html",'<!-- Page Header --><!-- Set your background image for this header on the line below. --> <header class="intro-header" style="background-image: url(\'images/post-bg.jpg\')"> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div class="post-heading"> <p> Hello </p> <h1>{{profile.data.data.loginUserWithAuth0Lock.user.username}}</h1> <h2 class="subheading">{{post.data.data.getPost.summary}}</h2> <span class="meta">Your Stats: 10 <i class="fa fa-heart-o" aria-hidden="true"></i> {{post.data.data.getPost.likes}} 25 <i class="fa fa-comment-o" aria-hidden="true"></i> {{post.data.data.getPost.comments.pageInfo.count}}</span> </div> </div> </div> </div> </header> <!-- profile Content --> <article> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div> <ul class="list-inline h1"> <li> <span class="fa-stack fa-lg"> <i class="fa fa-circle fa-stack-2x"></i> <i class="fa fa-user fa-stack-1x fa-inverse"></i> </span> </li> </ul> </div> <div class="panel panel-default"> <div class="panel-body"> {{profile.data.data.loginUserWithAuth0Lock.user.username}} </div> </div> <div class="panel panel-default"> <div class="panel-body"> {{profile.data.data.loginUserWithAuth0Lock.firstName}} </div> </div> <div class="panel panel-default"> <div class="panel-body"> {{profile.data.data.loginUserWithAuth0Lock.lastName}} </div> </div> <div class="text-right"><button type="button" class="btn btn-default">Update</button></div> </div> </div> </div> </article>'),a.put("views/userposts.html",'<!-- Page Header --><!-- Set your background image for this header on the line below. --> <header class="intro-header" style="background-image: url(\'images/post-bg.jpg\')"> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div class="post-heading"> <p>You have <span class="h1">{{posts.data.data.getUser.posts.pageInfo.count}}</span> posts</p> <a href data-ng-href="#/addpost"><button type="button" class="btn btn-primary">Add New</button></a> </div> </div> </div> </div> </header> <!-- profile Content --> <article> <div class="container"> <div class="row"> <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1"> <div> <ul class="list-inline h1"> <li> <span class="fa-stack fa-lg"> <i class="fa fa-circle fa-stack-2x"></i> <i class="fa fa-sticky-note fa-stack-1x fa-inverse"></i> </span> </li> </ul> </div> <div data-ng-repeat="post in posts.data.data.getUser.posts.edges" class="post-preview"> <h2 class="post-title"> {{post.node.title}} </h2> <span class="post-subtitle"> {{post.node.summary}} </span><p> <a href data-ng-href="#/post/{{post.node.id}}"><button type="button" class="btn btn-default">Preview</button></a> <a href data-ng-href="#/editpost/{{post.node.id}}"><button type="button" class="btn btn-default">Edit</button></a> <a href data-ng-href="#/post/{{post.node.id}}"><button type="button" class="btn btn-default">Delete</button></a> </p></div> </div> </div> </div></article>')}]);