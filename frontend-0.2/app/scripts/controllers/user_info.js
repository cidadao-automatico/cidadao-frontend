'use strict';

angular.module('vigiaPoliticoApp')
  .controller('UserInfoCtrl', function ($scope, $resource, UserAuthorization) {
    
	var loadPage = function(p) {		
		$scope.user = UserAuthorization.get({}, function(user) {
			console.log(user)
		})
		// $scope.user = $.get("/user/show")
		// $scope.user = $resource("/user/show")
		//console.log($scope.user)
	};
	$scope.$on('page', function(evt, p) {
		console.log(p);
		loadPage();
	});
	
	
	loadPage();
});
