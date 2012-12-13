'use strict';

cidadoAutomaticoApp.controller('ShowPLCtrl', ["$scope", "$routeParams", "cidadolei", function($scope, $routeParams, cidadolei) {
	$scope.lei = cidadolei.getLaw($routeParams.leiId);
}]);
