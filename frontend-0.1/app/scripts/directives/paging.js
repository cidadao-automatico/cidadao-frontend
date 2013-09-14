'use strict';

cidadoAutomaticoApp.directive('paging', function() {

	var controller = function($scope, $attrs, $element) {
		$scope.$watch('pages', function() {
			if($scope.pages != undefined) {
				var el = jQuery($element).find(".pagination ul");
				if(el.children().length == 0) {
					var li = jQuery(document.createElement('li'));
					var a = jQuery(document.createElement('a'));
					li.addClass('prev');
					if($scope.pages.currentPage ==0) {
						li.addClass('disabled');
					}
					a.click((function(p) {
						return function() {
							if($scope.pages.currentPage > 0) {
								$scope.$emit('page', p);
							}
						};
					})($scope.pages.currentPage-1));
					a.text("«");
					li.append(a);
					el.append(li);

					for(var i=0; i<$scope.pages.totalPages; i++) {
						li = jQuery(document.createElement('li'));
						li.addClass('p'+i);
						if(i == $scope.pages.currentPage) {
							li.addClass('active');
						}
						a = jQuery(document.createElement('a'));
						a.click((function(p) {
							return function() {
								$scope.$emit('page', p);
							};
						})(i));
						a.text(i+1);
						li.append(a);
						el.append(li);
					}
					li = jQuery(document.createElement('li'));
					a = jQuery(document.createElement('a'));
					li.addClass('next');
					if($scope.pages.currentPage == $scope.pages.totalPages-1) {
						li.addClass('disabled');
					}
					a.click((function(p) {
						return function() {
							if($scope.pages.currentPage < $scope.pages.totalPages) {
								$scope.$emit('page', p);
							}
						};
					})($scope.pages.currentPage+1));
					a.text("»");
					li.append(a);
					el.append(li);
				} else {
					jQuery('.active').removeClass('active');
					jQuery('.p'+$scope.pages.currentPage).addClass('active');
					if($scope.pages.currentPage ==0) {
						jQuery('.prev').addClass('disabled');
					} else {
						jQuery('.prev').removeClass('disabled');
					}
				}
			}
		});
	};

	controller.$inject = ["$scope", "$attrs", "$element"];

	return {
		template: '<div class="pagination pagination-centered"><ul></ul></div>',
		scope: {'pages': '='},
		restrict: 'E',
		controller: controller
	};
});
