'use strict';

angular.module('vigiaPoliticoApp')
  .factory('Congressman', function ($resource) {
    // Service logic
    // ...

    // Public API here
    return $resource('congressman', {}, {});
  });
