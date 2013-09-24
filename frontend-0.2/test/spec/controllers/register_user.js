'use strict';

describe('Controller: RegisterUserCtrl', function () {

  // load the controller's module
  beforeEach(module('vigiaPoliticoApp'));

  var RegisterUserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RegisterUserCtrl = $controller('RegisterUserCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
