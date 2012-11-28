'use strict';

cidadoAutomaticoApp.controller('EnviarMensagemCtrl', function($scope, $routeParams, cidadolei) {
	$scope.lei = cidadolei.getLaw($routeParams.leiId);
});
