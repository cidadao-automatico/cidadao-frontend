'use strict';

describe('Filter: levelString', function () {

  // load the filter's module
  beforeEach(module('vigiaPoliticoApp'));

  // initialize a new instance of the filter before each test
  var levelString;
  beforeEach(inject(function ($filter) {
    levelString = $filter('levelString');
  }));

  it('should return the input prefixed with "levelString filter:"', function () {
    var text = 'angularjs';
    expect(levelString(text)).toBe('levelString filter: ' + text);
  });

});
