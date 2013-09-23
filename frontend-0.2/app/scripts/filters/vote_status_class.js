'use strict';

angular.module('vigiaPoliticoApp')
  .filter('voteStatusClass', function () {
    return function(lei) {
		if(lei.yourvote > 0) {
			return "rated";
		} else if(lei.yourvote < 0) {
			return "estimated";
		}
		return "";
	};
  });
