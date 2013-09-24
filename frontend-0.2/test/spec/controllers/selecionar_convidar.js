'use strict';

describe('Controller: SelecionarConvidarCtrl', function () {

  // load the controller's module
  beforeEach(module('vigiaPoliticoApp'));

  var SelecionarConvidarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SelecionarConvidarCtrl = $controller('SelecionarConvidarCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
