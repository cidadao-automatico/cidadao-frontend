'use strict';

describe('Filter: short', function () {

  // load the filter's module
  beforeEach(module('vigiaPoliticoApp'));

  // initialize a new instance of the filter before each test
  var short;
  beforeEach(inject(function ($filter) {
    short = $filter('short');
  }));

  it('should return the input prefixed with "short filter:"', function () {
    var text = 'angularjs';
    expect(short(text)).toBe('short filter: ' + text);
  });

});
