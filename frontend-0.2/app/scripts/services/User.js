'use strict';

angular.module('vigiaPoliticoApp').
  factory('User', function ($resource) {
    // Service logic
    // ...
    

    // Public API here
    return $resource('user/:userId/:suffix', {}, {
        query: {responseType: 'json'},
        recommended_laws: {method: 'GET', params: { suffix: 'recommended_laws'}, isArray: true, responseType: 'json'},
        randow_laws: {method: 'GET', params: { suffix: 'randow_laws'}, isArray: true, responseType: 'json'},    
      });
  });
