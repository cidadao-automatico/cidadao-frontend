'use strict';

cidadoAutomaticoApp.directive('choiceDetails', ["cidadolei", function(cidadolei) {
	var controller = function($scope, $element, $attrs) {
		$scope.$watch('selectedCat + selectedLevel', function() {
			if($scope.selectedCat != undefined && $scope.selectedCat == $attrs.category && $scope.selectedLevel != 0) {
				$scope.allDetails = cidadolei.getDetails($scope.lei.id, $scope.selectedCat, $scope.selectedLevel);
				$scope.details = $scope.allDetails.then(function(all) {return _.take(all, 6);});
				$scope.showAll = function() {
					$scope.showDetails = $scope.allDetails;
					jQuery($element).find('.modal').modal();
				};
			}
		});
	};

  controller.$inject = ["$scope", "$element", "$attrs"];

  return {
    templateUrl: 'templates/choiceDetails.html',
    restrict: 'E',
	  scope: true,
	  controller: controller
  };
}]);
