'use strict';

describe('Directive: choiceDetails', function() {
  beforeEach(module('frontendApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<choice-details></choice-details>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the choiceDetails directive');
  }));
});
