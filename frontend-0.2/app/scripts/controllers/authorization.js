'use strict';

angular.module('vigiaPoliticoApp')
  .controller('AuthorizationCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.login_with_facebook = function($scope){
    	console.log("fb")
    };

    $scope.login_with_twitter = function($scope){
    	console.log("tw")
    };

    $scope.register = function($scope){
    	window.location='#/register'
    }

  });
