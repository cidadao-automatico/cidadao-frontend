'use strict';

cidadoAutomaticoApp.directive('partyDetails', ["cidadolei", function(cidadolei) {
	var controller = function($scope, $element, $attrs) {
		$scope.$watch('selectedCat + selectedLevel', function() {
			if($scope.selectedCat == "partidos") {
				cidadolei.getDetails($scope.lei.id, "partidos", undefined)
					.then(function(all) {
						$scope.contra = _.union(all.N, all.O);
						$scope.abstention = _.union(all.A, all.null);
						$scope.favorable = all.S;
					});
			}
		});
	};
    controller.$inject = ["$scope", "$element", "$attrs"];

	return {
		templateUrl: 'templates/partyDetails.html',
		restrict: 'E',
		scope: true,
		controller: controller
	};
}]);
