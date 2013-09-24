'use strict';

angular.module('vigiaPoliticoApp')
  .filter('capitalize', function () {
    return function(string) {
    	if(string != undefined)
    		return string.charAt(0).toUpperCase() + string.slice(1);
    	return "";
    };
  });
