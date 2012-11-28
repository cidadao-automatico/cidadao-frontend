'use strict';

cidadoAutomaticoApp.directive('choiceDetails', function(cidadolei) {
	function controller($scope, $element, $attrs) {
		$scope.allDetails = cidadolei.getDetails($scope.lei.id, $scope.selectedCat);
		$scope.details = _.take($scope.allDetails, 6);
		$scope.showAll = function() {
			jQuery($element).find('.modal').modal();
		};
	}

  return {
    templateUrl: 'templates/choiceDetails.html',
    restrict: 'E',
	  scope: true,
	  controller: controller
  };
});
