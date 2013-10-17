'use strict';

angular.module('vigiaPoliticoApp')
  .controller('UserInfoCtrl', function ($scope, $resource, UserAuthorization, User) {
    
    $scope.user = UserAuthorization.get()
    
});
