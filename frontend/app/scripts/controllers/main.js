'use strict';

cidadoAutomaticoApp.controller('MainCtrl', ["$scope", "cidadolei", function($scope, cidadolei) {
  $scope.laws = cidadolei.getLaws();
}]);
