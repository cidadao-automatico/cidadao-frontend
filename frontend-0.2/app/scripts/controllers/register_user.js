'use strict';

angular.module('vigiaPoliticoApp')
  .controller('RegisterUserCtrl', function ($scope, UserAuthorization,flash, LawRegion, User) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    

    $scope.user = UserAuthorization.get(function(userResult){
      $scope.allRegions = LawRegion.query(function(allRegionsResult){
        $scope.userRegions = User.regions(function(userRegionResult){
          var mappedIds=_.map(userRegionResult, function(value) { return value["id"] })
          //FIXME: This should be done at the server, perhaps with a more clever algorithm that takes advantage of id
          _.each($scope.allRegions, function(region){
            if (_.contains(mappedIds,region["id"]))
            {
              region["enabled"]=true
            }
            else
            {
              region["enabled"]=false
            }
          })
        })  
      })

      

    }, function(error){
      flash("alert","Por favor faça login ou cadastre-se clicando no botão Facebook")
      window.location="#/"
    })

    $scope.saveRegions  = function(allRegions)
    {
      User.saveRegions({regions: $scope.allRegions})
    }

    $scope.register_with_facebook = function($scope)
    {
      window.location="#/user_home"
    };

    $scope.register_with_twitter = function($scope)
    {
      window.location="#/user_home"
    };


  });
