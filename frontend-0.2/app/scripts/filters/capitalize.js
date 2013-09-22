'use strict';

angular.module('vigiaPoliticoApp')
  .filter('capitalize', function () {
    return function (input) {
      return 'capitalize filter: ' + input;
    };
  });
