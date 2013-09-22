'use strict';

angular.module('vigiaPoliticoApp')
  .filter('levelClass', function () {
    return function (input) {
      return 'levelClass filter: ' + input;
    };
  });
