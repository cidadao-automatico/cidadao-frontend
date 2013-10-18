'use strict';

angular.module('vigiaPoliticoApp').
  factory('User', function ($resource) {
    // Service logic
    // ...
    

    // Public API here
    return $resource('user/:suffix', {}, {
        query: {responseType: 'json'},
        recommended_laws: {method: 'GET', params: { suffix: 'recommend_laws'}, isArray: true, responseType: 'json'},
        randow_laws: {method: 'GET', params: { suffix: 'randow_laws'}, isArray: true, responseType: 'json'},    
      });
  });
