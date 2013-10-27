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
        regions: {method: 'GET', params: { suffix: 'regions'}, isArray: true, responseType: 'json'},
        saveRegions: {method: 'POST', params: { suffix: 'regions'}, isArray: true, responseType: 'json'},
        saveTags: {method: 'POST', params: { suffix: 'tags'}, isArray: true, responseType: 'json'}
      });
  });
