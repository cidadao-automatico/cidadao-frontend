'use strict';

describe('Directive: d3link', function() {
  beforeEach(module('frontendApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<d3link></d3link>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the d3link directive');
  }));
});
