'use strict';

describe('Controller: UserInfoCtrl', function () {

  // load the controller's module
  beforeEach(module('vigiaPoliticoApp'));

  var UserInfoCtrl, scope, $httpBackend;;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    $httpBackend.expectGET('user/show').respond({firstName: 'Gustavo'});
    UserInfoCtrl = $controller('UserInfoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    
  });
});
