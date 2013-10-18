'use strict';

describe('Controller: LawsDashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('vigiaPoliticoApp'));

  var LawsDashboardCtrl, scope, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    scope = $rootScope.$new();
    $httpBackend.expectGET('user/show').respond({firstName: 'Gustavo', id: 1});
    $httpBackend.expectGET('user/recommend_laws').respond([{title: 'Projeto de lei 1'}]);
    LawsDashboardCtrl = $controller('LawsDashboardCtrl', {
      $scope: scope
    });
  }));

  it('should fetch a list of recommendes laws for a user', function () {
    expect(scope.laws).toEqual(undefined);
    $httpBackend.flush();
    expect(scope.laws[0].title).toEqual('Projeto de lei 1');
  });
});
