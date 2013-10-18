'use strict';

angular.module('vigiaPoliticoApp')
  .controller('LawsDashboardCtrl', function ($scope, User, UserAuthorization) {
  	$scope.user = UserAuthorization.get(function(result){
  		$scope.laws=User.recommended_laws();
  		console.log($scope.laws)
  	})
    
  });
