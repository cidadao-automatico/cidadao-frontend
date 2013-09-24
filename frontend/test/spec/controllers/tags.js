'use strict';

describe('Controller: TagsCtrl', function() {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var TagsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    TagsCtrl = $controller('TagsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
