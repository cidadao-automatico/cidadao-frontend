'use strict';

cidadoAutomaticoApp.directive('lei', ["cidadolei",function(cidadolei) {
	var controller = function($scope, $attrs) {
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
		$scope.lawStatus = function() {
			switch($scope.lei.status) {
				case 0: return "em vota&ccedil;&atilde;o";
			}
			return "unknown"; //TODO
		};
		$scope.yourVoteChosen = function(level) {
			if(Math.abs($scope.lei.yourvote) == level) return "chosen";
			return "";
		};
		$scope.yourVoteStatusClass = function() {
			if($scope.lei.yourvote == 0) {
				return  "";
			} else if($scope.lei.yourvote > 0) {
				return "rated";
			} else {
				return "estimated";
			}
		};
		$scope.yourVoteStatus = function() {
			if($scope.lei.yourvote == 0) {
				return  "avalie!";
			} else if($scope.lei.yourvote > 0) {
				return "votou";
			} else { 
				return "votaria";
			}
		};
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
