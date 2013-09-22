'use strict';

describe('Filter: levelClass', function () {

  // load the filter's module
  beforeEach(module('vigiaPoliticoApp'));

  // initialize a new instance of the filter before each test
  var levelClass;
  beforeEach(inject(function ($filter) {
    levelClass = $filter('levelClass');
  }));

  it('should return the input prefixed with "levelClass filter:"', function () {
    var text = 'angularjs';
    expect(levelClass(text)).toBe('levelClass filter: ' + text);
  });

});
