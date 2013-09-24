'use strict';

describe('Controller: SelectLawsCtrl', function () {

  // load the controller's module
  beforeEach(module('vigiaPoliticoApp'));

  var SelectLawsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SelectLawsCtrl = $controller('SelectLawsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
