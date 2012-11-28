'use strict';

describe('Controller: EnviarMensagemCtrl', function() {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var EnviarMensagemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    EnviarMensagemCtrl = $controller('EnviarMensagemCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
