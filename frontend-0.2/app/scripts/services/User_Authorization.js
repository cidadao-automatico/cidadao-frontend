'use strict';

angular.module('vigiaPoliticoApp')
  .factory('UserAuthorization', function ($resource) {
    // Service logic
    // ...

    // Public API here
    
    return $resource("user/show");
  });
