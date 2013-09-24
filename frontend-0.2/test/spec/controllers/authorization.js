'use strict';

describe('Controller: AuthorizationCtrl', function () {

  // load the controller's module
  beforeEach(module('vigiaPoliticoApp'));

  var AuthorizationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthorizationCtrl = $controller('AuthorizationCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
