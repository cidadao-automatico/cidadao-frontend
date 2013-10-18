'use strict';

angular.module('vigiaPoliticoApp', ['ngResource','truncate'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/user_auth.html',
        controller: 'AuthorizationCtrl'
      })
      // .when('/', {
      //   templateUrl: 'views/user_home.html',
      //   controller: 'UserInfoCtrl'
      // })
      //TODO: Is there any way to match a regex on url?
      .when('/register', {
        templateUrl: 'views/step1.html',
        controller: 'RegisterUserCtrl'
      })
      .when('/step1', {
        templateUrl: 'views/step1.html',
        controller: 'RegisterUserCtrl'
      })
      .when('/step2', {
        templateUrl: 'views/step2.html',
        controller: 'RegisterUserCtrl'
      })
      .when('/step3', {
        templateUrl: 'views/step3.html',
        controller: 'RegisterUserCtrl'
      })
      .when('/step4', {
        templateUrl: 'views/step4.html',
        controller: 'RegisterUserCtrl'
      })
      .when('/step5', {
        templateUrl: 'views/step5.html',
        controller: 'RegisterUserCtrl'
      })
      .when('/user_home', {
        templateUrl: 'views/user_home.html',
        controller: 'UserInfoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
