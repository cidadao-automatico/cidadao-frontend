'use strict';

angular.module('vigiaPoliticoApp')
  .filter('status', function () {
    return function (input) {
      return 'status filter: ' + input;
    };
  });
