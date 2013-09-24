'use strict';

cidadoAutomaticoApp.controller('EnviarMensagemCtrl', ["$scope", "$routeParams", "cidadolei", function($scope, $routeParams, cidadolei) {
	$scope.lei = cidadolei.getLaw($routeParams.leiId);
}]);
