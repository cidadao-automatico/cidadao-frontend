'use strict';

angular.module('vigiaPoliticoApp')
  .factory('LawRegion', function ($resource) {
    // Service logic

    // Public API here
    return $resource('law_regions', { }, { });
  });
