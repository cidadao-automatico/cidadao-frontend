'use strict';

describe('Directive: partyDetails', function() {
  beforeEach(module('frontendApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<party-details></party-details>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the partyDetails directive');
  }));
});
