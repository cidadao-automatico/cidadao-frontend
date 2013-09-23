'use strict';

angular.module('vigiaPoliticoApp')
.filter('short', function () {
	return function(txt, max) {
		if(!max) {max = 200;}
		if(txt && txt.length > max) {
			var wrds = txt.split(' ');
			if(wrds.length > 0) {
				var str = wrds[0];
				var i = 1;
				while(str.length < max && i < wrds.length) {
					str += ' '+wrds[i++];
				}
				return str+"&hellip;";
			}
		}
		return txt;
	};
});
