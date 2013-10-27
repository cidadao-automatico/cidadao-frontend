'use strict';

angular.module('vigiaPoliticoApp')
  .controller('RegisterUserCtrl', function ($scope, UserAuthorization,flash, LawRegion, User, Tag, Congressman) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.user = UserAuthorization.get(function(userResult){}, function(error){
      flash("alert","Por favor faça login ou cadastre-se clicando no botão Facebook")
      window.location="#/"
    })

    $scope.step1 = function(){
      if(!_.isNull($scope.user) && !_.isUndefined($scope.user))
      {
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
      }
    }

    $scope.step2 = function() {
      if(!_.isNull($scope.user) && !_.isUndefined($scope.user))
      {
        $scope.allTags = Tag.query(function(allTagsResult){
          $scope.userTags = User.tags(function(userTagResult){
            var mappedIds=_.map(userTagResult, function(value) { return value["id"] })
            //FIXME: This should be done at the server, perhaps with a more clever algorithm that takes advantage of id
            _.each($scope.allTags, function(tag){
              if (_.contains(mappedIds,tag["id"]))
              {
                tag["enabled"]=true
              }
              else
              {
                tag["enabled"]=false
              }
            })
          })  
        })
      } 
    }

    $scope.step3 = function(){
      if(!_.isNull($scope.user) && !_.isUndefined($scope.user))
      {
        $scope.allCongressman = Congressman.query(function(allCongressmanResult){
          console.log(allCongressmanResult)
          $scope.userRepresentatives = User.representatives(function(userRepresentativesResult){
            var mappedIds=_.map(userRepresentativesResult, function(value) { return value["user"]["id"] })
            //FIXME: This should be done at the server, perhaps with a more clever algorithm that takes advantage of id
            _.each($scope.allCongressman, function(congressman){
              if (_.contains(mappedIds,congressman["user"]["id"]))
              {
                congressman["enabled"]=true
              }
              else
              {
                congressman["enabled"]=false
              }
            })
          })  
        })
      } 
    }

    $scope.step4 = function(){
      $scope.laws=[]
    }

    $scope.saveRegions  = function(allRegions)
    {
      User.saveRegions({regions: $scope.allRegions})
    }

    $scope.saveTags  = function(allTags)
    {
      User.saveTags({tags: $scope.allTags})
    }

    $scope.saveCongressman = function(allCongressman)
    {
      User.saveRepresentatives({congressmanList: allCongressman})
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
