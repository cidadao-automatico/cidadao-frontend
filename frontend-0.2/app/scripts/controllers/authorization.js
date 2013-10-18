'use strict';

angular.module('vigiaPoliticoApp')
  .controller('AuthorizationCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.login_with_facebook = function($scope){
    	window.location='/authenticate/facebook'
    };

    $scope.login_with_twitter = function($scope){
    	window.location='/authenticate/google'
    };

    $scope.register = function($scope){
    	window.location='#/register'
    }

  });
