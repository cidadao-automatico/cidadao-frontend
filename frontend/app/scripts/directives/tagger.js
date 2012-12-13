'use strict';

cidadoAutomaticoApp.directive('tagger', function() {
	var controller = function($scope, $attrs, $element) {
		var input = jQuery($element).find('input');
		var addTag = function(arg) {
			$scope.$apply(function() {
				$scope.tags.push(arg);
				console.log($scope.tags);
			});
		};
		var removeTag = function(arg) {
			$scope.$apply(function() {
				var i = _.indexOf($scope.tags, arg);
				$scope.tags.splice(i,1);
			});
		};
		var removeWatch = $scope.$watch('tags', function() {
			if($scope.tags != undefined) {
				_.forEach($scope.tags, function(tag) {
					input.addTag(tag);
				});
				removeWatch();
				input.tagsInput({
					width: '100%',
					height: '100%',
					onAddTag: addTag,
					onRemoveTag: removeTag
				});
			}
		});
	};

	controller.$inject = ["$scope", "$attrs", "$element"];

	return {
		controller: controller,
		template: '<input type="text"/>',
		restrict: 'E',
		scope: {
			tags: '='
		}
	};
});
