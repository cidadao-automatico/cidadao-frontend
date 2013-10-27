'use strict';

angular.module('vigiaPoliticoApp')
  .factory('LawTag', function ($resource) {
    // Service logic

    // Public API here
    return $resource('law_tags', { }, { });
  });
