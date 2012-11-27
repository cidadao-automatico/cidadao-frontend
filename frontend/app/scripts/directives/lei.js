'use strict';

cidadoAutomaticoApp.directive('lei', function() {
	function controller($scope, $attrs) {
		var selected = 0;
		var selectedCat;
		$scope.show = function(cat, level) {
			if(cat == selectedCat && level == selected) {
				selected = 0;
				selectedCat = undefined;
			} else {
				selected = level;
				selectedCat = cat;
			}
		}
		$scope.detailed = function(cat) {
			if(selectedCat == cat) return "detailed";
		}
		$scope.selectedLevel = function() {
			switch(selected) {
				case 1: return "contra";
				case 2: return "parcialmente contra";
				case 3: return "abstren&ccedil;&atilde;o";
				case 4: return "parcialmente a favor";
				case 5: return "a favor";
				return "";
			}
		}
		$scope.selectedVote = function(cat, level) {
			if((selectedCat == cat) && (selected == level)) return "selected";
		}
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
	}

  return {
    templateUrl: 'templates/lei.html',
    restrict: 'E',
	scope: {
		lei: '='
	},
	  controller: controller
  };
});
