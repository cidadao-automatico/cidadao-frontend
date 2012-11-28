'use strict';

cidadoAutomaticoApp.controller('MainCtrl', function($scope, cidadolei) {
  $scope.laws = cidadolei.getLaws();
});
