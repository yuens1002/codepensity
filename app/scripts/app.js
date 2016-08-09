'use strict';

/**
 * @ngdoc overview
 * @name codepensityApp
 * @description
 * # codepensityApp
 *
 * Main module of the application.
 */
angular
  .module('codepensityApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'auth0',
    'angular-storage',
    'angular-jwt',
    'ngAutosize'
  ])
  .config(function ($routeProvider, authProvider) {
  
    authProvider
      .init({
      domain: 'codepensity.auth0.com',
      clientID: 't35QGpPHzCk8WwqsxLgEFOrYccjRUwNG',
      loginUrl: '/login'
    });
  
    $routeProvider
      .when('/', {
        templateUrl: 'views/blog.html',
        controller: 'BlogCtrl',
        controllerAs: 'blog'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/post/:postID', {
        templateUrl: 'views/post.html',
        controller: 'PostCtrl',
        controllerAs: 'post',
        activetab: 'post'
      })
      .when('/userinfo', {
        templateUrl: 'views/userinfo.html',
        controller: 'UserinfoCtrl',
        controllerAs: 'userinfo',
        activetab: 'profile'
      })
      .when('/userposts', {
        templateUrl: 'views/userposts.html',
        controller: 'UserpostsCtrl',
        controllerAs: 'userposts',
        activetab: 'post'
      })
      .when('/editpost/:postID', {
        templateUrl: 'views/editpost.html',
        controller: 'EditpostCtrl',
        controllerAs: 'editpost',
        activetab: 'post'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(function(auth) {
    auth.hookEvents();
});