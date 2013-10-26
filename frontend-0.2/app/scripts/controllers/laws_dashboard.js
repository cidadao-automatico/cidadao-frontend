'use strict';

angular.module('vigiaPoliticoApp')
  .controller('LawsDashboardCtrl', function ($scope, User, UserAuthorization) {
    $scope.page = 1;
    
  	$scope.user = UserAuthorization.get(function(result){
  		$scope.laws=User.recommended_laws({page: $scope.page});
  		console.log($scope.laws)
  	})
    
    //#FIXME: Seria legal utilizar Angular ngshow e nghide
    $scope.showExtendedLaw = function(lawId)
    {
      var normal=$("#law_container_"+lawId+"_normal")
      var extended=$("#law_container_"+lawId+"_extended")
      normal.hide("slow")
      extended.show("slow")
    }

    $scope.hideExtendedLaw = function(lawId)
    {
      var normal=$("#law_container_"+lawId+"_normal")
      var extended=$("#law_container_"+lawId+"_extended")
      normal.show("slow")
      extended.hide("slow")
    }

  });
