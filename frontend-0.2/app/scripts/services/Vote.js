'use strict';

angular.module('vigiaPoliticoApp')
  .factory('Vote', function ($resource) {
    // Service logic
    // ...


    // Public API here
    return $resource('law_proposal/:id/vote', { }, { 
        save: {method: 'POST', params: { id: '@id'}, isArray: true, responseType: 'json'}
    });
  });
