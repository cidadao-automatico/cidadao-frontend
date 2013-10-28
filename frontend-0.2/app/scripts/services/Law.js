'use strict';

angular.module('vigiaPoliticoApp')
  .factory('Law', function ($resource) {
    // Service logic

    // Public API here
    return $resource('law_proposal/:suffix', { }, { 
        laws_for_vote: {method: 'GET', params: { suffix: 'vote_training'}, isArray: true, responseType: 'json'}
    });

  });
