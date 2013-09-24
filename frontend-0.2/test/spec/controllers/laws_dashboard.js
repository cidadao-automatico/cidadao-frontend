'use strict';

describe('Controller: LawsDashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('vigiaPoliticoApp'));

  var LawsDashboardCtrl, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    scope.userId=1;
    $httpBackend.expectGET('user/1/recommended_laws').respond([{title: 'Projeto de lei 1'}]);    
    LawsDashboardCtrl = $controller('LawsDashboardCtrl', {
      $scope: scope
    });
  }));

  it('should fetch a list of recommendes laws for a user', function () {
    expect(scope.laws).toEqual([]);
    $httpBackend.flush();
    expect(scope.laws[0].title).toEqual('Projeto de lei 1');
  });
});
