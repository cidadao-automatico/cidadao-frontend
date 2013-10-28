'use strict';

angular.module('vigiaPoliticoApp')
  .controller('UserInfoCtrl', function ($scope, flash, UserAuthorization, User) {
    
    $scope.user = UserAuthorization.get(function(result){
    	if (!result.configured)
        {
        	User.updateConfigured()
        	window.location="#/step1"
      	}
    }, function(error){
      flash("alert","Por favor faça login ou cadastre-se clicando no botão Facebook")
      window.location="#/"
    })
    
});
