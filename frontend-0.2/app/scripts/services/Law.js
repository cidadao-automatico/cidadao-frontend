'use strict';

angular.module('vigiaPoliticoApp')
  .factory('Law', function ($resource) {
    // Service logic

    // Public API here
    return $resource('law/:lawId', { }, { });
  });
