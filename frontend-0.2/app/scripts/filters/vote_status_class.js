'use strict';

angular.module('vigiaPoliticoApp')
  .filter('voteStatusClass', function () {
    return function (input) {
      return 'voteStatusClass filter: ' + input;
    };
  });
