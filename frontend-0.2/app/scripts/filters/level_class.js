'use strict';

angular.module('vigiaPoliticoApp')
.filter('levelClass', function () {
	return function(level) {
		switch(level) {
			case 1: return "opposite";
			case 2: return "halfOpposite";
			case 3: return "abstention";
			case 4: return "halfFavorable";
			case 5: return "favorable";
		}
		return "";
	};
});
