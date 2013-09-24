'use strict';

describe('Controller: ShowPLCtrl', function() {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var ShowPLCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    ShowPLCtrl = $controller('ShowPLCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
