'use strict';

describe('Directive: tagger', function() {
  beforeEach(module('frontendApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<tagger></tagger>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the tagger directive');
  }));
});
