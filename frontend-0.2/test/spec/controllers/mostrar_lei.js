'use strict';

describe('Controller: MostrarLeiCtrl', function () {

  // load the controller's module
  beforeEach(module('vigiaPoliticoApp'));

  var MostrarLeiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MostrarLeiCtrl = $controller('MostrarLeiCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
