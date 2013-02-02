'use strict';

describe('Directive: d3cloud', function() {
  beforeEach(module('frontendApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<d3cloud></d3cloud>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the d3cloud directive');
  }));
});
