'use strict';

angular.module('vigiaPoliticoApp')
  .controller('UserInfoCtrl', function ($scope, flash, UserAuthorization, User) {
    
   /* $scope.user = UserAuthorization.get(function(result){
    	if (!result.configured)
        {
        	User.updateConfigured()        	
        	window.location="#/step1"
      	}else
      	{
      		$scope.regions = User.regions()
        	$scope.representatives = User.representatives()
        	$scope.votes = User.votes()
        	$scope.tags=User.tags()
      	}
    }, function(error){
      flash("alert","Por favor faça login ou cadastre-se clicando no botão Facebook")
      window.location="#/"
    })*/
    
});
