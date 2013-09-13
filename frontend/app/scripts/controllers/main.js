'use strict';

cidadoAutomaticoApp.controller('MainCtrl', ["$scope", "$location", "cidadolei", function($scope, $location, cidadolei) {
	$scope.wait = true;
	var loadPage = function(p) {
		$scope.wait = true;
		$scope.laws = cidadolei.getLaws(p)
			.then(function(ls) {
				if(p > 0) {
					$location.search('page', p);
				}
				ls.paging = {
					currentPage: ls.page,
					totalPages: ls.pages
				};
				$scope.wait = false;
				return ls;
			});
	};
	$scope.$on('page', function(evt, p) {
		console.log(p);
		loadPage(p);
	});
	var s = $location.search();
	var page = 0;
	if(s.page && s.page > 0)
		page = s.page;
	loadPage(s.page);
}]);
