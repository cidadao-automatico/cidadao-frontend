'use strict';

angular.module('vigiaPoliticoApp')
  .controller('LawsDashboardCtrl', function ($scope, User) {
  	$scope.userId;
  	$scope.laws=User.recommended_laws({userId: $scope.userId});
    
  });
