'use strict';

angular.module('vigiaPoliticoApp')
  .controller('RegisterUserCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.register_with_facebook = function($scope)
    {
      console.log("fb");
      window.location="#/user_home"
    };

    $scope.register_with_twitter = function($scope)
    {
      console.log("twit");
      window.location="#/user_home"
    };


  });
