'use strict';

angular.module('vigiaPoliticoApp')
  .filter('short', function () {
    return function (input) {
      return 'short filter: ' + input;
    };
  });
