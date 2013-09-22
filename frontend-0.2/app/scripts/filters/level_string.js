'use strict';

angular.module('vigiaPoliticoApp')
  .filter('levelString', function () {
    return function (input) {
      return 'levelString filter: ' + input;
    };
  });
