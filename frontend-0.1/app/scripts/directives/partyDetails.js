'use strict';

cidadoAutomaticoApp.directive('partyDetails', ["cidadolei", function(cidadolei) {
	var controller = function($scope, $element, $attrs) {
		$scope.$watch('selectedCat + selectedLevel', function() {
			if($scope.selectedCat == "partidos") {
				cidadolei.getDetails($scope.lei.id, "partidos", undefined)
					.then(function(all) {
						$scope.contra = all["Não"];
						$scope.abstention = _.union(all["Abstenção"], all["Não votou"]);
						$scope.favorable = all["Sim"];
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
