'use strict';

angular.module('vigiaPoliticoApp')
  .controller('LawsDashboardCtrl', function ($scope, User, UserAuthorization) {
  	$scope.user = UserAuthorization.get(function(result){
  		$scope.laws=User.recommended_laws();
  		console.log($scope.laws)
  	})
    
    $scope.activeLawIndex=0;
    $scope.showExtended = false;

    $scope.showNormalLaw = function(index){
      var result=$scope.activeLawIndex==index && $scope.showExtended == false;
      console.log("showNormalLaw: " + result)
      return result;
    }

    $scope.showExtendedLaw = function(index){
      var result=$scope.activeLawIndex==index && $scope.showExtended == true;
      console.log("showExtendedLaw: " + result)
      return result;
    }

    $scope.enableExtendedLaw = function(index){
      $scope.activeLawIndex=index;
      $scope.showExtended = true;      
    }

    $scope.disableExtendedLaw = function(index){
      $scope.activeLawIndex=index;
      $scope.showExtended = false;      
    }    

    $scope.showLawDescription = function (index) {    	
        console.log("aaaaaaaaaaaaaa")
        $scope.activeLawIndex = index;
        console.log("active index "+$scope.activeLawIndex)
    };
    
    $scope.isShowing = function(index){
    	
    	var result=($scope.activeLawIndex == index)
    	console.log("is showing activeLawindex: "+$scope.activeLawIndex+" index:"+index)
        return  result;
    };

  });
