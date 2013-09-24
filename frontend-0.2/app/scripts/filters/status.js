'use strict';

angular.module('vigiaPoliticoApp')
  .filter('status', function () {
    return function(status) {
		switch(status) {
				case 1: return "votado";
				case 0: return "em vota&ccedil;&atilde;o";
			}
			return "unknown"; //TODO
	};
  });
