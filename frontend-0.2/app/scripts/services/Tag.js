'use strict';

angular.module('vigiaPoliticoApp')
  .factory('Tag', function ($resource) {
    // Service logic

    // Public API here
    return $resource('tags', { }, { });
  });
