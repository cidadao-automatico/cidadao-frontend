'use strict';

angular.module('vigiaPoliticoApp')
  .controller('RegisterUserCtrl', function ($scope, UserAuthorization,flash, LawRegion) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.user = UserAuthorization.get(function(result){
      $scope.regions=LawRegion.query(function(result){
        console.log(result)
      })      
    }, function(error){
      flash("alert","Por favor faça login ou cadastre-se clicando no botão Facebook")
      window.location="#/"
    })

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
