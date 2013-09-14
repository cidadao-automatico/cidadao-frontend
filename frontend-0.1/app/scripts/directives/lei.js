'use strict';

cidadoAutomaticoApp.directive('lei', ["cidadolei",function(cidadolei) {
	var controller = function($scope, $attrs) {
		$scope.$watch('lei', function() {
			if($scope.lei != undefined) {
				$scope.lei.yourvote = localStorage.getItem($scope.lei.id);
				if(!$scope.lei.yourvote) {
					if(Math.random() > 0.5) {
						$scope.lei.yourvote = -1 * Math.floor((Math.random()*10)+1)%4;
					}
				}
				$scope.selectedLevel = 0;
				$scope.selectedCat = undefined;
				$scope.show = function(cat, level) {
					if(cat == $scope.selectedCat && level == $scope.selectedLevel) {
						$scope.selectedLevel = 0;
						$scope.selectedCat = undefined;
					} else {
						$scope.selectedLevel = level;
						$scope.selectedCat = cat;
					}
				};
				$scope.detailed = function(cat) {
					if($scope.selectedCat == cat) return "detailed";
					return "";
				};
				$scope.selectedLevelString = function() {
					return cidadolei.levelString($scope.selectedLevel);
				};
				$scope.selectedVote = function(cat, level) {
					if(($scope.selectedCat == cat) && ($scope.selectedLevel == level)) return "selected";
					return "";
				};
				$scope.userVote = function(level) {
					localStorage.setItem($scope.lei.id, level);
					$scope.lei.yourvote = level;
				};
				$scope.yourVoteChosen = function(level) {
					if($scope.lei.yourvote && Math.abs($scope.lei.yourvote) == level) return "chosen";
					return "";
				};

				$scope.yourVoteStatus = function() {
					if($scope.lei.yourvote > 0) {
						return "votou";
					} else  if($scope.lei.yourvote < 0) {
						return "votaria";
					}
					return "avalie!";
				};
			}
		});
	};

	controller.$inject = ["$scope", "$attrs"];

	return {
		templateUrl: 'templates/lei.html',
		restrict: 'E',
		scope: {
			lei: '='
		},
		controller: controller
	};
}]);
