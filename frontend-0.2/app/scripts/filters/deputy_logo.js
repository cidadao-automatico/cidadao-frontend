'use strict';

angular.module('vigiaPoliticoApp')
  .filter('deputyLogo', function () {
    return function (input) {
      return 'deputyLogo filter: ' + input;
    };
  });
