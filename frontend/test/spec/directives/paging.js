'use strict';

describe('Directive: paging', function() {
  beforeEach(module('frontendApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<paging></paging>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the paging directive');
  }));
});
