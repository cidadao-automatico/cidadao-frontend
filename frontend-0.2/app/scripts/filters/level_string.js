'use strict';

angular.module('vigiaPoliticoApp')
.filter('levelString', function () {
	return function(level) {
		switch(level) {
			case 1: return "contra";
			case 2: return "parcialmente contra";
			case 3: return "abstenção";
			case 4: return "parcialmente a favor";
			case 5: return "a favor";
		}
		return "";
	};
});
