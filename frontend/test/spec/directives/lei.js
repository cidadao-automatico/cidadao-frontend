'use strict';

describe('Directive: lei', function() {
  beforeEach(module('frontendApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<lei></lei>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the lei directive');
  }));
});
