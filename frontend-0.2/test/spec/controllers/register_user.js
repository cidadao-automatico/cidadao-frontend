'use strict';

describe('Controller: RegisterUserCtrl', function () {

  // load the controller's module
  beforeEach(module('vigiaPoliticoApp'));

  var RegisterUserCtrl, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    $httpBackend.expectGET('user/show').respond({firstName: 'Gustavo', id: 1});
    RegisterUserCtrl = $controller('RegisterUserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
