'use strict';

angular.module('vigiaPoliticoApp')
  .service('UserAuthorization', function ($resource) {
    // Service logic
    // ...

    // Public API here
    return $resource('/user/show', {}, {});
  });
