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
    'angular-jwt'
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
        controllerAs: 'post'
      })
      .when('/userinfo', {
        templateUrl: 'views/userinfo.html',
        controller: 'UserinfoCtrl',
        controllerAs: 'userinfo'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).run(function(auth) {
    auth.hookEvents();
});